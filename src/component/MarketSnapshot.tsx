'use client';

import { useState, useEffect } from 'react';

const MarketSnapshot = () => {
  const [activeTab, setActiveTab] = useState('Gainers');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Gainers data
  const gainers = [
    { symbol: 'JINDALPHOT', ltp: '1,386.70', chng: '231.10', pctChng: '20.00', volume: '0.78', value: '10.45' },
    { symbol: 'NAGREEKCAP', ltp: '36.50', chng: '6.08', pctChng: '19.99', volume: '2.42', value: '0.87' },
    { symbol: 'HYBRIDFIN', ltp: '22.24', chng: '3.43', pctChng: '18.23', volume: '9.39', value: '2.10' },
    { symbol: 'WEWIN', ltp: '69.40', chng: '9.76', pctChng: '16.36', volume: '6.20', value: '4.27' },
    { symbol: 'GMBREW', ltp: '883.30', chng: '119.20', pctChng: '15.60', volume: '54.87', value: '476.93' }
  ];

  // Market statistics data
  const marketStats = [
    { label: 'Stock Traded', value: '3,098' },
    { label: 'Advances', value: '1,508' },
    { label: 'Declines', value: '1,493' },
    { label: 'Unchanged', value: '97' },
    { label: 'No. of Stocks at 52 Week High', value: '79', trend: 'up' },
    { label: 'No. of Stocks at 52 Week Low', value: '84', trend: 'down' },
    { label: 'No. of Stocks in Upper Circuit', value: '90' },
    { label: 'No. of Stocks in Lower Circuit', value: '54' },
    { label: 'Registered Investors', value: '23,67,90,444' }
  ];

  const tabs = ['Gainers', 'Losers', 'Most Active(Value)', 'Most Active(Volume)', 'ETFs(Volume)'];

  return (
    <div className={`bg-white p-6 rounded-2xl shadow-xl border border-gray-100 max-w-6xl mx-auto transform transition-all duration-500 ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
    }`}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Market Snapshot
            </h1>
            <p className="text-gray-500 mt-2 flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              Live - As on 09–Oct–2025 14:11 IST
            </p>
          </div>
          <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl font-medium">
            View More ↗
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 bg-gray-50 p-2 rounded-2xl">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 transform ${
              activeTab === tab 
                ? 'bg-white text-blue-600 shadow-lg scale-105' 
                : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Gainers Table */}
        <div className="lg:col-span-2">
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b">
              <h2 className="text-xl font-bold text-gray-800">Top Gainers</h2>
              <p className="text-sm text-gray-600">Real-time market movers</p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-50 to-indigo-50">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">SYMBOL</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">LTP</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">CHNG</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">%CHNG</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">VOLUME</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">VALUE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {gainers.map((stock, index) => (
                    <tr 
                      key={stock.symbol} 
                      className="group hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 transition-all duration-300 cursor-pointer transform hover:scale-[1.02]"
                      style={{
                        animationDelay: `${index * 100}ms`,
                        animation: 'slideInRight 0.5s ease-out forwards'
                      } as any}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center mr-3 shadow-sm">
                            <span className="text-white font-bold text-xs">
                              {index + 1}
                            </span>
                          </div>
                          <span className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                            {stock.symbol}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right font-semibold text-gray-900">{stock.ltp}</td>
                      <td className="px-6 py-4 text-right">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800 border border-green-200">
                          ↗ +{stock.chng}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-sm">
                          +{stock.pctChng}%
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right font-medium text-gray-700">{stock.volume}</td>
                      <td className="px-6 py-4 text-right font-medium text-gray-700">₹{stock.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Market Statistics Card */}
        <div className="bg-gradient-to-br from-gray-900 to-blue-900 rounded-2xl shadow-xl overflow-hidden transform hover:scale-[1.02] transition-all duration-500">
          <div className="p-6">
            <div className="flex items-center mb-6">
              <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"></div>
              <h2 className="text-2xl font-bold text-white">Market Statistics</h2>
            </div>
            
            <div className="space-y-4">
              {marketStats.map((stat, index) => (
                <div 
                  key={stat.label}
                  className="flex justify-between items-center p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group cursor-pointer transform hover:-translate-y-0.5"
                  style={{
                    animationDelay: `${index * 50 + 500}ms`,
                    animation: 'fadeInUp 0.6s ease-out forwards'
                  } as any}
                >
                  <span className="text-gray-300 text-sm group-hover:text-white transition-colors">
                    {stat.label}
                  </span>
                  <div className="flex items-center">
                    {stat.trend === 'up' && (
                      <span className="text-green-400 mr-2 animate-bounce">▲</span>
                    )}
                    {stat.trend === 'down' && (
                      <span className="text-red-400 mr-2 animate-pulse">▼</span>
                    )}
                    <span className="font-bold text-white text-lg bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      {stat.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Market Cap Section */}
            <div className="mt-8 pt-6 border-t border-white/20">
              <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl p-4 backdrop-blur-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300 text-sm">Market Capitalization</span>
                  <div className="text-right">
                    <div className="font-bold text-white text-xl">₹ 455.49 Lac Crs</div>
                    <div className="text-blue-300 text-sm">$ 5.13 Tn</div>
                  </div>
                </div>
                <div className="flex justify-between items-center text-xs text-gray-400">
                  <span>Last Updated</span>
                  <span>08-Oct-2025</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default MarketSnapshot;