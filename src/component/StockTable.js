"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Pagination from "./Pagination";

const symbols = [
  "AAPL", "GOOGL", "AMZN", "MSFT", "TSLA", "NFLX", "META", "NVDA", "AMD", "INTC",
  "BABA", "CRM", "UBER", "DIS", "PYPL", "ADBE", "ORCL", "PEP", "KO", "NKE",
  "BA", "WMT", "COST", "T", "VZ", "QCOM", "CSCO", "JNJ", "PFE", "XOM", "CVX",
];

const safeToFixed = (value, decimals = 2) => {
  if (value === undefined || value === null || isNaN(value)) return '0.00';
  return value.toFixed(decimals);
};

export default function StockTable() {
  const [stockData, setStockData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showGainersOnly, setShowGainersOnly] = useState(false);
  const [showLosersOnly, setShowLosersOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [alerts, setAlerts] = useState([]);
  const [priceThresholds, setPriceThresholds] = useState({});
  const [selectedSymbol, setSelectedSymbol] = useState(symbols[0]);
  const [lowerThreshold, setLowerThreshold] = useState(0);
  const [upperThreshold, setUpperThreshold] = useState(0);
  const socketRef = useRef(null);
  const itemsPerPage = 10;

  // Filter and pagination logic
  const filteredData = stockData.filter((stock) => {
    const matchesSearch = stock.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    const isGainer = showGainersOnly ? stock.change > 0 : true;
    const isLoser = showLosersOnly ? stock.change < 0 : true;
    return matchesSearch && isGainer && isLoser;
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  // WebSocket connection (keep your existing useEffect logic)
  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_STOCK_API_KEY;
    socketRef.current = new WebSocket(`wss://ws.finnhub.io?token=${apiKey}`);

    socketRef.current.onopen = () => {
      console.log('WebSocket connected');
      symbols.forEach(symbol => {
        socketRef.current.send(JSON.stringify({ type: 'subscribe', symbol }));
      });
    };

    socketRef.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        
        if (data.type === 'trade' && Array.isArray(data.data)) {
          data.data.forEach(tradeData => {
            if (tradeData && tradeData.s && tradeData.p) {
              handleTradeUpdate(tradeData);
            }
          });
        }
      } catch (error) {
        console.error('Error processing WebSocket message:', error);
      }
    };

    socketRef.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socketRef.current.onclose = () => {
      console.log('WebSocket disconnected');
    };

    const fetchInitialData = async () => {
      try {
        const requests = symbols.map(async (symbol) => {
          const res = await fetch(
            `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`
          );
          const d = await res.json();
          return {
            symbol,
            current: d?.c || 0,
            change: d?.d || 0,
            percentChange: d?.dp || 0,
            high: d?.h || 0,
            low: d?.l || 0,
            open: d?.o || 0,
            prevClose: d?.pc || 0,
          };
        });
        const initialData = await Promise.all(requests);
        setStockData(initialData);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };

    fetchInitialData();

    if (typeof window !== 'undefined' && window.Notification) {
      Notification.requestPermission();
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  const handleTradeUpdate = (trade) => {
    setStockData(prevData => {
      const newData = [...prevData];
      const index = newData.findIndex(item => item.symbol === trade.s);
      
      if (index !== -1) {
        const prevClose = newData[index].prevClose || trade.p;
        const change = trade.p - prevClose;
        const percentChange = (change / prevClose) * 100;
        
        newData[index] = {
          ...newData[index],
          current: trade.p,
          change,
          percentChange,
          high: Math.max(newData[index].high || 0, trade.p),
          low: Math.min(newData[index].low || Infinity, trade.p),
          open: newData[index].open || trade.p,
          prevClose
        };
        
        checkPriceAlerts(trade.s, trade.p);
      }
      
      return newData;
    });
  };

  const checkPriceAlerts = (symbol, price) => {
    if (!priceThresholds[symbol]) return;

    const { lower, upper } = priceThresholds[symbol];
    
    if (price <= lower || price >= upper) {
      const newAlert = {
        id: Date.now(),
        symbol,
        price,
        type: price >= upper ? 'upper' : 'lower',
        threshold: price >= upper ? upper : lower,
        timestamp: new Date().toLocaleTimeString()
      };
      
      setAlerts(prev => [newAlert, ...prev].slice(0, 10));
      
      if (typeof window !== 'undefined' && window.Notification?.permission === 'granted') {
        new Notification(`Alert: ${symbol} hit $${price.toFixed(2)} (${newAlert.type} threshold)`);
      }
    }
  };

  const addPriceAlert = () => {
    if (!selectedSymbol || (!lowerThreshold && !upperThreshold)) return;
    
    setPriceThresholds(prev => ({
      ...prev,
      [selectedSymbol]: { 
        lower: Number(lowerThreshold) || 0,
        upper: Number(upperThreshold) || Infinity 
      }
    }));
    
    setLowerThreshold(0);
    setUpperThreshold(0);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, showGainersOnly, showLosersOnly]);

  return (
    <div className="text-white p-6 rounded-lg">
      {/* Header */}
   <div className="space-y-6">
  {/* Header Section */}
  <div className="flex items-center gap-4 mb-8">
    <div className="relative">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
        <div className="w-14 h-14 rounded-xl bg-gray-900 flex items-center justify-center border border-gray-800">
          <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>
      </div>
      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-gray-900 flex items-center justify-center">
        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
    <div>
      <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-black">
        Market Intelligence
      </h2>
      <p className="text-black text-sm">Live market data & smart alerts</p>
    </div>
  </div>

  {/* Search and Quick Actions */}
  <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 shadow-lg">
    <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
      <div className="flex-1 relative">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search stocks, symbols, or companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
          />
        </div>
      </div>
      
      <div className="flex gap-2">
        <button
          onClick={() => setShowGainersOnly(!showGainersOnly)}
          className={`px-4 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 ${
            showGainersOnly 
              ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
              : 'bg-gray-700/50 text-gray-300 border border-gray-600 hover:bg-gray-600/50'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          Gainers
        </button>
        <button
          onClick={() => setShowLosersOnly(!showLosersOnly)}
          className={`px-4 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 ${
            showLosersOnly 
              ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
              : 'bg-gray-700/50 text-gray-300 border border-gray-600 hover:bg-gray-600/50'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
          </svg>
          Losers
        </button>
      </div>
    </div>
  </div>

  {/* Alert Configuration Card */}
  <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 shadow-xl">
    <div className="flex items-center gap-3 mb-6">
      <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-white">Price Alerts</h3>
        <p className="text-gray-400 text-sm">Get notified when prices hit your targets</p>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
      <div className="lg:col-span-3">
        <label className="block text-sm font-medium text-gray-300 mb-2">Stock Symbol</label>
        <div className="relative">
          <select
            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none backdrop-blur-sm"
            value={selectedSymbol}
            onChange={(e) => setSelectedSymbol(e.target.value)}
          >
            {symbols.map(symbol => (
              <option key={symbol} value={symbol}>{symbol}</option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      <div className="lg:col-span-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Lower Price</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
              <input
                type="number"
                placeholder="0.00"
                className="w-full pl-8 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                value={lowerThreshold || ''}
                onChange={(e) => setLowerThreshold(Number(e.target.value))}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Upper Price</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
              <input
                type="number"
                placeholder="0.00"
                className="w-full pl-8 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                value={upperThreshold || ''}
                onChange={(e) => setUpperThreshold(Number(e.target.value))}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-4">
        <button
          className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl text-white font-semibold transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          onClick={addPriceAlert}
          disabled={!lowerThreshold && !upperThreshold}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Create Alert
        </button>
      </div>
    </div>
  </div>

  {/* Active Alerts */}
  {alerts.length > 0 && (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Active Alerts</h3>
            <p className="text-gray-400 text-sm">{alerts.length} alert{alerts.length !== 1 ? 's' : ''} monitoring</p>
          </div>
        </div>
        <span className="px-3 py-1 bg-gray-700 rounded-lg text-gray-300 text-sm font-medium">
          {alerts.length}
        </span>
      </div>

      <div className="grid gap-3">
        {alerts.map(alert => (
          <div 
            key={alert.id} 
            className={`p-4 rounded-xl border backdrop-blur-sm transition-all duration-200 hover:scale-[1.02] ${
              alert.type === 'upper' 
                ? 'bg-green-500/10 border-green-500/30 hover:border-green-500/50' 
                : 'bg-red-500/10 border-red-500/30 hover:border-red-500/50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  alert.type === 'upper' ? 'bg-green-500/20' : 'bg-red-500/20'
                }`}>
                  {alert.type === 'upper' ? (
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-lg">{alert.symbol}</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      alert.type === 'upper' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {alert.type === 'upper' ? 'Above' : 'Below'} ${safeToFixed(alert.threshold)}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">Current: ${safeToFixed(alert.price)}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-white font-semibold">${safeToFixed(alert.threshold)}</div>
                <div className="text-gray-400 text-sm">{alert.timestamp}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )}
</div>
      {/* Marquee */}
      <div className="overflow-hidden whitespace-nowrap bg-gray-800 text-white py-3 rounded-lg mb-6">
        <div className="animate-marquee inline-block min-w-full">
          {[...stockData, ...stockData].map((stock, idx) => (
            <span key={`${stock.symbol}-${idx}`} className="mx-6">
              <span className="font-medium text-white">{stock.symbol}</span>:&nbsp;
              <span className={`${stock.change >= 0 ? "text-green-400" : "text-red-400"}`}>
                ${safeToFixed(stock.current)} ({safeToFixed(stock.change)} | {safeToFixed(stock.percentChange)}%)
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-gray-800 rounded-lg border border-gray-700">
        <table className="min-w-full text-white text-sm">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="px-4 py-3 text-left font-semibold text-gray-300 bg-gray-800 sticky left-0">Symbol</th>
              <th className="px-4 py-3 text-right font-semibold text-gray-300">Current</th>
              <th className="px-4 py-3 text-right font-semibold text-gray-300">Change</th>
              <th className="px-4 py-3 text-right font-semibold text-gray-300">% Change</th>
              <th className="px-4 py-3 text-right font-semibold text-gray-300">High</th>
              <th className="px-4 py-3 text-right font-semibold text-gray-300">Low</th>
              <th className="px-4 py-3 text-right font-semibold text-gray-300">Open</th>
              <th className="px-4 py-3 text-right font-semibold text-gray-300">Prev Close</th>
            </tr>
          </thead>
          <tbody>
            {currentData.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center text-gray-400 py-8">
                  No stocks found matching your criteria.
                </td>
              </tr>
            ) : (
              currentData.map((stock, index) => {
                const colorClass = stock.change >= 0 ? "text-green-400" : "text-red-400";
                return (
                  <tr key={index} className="border-b border-gray-700 hover:bg-gray-750 transition-colors">
                    <td className="px-4 py-3 font-medium text-blue-400 bg-gray-800 sticky left-0">
                      <Link href={`/stock/${stock.symbol}`} className="hover:underline">
                        {stock.symbol}
                      </Link>
                    </td>
                    <td className={`px-4 py-3 text-right font-medium ${colorClass}`}>
                      ${safeToFixed(stock.current)}
                    </td>
                    <td className={`px-4 py-3 text-right ${colorClass}`}>
                      {safeToFixed(stock.change)}
                    </td>
                    <td className={`px-4 py-3 text-right ${colorClass}`}>
                      {safeToFixed(stock.percentChange)}%
                    </td>
                    <td className="px-4 py-3 text-right text-gray-300">
                      ${safeToFixed(stock.high)}
                    </td>
                    <td className="px-4 py-3 text-right text-gray-300">
                      ${safeToFixed(stock.low)}
                    </td>
                    <td className="px-4 py-3 text-right text-gray-300">
                      ${safeToFixed(stock.open)}
                    </td>
                    <td className="px-4 py-3 text-right text-gray-300">
                      ${safeToFixed(stock.prevClose)}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        totalItems={filteredData.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}