'use client';
import { useState } from 'react';

export default function MarketDashboard() {
  const [activeTab, setActiveTab] = useState('volume');
  const [activePeriod, setActivePeriod] = useState('1Yr');

  // Mock data for the dashboard

  const niftyData = {
    current: 25916.65,
    change: -137.25,
    changePercent: -0.53,
    cagr: 7.0
  };

  const volumeStocks = [
    { name: "Vodafone Idea", volume: "2028801659.00", symbol: "IDEA" },
    { name: "Sagility", volume: "428146034.00", symbol: "SAGILITY" },
    { name: "Suzlon Energy", volume: "64735347.00", symbol: "SUZLON" },
    { name: "BHEL", volume: "50348950.00", symbol: "BHEL" },
    { name: "Canara Bank", volume: "47811212.00", symbol: "CANBK" },
    { name: "Yes Bank", volume: "46651278.00", symbol: "YESBANK" },
    { name: "Salasar Techno Engg.", volume: "42590359.00", symbol: "SALASAR" },
    { name: "Sunshine Capital", volume: "35793659.00", symbol: "SCRIP-247961" },
    { name: "Filatex Fashions", volume: "35084212.00", symbol: "FILATFASH" },
    { name: "Rama Steel Tubes", volume: "29351727.00", symbol: "RAMASTEEL" }
  ];

  const valueStocks = [
    { name: "Sagility", value: "2,367.65", symbol: "SAGILITY" },
    { name: "Vodafone Idea", value: "1,765.06", symbol: "IDEA" },
    { name: "Blue Dart Express", value: "1,500.79", symbol: "BLUEDART" },
    { name: "Larsen & Toubro", value: "1,463.12", symbol: "LT" },
    { name: "Five Star Business", value: "1,427.90", symbol: "FIVESTAR" },
    { name: "Netweb Technologies", value: "1,301.77", symbol: "NETWEB" },
    { name: "BHEL", value: "1,296.08", symbol: "BHEL" },
    { name: "PB Fintech", value: "1,056.40", symbol: "POLICYBZR" },
    { name: "Chennai Petrol. Corp", value: "895.89", symbol: "CHENNPETRO" },
    { name: "HDFC Bank", value: "894.89", symbol: "HDFCBANK" }
  ];

  const bseIndices = [
    { name: "SMEIPO", fullName: "S&P Bse SME IPO", value: 108611.44, change: -14.13, changePercent: -0.01 },
    { name: "SNXT50", fullName: "S&P Bse Sensex Next 50", value: 86999.12, change: -195.47, changePercent: -0.22 },
    { name: "SENSEX", fullName: "S&P Bse Sensex", value: 84610.44, change: -386.69, changePercent: -0.45 },
    { name: "SENSEXEW", fullName: "Bse Sensex Equal Weight", value: 82479.89, change: -366.54, changePercent: -0.44 },
    { name: "BSE CG", fullName: "S&P Bse Capital Goods", value: 70073.79, change: 52.10, changePercent: 0.07 },
    { name: "BANKEX", fullName: "S&P Bse Bankex", value: 65563.68, change: -207.76, changePercent: -0.32 },
    { name: "BSE CD", fullName: "S&P Bse Consumer Durables", value: 61059.11, change: -35.37, changePercent: -0.06 },
    { name: "AUTO", fullName: "S&P Bse Auto", value: 60000.42, change: -167.84, changePercent: -0.28 },
    { name: "SMLCAP", fullName: "S&P Bse Small Cap", value: 54016.4, change: -105.90, changePercent: -0.20 },
    { name: "MIDCAP", fullName: "S&P Bse Mid Cap", value: 47259.38, change: -46.22, changePercent: -0.10 }
  ];

  const periods = ['1w', '1m', '3m', '6m', '1Yr', '3Yr', '5Yr'];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        
        {/* NIFTY 50 Chart Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-start mb-6">
            <h4 className="text-lg font-semibold text-gray-900">
              <a href="/market/index/nse/nifty" className="hover:text-blue-600 transition-colors">
                NIFTY 50
              </a>
            </h4>
            <div className="text-right">
              <span className="text-xl font-bold text-gray-900">{niftyData.current.toLocaleString()}</span>
              <span className={`ml-2 ${niftyData.change < 0 ? 'text-red-500' : 'text-green-500'}`}>
                <svg 
                  className={`inline w-4 h-4 ${niftyData.change < 0 ? '' : 'rotate-180'}`} 
                  fill="currentColor" 
                  viewBox="0 0 320 512"
                >
                  <path d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"/>
                </svg>
                <span className="ml-1">{niftyData.change}</span>
                <span>({niftyData.changePercent}%)</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <span className="font-semibold text-gray-700">CAGR Return:</span>
              <span className="ml-2 text-green-500 font-medium">{niftyData.cagr}%</span>
            </div>
            <div className="flex flex-wrap justify-end gap-2">
              {periods.map((period) => (
                <button
                  key={period}
                  onClick={() => setActivePeriod(period)}
                  className={`px-3 py-1 text-sm rounded-lg border transition-colors ${
                    activePeriod === period
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>

          {/* Chart Placeholder */}
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="text-lg font-semibold mb-2">NIFTY 50 Chart</div>
              <div className="text-sm">Interactive chart would be displayed here</div>
            </div>
          </div>
        </div>

        {/* Most Active Stocks Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-lg font-semibold text-gray-900">Most Active Stocks</h4>
            <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('volume')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'volume'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Volume
              </button>
              <button
                onClick={() => setActiveTab('value')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'value'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Value
              </button>
            </div>
          </div>

          <div className="overflow-hidden">
            {activeTab === 'volume' && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 font-semibold text-gray-700">Company</th>
                      <th className="text-right py-3 font-semibold text-gray-700">Volume</th>
                    </tr>
                  </thead>
                  <tbody>
                    {volumeStocks.map((stock, index) => (
                      <tr key={stock.symbol} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-3">
                          <a href={`/company/${stock.symbol}`} className="text-blue-600 hover:text-blue-800 font-medium">
                            {stock.name}
                          </a>
                        </td>
                        <td className="py-3 text-right text-gray-600">{parseFloat(stock.volume).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'value' && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 font-semibold text-gray-700">Company</th>
                      <th className="text-right py-3 font-semibold text-gray-700">
                        Value <span className="text-gray-500 text-xs">Cr.</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {valueStocks.map((stock, index) => (
                      <tr key={stock.symbol} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-3">
                          <a href={`/company/${stock.symbol}`} className="text-blue-600 hover:text-blue-800 font-medium">
                            {stock.name}
                          </a>
                        </td>
                        <td className="py-3 text-right text-gray-600">{stock.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* BSE Indices Carousel */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h4 className="text-xl font-bold text-gray-900">
              <a href="/market/index/bse" className="hover:text-blue-600 transition-colors">
                BSE Indexes
              </a>
            </h4>
            <p className="text-gray-600 mt-1">Track most followed BSE indices</p>
          </div>
          <a
            href="/market/index/bse"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            View All
          </a>
        </div>

        {/* Custom Carousel Implementation */}
        <div className="relative">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex space-x-4 pb-4">
              {bseIndices.map((index, idx) => (
                <div
                  key={index.name}
                  className="flex-shrink-0 w-80 bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  <a href={`/market/index/bse/${index.name.toLowerCase()}`} className="block">
                    <div>
                      <p className="font-semibold text-gray-900 text-lg mb-1">{index.name}</p>
                      <small className="text-gray-500 text-sm">{index.fullName}</small>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="text-2xl font-bold text-gray-900">
                        {index.value.toLocaleString()}
                      </div>
                      <div className={`text-right ${index.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        <svg 
                          className={`inline w-4 h-4 ${index.change >= 0 ? 'rotate-180' : ''}`} 
                          fill="currentColor" 
                          viewBox="0 0 320 512"
                        >
                          <path d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"/>
                        </svg>
                        <span className="ml-1 font-medium">{index.change}</span>
                        <div className="text-sm">({index.changePercent}%)</div>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Custom scroll indicators */}
          <div className="flex justify-center mt-4 space-x-2">
            {[1, 2, 3].map((dot) => (
              <button
                key={dot}
                className="w-2 h-2 rounded-full bg-gray-300 hover:bg-gray-400 transition-colors"
                aria-label={`Go to slide ${dot}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}