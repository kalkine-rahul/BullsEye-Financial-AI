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