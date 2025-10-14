// src/component/charts/StockCard.js
export default function StockCard({ stock, onClick }) {
  if (!stock.quote) return null

  const isPositive = stock.quote.change >= 0
  const quote = stock.quote

  return (
    <div 
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer border-l-4"
      style={{ borderLeftColor: isPositive ? '#10B981' : '#EF4444' }}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-lg">{stock.symbol}</h3>
          <p className="text-gray-600 text-sm">{stock.name}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          isPositive 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {isPositive ? '↑' : '↓'} {Math.abs(quote.change)}%
        </span>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Price:</span>
          <span className="font-bold text-lg">
            ${quote.close?.toFixed(2)}
          </span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Open:</span>
          <span>${quote.open?.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">High:</span>
          <span>${quote.high?.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Low:</span>
          <span>${quote.low?.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Volume:</span>
          <span className="font-mono">
            {quote.volume?.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  )
}