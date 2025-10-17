import React from 'react'

export default function Landing() {
  return (
    <div>
         <section className="gradient-bg text-black py-16 md:py-24">
      <div className="container mx-auto px-4 flex flex-col items-center text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Market Intelligence, <span className="text-blue-300">Simplified</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            BullsEye unifies real-time financial news, stock market data, AI-driven sentiment analysis, 
            and a chatbot assistant into one seamless platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
        </div>
        
        {/* Dashboard Preview */}
        <div className="mt-16 w-full max-w-5xl mx-auto bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden border border-white/20 shadow-2xl">
          <div className="bg-gray-900/50 p-4 flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-white/5 p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-500">S&P 500</span>
                  <span className="text-green-500">+1.25%</span>
                </div>
                <div className="text-2xl font-bold">4,567.89</div>
              </div>
              <div className="bg-white/5 p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">NASDAQ</span>
                  <span className="text-green-400">+0.89%</span>
                </div>
                <div className="text-2xl font-bold">14,203.45</div>
              </div>
            </div>
            <div className="bg-white/5 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Market Sentiment</h3>
              <div className="flex items-center mb-2">
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                </div>
                <span className="ml-2 text-sm">65% Positive</span>
              </div>
              <div className="flex items-center">
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '35%' }}></div>
                </div>
                <span className="ml-2 text-sm">35% Negative</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  )
}

