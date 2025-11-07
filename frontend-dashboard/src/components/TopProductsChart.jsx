// src/components/TopProductsChart.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function TopProductsChart() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/api/top-products")
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);
  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Top 10 Revenue Products</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid stroke="#f2f2f2" />
          <XAxis />
          <YAxis />
          <Tooltip />
          <Bar dataKey="sales" fill="#2563eb" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
