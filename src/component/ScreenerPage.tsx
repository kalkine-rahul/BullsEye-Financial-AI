"use client";

import { useState } from "react";
import FAQSection from "./FAQSection";

// Types
interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap: number;
  sector: string;
  industry: string;
}

interface Filter {
  marketCap: { min: number; max: number };
  sectors: string[];
  priceMetrics: string[];
  shareholdersReturn: string[];
  financialPosition: string[];
}

// Mock data based on your image
const mockStocks: Stock[] = [
  {
    symbol: "RV",
    name: "Royal Bank of Canada",
    price: 202.36,
    change: 0.61,
    changePercent: 0.61,
    marketCap: 248397.91,
    sector: "Financial Services",
    industry: "Banks - Diversified"
  },
  {
    symbol: "SHOP",
    name: "Shopify Inc",
    price: 233.33,
    change: 3.66,
    changePercent: 3.66,
    marketCap: 203727.57,
    sector: "Technology",
    industry: "Software - Application"
  },
  {
    symbol: "TD",
    name: "Toronto Dominion Bank",
    price: 112.38,
    change: 0.50,
    changePercent: 0.50,
    marketCap: 169802.09,
    sector: "Financial Services",
    industry: "Banks - Diversified"
  },
  {
    symbol: "ENB",
    name: "Enbridge Inc",
    price: 68.22,
    change: 1.14,
    changePercent: 1.14,
    marketCap: 134813.67,
    sector: "Energy",
    industry: "Oil & Gas Midstream"
  },
  {
    symbol: "BN",
    name: "Brookfield Corporation",
    price: 94.83,
    change: 0.36,
    changePercent: 0.36,
    marketCap: 129174.95,
    sector: "Financial Services",
    industry: "Asset Management"
  },
  {
    symbol: "BAM",
    name: "Brookfield Asset Management",
    price: 81.45,
    change: 0.70,
    changePercent: 0.70,
    marketCap: 123324.70,
    sector: "Financial Services",
    industry: "Asset Management"
  },
  {
    symbol: "TRI",
    name: "Thomson Reuters Corp",
    price: 211.74,
    change: 0.18,
    changePercent: 0.18,
    marketCap: 121926.38,
    sector: "Industrials",
    industry: "Specialty Business Services"
  },
  {
    symbol: "BMO",
    name: "Bank of Montreal",
    price: 176.92,
    change: 1.51,
    changePercent: 1.51,
    marketCap: 105819.50,
    sector: "Financial Services",
    industry: "Banks - Diversified"
  }
];

const sectors = [
  "Financial Services",
  "Technology",
  "Energy",
  "Industrials",
  "Healthcare",
  "Consumer Cyclical",
  "Consumer Defensive",
  "Utilities",
  "Communication Services",
  "Basic Materials",
  "Real Estate"
];

export default function ScreenerPage() {
  const [stocks] = useState<Stock[]>(mockStocks);
  const [filters, setFilters] = useState<Filter>({
    marketCap: { min: 0, max: 500000 },
    sectors: [],
    priceMetrics: [],
    shareholdersReturn: [],
    financialPosition: []
  });
  const [searchTerm, setSearchTerm] = useState("");

  const handleSectorToggle = (sector: string) => {
    setFilters(prev => ({
      ...prev,
      sectors: prev.sectors.includes(sector)
        ? prev.sectors.filter(s => s !== sector)
        : [...prev.sectors, sector]
    }));
  };

  const handleMarketCapChange = (type: 'min' | 'max', value: number) => {
    setFilters(prev => ({
      ...prev,
      marketCap: { ...prev.marketCap, [type]: value }
    }));
  };

  const filteredStocks = stocks.filter(stock => {
    const matchesSearch = stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         stock.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = filters.sectors.length === 0 || filters.sectors.includes(stock.sector);
    const matchesMarketCap = stock.marketCap >= filters.marketCap.min && 
                            stock.marketCap <= filters.marketCap.max;
    
    return matchesSearch && matchesSector && matchesMarketCap;
  });

  const formatMarketCap = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}T`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)}B`;
    return `${value}M`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-900">Stock Screener</h1>
          <p className="text-gray-600 mt-2">Showing {filteredStocks.length} Results</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          {/* Sidebar Filters */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Stocks
                </label>
                <input
                  type="text"
                  placeholder="Search by symbol or name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Basic Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic</h3>
                
                {/* Sector Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Select Sectors
                  </label>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {sectors.map(sector => (
                      <label key={sector} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.sectors.includes(sector)}
                          onChange={() => handleSectorToggle(sector)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">{sector}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Market Cap Range */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Market Cap (Mn CAD)
                  </label>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Min</span>
                      <input
                        type="number"
                        value={filters.marketCap.min}
                        onChange={(e) => handleMarketCapChange('min', Number(e.target.value))}
                        className="w-24 px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Max</span>
                      <input
                        type="number"
                        value={filters.marketCap.max}
                        onChange={(e) => handleMarketCapChange('max', Number(e.target.value))}
                        className="w-24 px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    </div>
                    <div className="text-xs text-gray-500 text-center">
                      Range: {formatMarketCap(filters.marketCap.min)} - {formatMarketCap(filters.marketCap.max)}
                    </div>
                  </div>
                </div>

                {/* Additional Filter Sections */}
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Price Metrics</h4>
                    <div className="space-y-1">
                      {['P/E Ratio', 'P/B Ratio', 'P/S Ratio', 'Dividend Yield'].map(metric => (
                        <label key={metric} className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300 text-blue-600" />
                          <span className="ml-2 text-sm text-gray-700">{metric}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Shareholders Return</h4>
                    <div className="space-y-1">
                      {['ROE', 'ROA', 'ROIC', 'Dividend Growth'].map(metric => (
                        <label key={metric} className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300 text-blue-600" />
                          <span className="ml-2 text-sm text-gray-700">{metric}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Financial Position</h4>
                    <div className="space-y-1">
                      {['Debt/Equity', 'Current Ratio', 'Quick Ratio', 'Interest Coverage'].map(metric => (
                        <label key={metric} className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300 text-blue-600" />
                          <span className="ml-2 text-sm text-gray-700">{metric}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Reset Filters */}
              <button
                onClick={() => setFilters({
                  marketCap: { min: 0, max: 500000 },
                  sectors: [],
                  priceMetrics: [],
                  shareholdersReturn: [],
                  financialPosition: []
                })}
                className="w-full py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          </div>

          {/* Main Content - Stocks Table */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Symbol
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price (CAD)
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        1-Day Change (%)
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Market Cap (CAD mn)
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Sector
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Industry
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredStocks.map((stock) => (
                      <tr key={stock.symbol} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-semibold text-gray-900">{stock.symbol}</div>
                            <div className="text-sm text-gray-500">{stock.name}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                          {stock.price.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <span className={`text-sm font-medium ${
                            stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {stock.change >= 0 ? '+' : ''}{stock.changePercent}%
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                          {formatMarketCap(stock.marketCap)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {stock.sector}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {stock.industry}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Empty State */}
              {filteredStocks.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-lg">No stocks found</div>
                  <p className="text-gray-500 mt-2">Try adjusting your filters or search term</p>
                </div>
              )}

              {/* Table Footer */}
              <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{filteredStocks.length}</span> results
                  </p>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                      Previous
                    </button>
                    <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
         <FAQSection/>
      </div> 
    </div>
    
  );
}