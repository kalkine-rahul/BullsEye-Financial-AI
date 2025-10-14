// src/component/StockChart.tsx

"use client";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const generateData = () => {
  const now = new Date();
  return Array.from({ length: 20 }).map((_, i) => ({
    time: new Date(now.getTime() - (19 - i) * 60000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    price: 180 + Math.random() * 5,
  }));
};

export default function StockRealDashboardChart() {
  const [data, setData] = useState(generateData());

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) => {
        const newPoint = {
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          price:
            prevData[prevData.length - 1].price +
            (Math.random() - 0.5) * 2,
        };
        return [...prevData.slice(1), newPoint];
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-6xl mx-auto bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] rounded-3xl shadow-2xl p-8 border border-gray-800">
      <div className="aspect-video rounded-2xl bg-gradient-to-br from-[#1e293b] to-[#0f172a] flex items-center justify-center overflow-hidden">
        <ResponsiveContainer width="75%" height="75%">
          <LineChart data={data}>
            <defs>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#60a5fa" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.4} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="time" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" domain={["auto", "auto"]} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "1px solid #334155",
                borderRadius: "8px",
                color: "#f1f5f9",
              }}
              labelStyle={{ color: "#93c5fd" }}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="url(#lineGradient)"
              strokeWidth={3}
              dot={false}
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="text-center mt-6">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
          Live Stock Price Chart
        </h2>
        <p className="text-slate-400 text-sm mt-2">
          Real-time visualization with smooth updates
        </p>
      </div>
    </div>
  );
}
