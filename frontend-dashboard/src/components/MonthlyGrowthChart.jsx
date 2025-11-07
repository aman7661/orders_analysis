// src/components/MonthlyGrowthChart.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
export default function MonthlyGrowthChart() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get(`${API_URL}/monthly-growth`)
    
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);
  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Monthly Sales Growth (2022 vs 2023)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid stroke="#e5e7eb" />
          <XAxis dataKey="order_month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="sales_2022" stroke="#3b82f6" name="2022" />
          <Line type="monotone" dataKey="sales_2023" stroke="#f59e42" name="2023" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
