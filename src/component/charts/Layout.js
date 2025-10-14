// src/component/charts/Layout.js
import Head from 'next/head'
import Link from 'next/link'
import MarketSnapshot from '../MarketSnapshot'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <main>
        <MarketSnapshot/>
        {children}</main>
    </div>
  )
}