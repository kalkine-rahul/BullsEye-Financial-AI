// src/app/api/search.js
import { eodhdClient } from '../../../lib/eodhd_api'

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q')

  if (!q || q.length < 2) {
    return Response.json({
      error: 'Query parameter required (min 2 characters)',
      results: []
    }, { status: 400 })
  }

  try {
    const results = await eodhdClient.searchStocks(q)
    const formatted = Array.isArray(results)
      ? results.map(item => ({
          symbol: item.Code,
          exchange: item.Exchange,
          name: item.Name,
          type: item.Type,
          country: item.Country,
          currency: item.Currency
        }))
      : []

    return Response.json({
      results: formatted,
      remainingCalls: eodhdClient.getRemainingCalls(),
      dailyLimit: eodhdClient.getDailyLimit()
    })
  } catch (error) {
    return Response.json({
      error: error.message,
      results: [],
      remainingCalls: eodhdClient.getRemainingCalls()
    }, { status: 500 })
  }
}
