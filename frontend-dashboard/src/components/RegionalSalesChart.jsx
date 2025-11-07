// src/components/RegionalSalesChart.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function RegionalSalesChart() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/api/top-products-by-region")
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);
  // Simple table format - can change to grouped barchart if needed
  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Top 5 Products by Region</h2>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="p-2">Region</th>
            <th className="p-2">Product</th>
            <th className="p-2">Sales</th>
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row.region + row.product_id}>
              <td className="border px-2 py-1">{row.region}</td>
              <td className="border px-2 py-1">{row.product_id}</td>
              <td className="border px-2 py-1">{row.sales}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
