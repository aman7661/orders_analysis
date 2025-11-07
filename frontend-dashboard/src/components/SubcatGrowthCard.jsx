// src/components/SubcatGrowthCard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function SubcatGrowthCard() {
  const [data, setData] = useState(null);
  useEffect(() => {
    axios.get("http://localhost:5000/api/subcat-growth")
      .then(res => setData(res.data[0]))
      .catch(err => console.error(err));
  }, []);
  if (!data) return <div>Loading...</div>;
  return (
    <div className="max-w-lg mx-auto p-6 bg-green-50 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-2">Sub-category with Highest Profit Growth</h2>
      <p className="text-lg">{data.sub_category}</p>
      <p className="text-gray-600">2022 Profit: ₹{data.profit_2022}</p>
      <p className="text-gray-600">2023 Profit: ₹{data.profit_2023}</p>
      <p className="font-bold text-green-600 mt-2">Growth: ₹{data.growth}</p>
    </div>
  );
}
