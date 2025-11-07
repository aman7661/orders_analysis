import React from "react";
import TopProductsChart from "./components/TopProductsChart";
import RegionalSalesChart from "./components/RegionalSalesChart";
import MonthlyGrowthChart from "./components/MonthlyGrowthChart";
import SubcatGrowthCard from "./components/SubcatGrowthCard";
import CategoryPeakMonthTable from "./components/CategoryPeakMonthTable";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
// High-contrast stat card with bold colors
function StatCard({ title, value, subtitle, growth, bgColor = "bg-blue-500", textColor = "text-white" }) {
  return (
    <div className={`p-6 rounded-2xl shadow-lg ${bgColor} ${textColor} flex flex-col`}>
      <span className="text-sm font-semibold uppercase tracking-wide opacity-90 mb-2">{title}</span>
      <span className="text-4xl font-bold mb-1">{value}</span>
      {subtitle && <span className="text-xs opacity-80 mb-2">{subtitle}</span>}
      {growth && (
        <span className={`text-xs font-bold px-3 py-1 rounded-full mt-2 self-start ${
          growth.startsWith("-") 
            ? "bg-red-200 text-red-800" 
            : "bg-green-200 text-green-800"
        }`}>
          {growth}
        </span>
      )}
    </div>
  );
}

// Compact cards for category peak month
function CategoryPeakMonthCards() {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    fetch(`${API_URL}/category-peak-month`)
      .then(r => r.json())
      .then(setData)
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
      {data.map((row, idx) => {
        const colors = [
          "bg-purple-100 border-purple-300 text-purple-900",
          "bg-blue-100 border-blue-300 text-blue-900",
          "bg-green-100 border-green-300 text-green-900"
        ];
        return (
          <div
            key={row.category}
            className={`p-5 rounded-xl shadow border-2 ${colors[idx % 3]}`}
          >
            <div className="text-lg font-bold mb-1">{row.category}</div>
            <div className="text-xs uppercase opacity-70 mb-2">
              Month: <span className="font-semibold">{row.order_year_month}</span>
            </div>
            <div className="text-2xl font-extrabold">₹ {row.sales.toLocaleString()}</div>
          </div>
        );
      })}
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200 flex items-center justify-between px-8 py-4 sticky top-0 z-10">
        <span className="font-extrabold text-3xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          OrderDash
        </span>
        <div className="flex gap-4 items-center">
          {/* Add user menu, notifications, etc. */}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        {/* KPI Stat Cards - High Contrast Colors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard 
            title="Total Orders" 
            value="9,994" 
            subtitle="All time" 
            growth="+8%" 
            bgColor="bg-blue-600" 
            textColor="text-white" 
          />
          <StatCard 
            title="Revenue" 
            value="₹2.3M" 
            subtitle="This year" 
            growth="+12.3%" 
            bgColor="bg-purple-600" 
            textColor="text-white" 
          />
          <StatCard 
            title="Avg Order Value" 
            value="₹230" 
            subtitle="Per order" 
            growth="+0.5%" 
            bgColor="bg-green-600" 
            textColor="text-white" 
          />
          <StatCard 
            title="Top Growth" 
            value="Chairs" 
            subtitle="Sub-category" 
            growth="+12.9%" 
            bgColor="bg-orange-500" 
            textColor="text-white" 
          />
        </div>

        {/* Main Analytics Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <TopProductsChart />
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <MonthlyGrowthChart />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <RegionalSalesChart />
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Peak Month by Category</h2>
            <CategoryPeakMonthCards />
          </div>
        </div>

        {/* Subcategory Growth Card */}
        <div className="grid grid-cols-1">
          <SubcatGrowthCard />
        </div>
      </main>

      <footer className="text-center text-gray-500 py-8 border-t border-gray-200 text-sm mt-10">
        &copy; {new Date().getFullYear()} OrderDash. Built with React + Tailwind CSS.
      </footer>
    </div>
  );
}
