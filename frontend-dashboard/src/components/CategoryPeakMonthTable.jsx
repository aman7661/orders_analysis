// src/components/CategoryPeakMonthTable.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CategoryPeakMonthTable() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/api/category-peak-month")
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);
  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Peak Month by Category</h2>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="p-2">Category</th>
            <th className="p-2">Month</th>
            <th className="p-2">Sales</th>
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row.category + row.order_year_month}>
              <td className="border px-2 py-1">{row.category}</td>
              <td className="border px-2 py-1">{row.order_year_month}</td>
              <td className="border px-2 py-1">{row.sales}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
