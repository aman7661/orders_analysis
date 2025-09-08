'use client';

import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer 
} from 'recharts';
import { 
  TrendingUp, 
  ShoppingCart, 
  DollarSign, 
  MapPin, 
  Calendar, 
  Award 
} from 'lucide-react';

// Sample data based on your SQL queries (replace with real data from your analysis)
const topProducts = [
  { product_id: 'PROD-001', sales: 125000, name: 'Wireless Headphones' },
  { product_id: 'PROD-002', sales: 98000, name: 'Smartphone Case' },
  { product_id: 'PROD-003', sales: 87500, name: 'Laptop Stand' },
  { product_id: 'PROD-004', sales: 76000, name: 'Bluetooth Speaker' },
  { product_id: 'PROD-005', sales: 68900, name: 'USB Cable' },
  { product_id: 'PROD-006', sales: 65400, name: 'Power Bank' },
  { product_id: 'PROD-007', sales: 59200, name: 'Mouse Pad' },
  { product_id: 'PROD-008', sales: 54800, name: 'Webcam' },
  { product_id: 'PROD-009', sales: 48600, name: 'Keyboard' },
  { product_id: 'PROD-010', sales: 44200, name: 'Monitor' }
];

const regionalData = [
  { region: 'West', sales: 450000, top_product: 'Wireless Headphones' },
  { region: 'East', sales: 380000, top_product: 'Smartphone Case' },
  { region: 'South', sales: 320000, top_product: 'Laptop Stand' },
  { region: 'Central', sales: 280000, top_product: 'Bluetooth Speaker' }
];

const monthlyGrowth = [
  { month: 1, name: 'Jan', sales_2022: 85000, sales_2023: 102000 },
  { month: 2, name: 'Feb', sales_2022: 78000, sales_2023: 95000 },
  { month: 3, name: 'Mar', sales_2022: 92000, sales_2023: 118000 },
  { month: 4, name: 'Apr', sales_2022: 88000, sales_2023: 108000 },
  { month: 5, name: 'May', sales_2022: 95000, sales_2023: 125000 },
  { month: 6, name: 'Jun', sales_2022: 89000, sales_2023: 112000 },
  { month: 7, name: 'Jul', sales_2022: 96000, sales_2023: 128000 },
  { month: 8, name: 'Aug', sales_2022: 91000, sales_2023: 115000 },
  { month: 9, name: 'Sep', sales_2022: 87000, sales_2023: 109000 },
  { month: 10, name: 'Oct', sales_2022: 99000, sales_2023: 132000 },
  { month: 11, name: 'Nov', sales_2022: 105000, sales_2023: 142000 },
  { month: 12, name: 'Dec', sales_2022: 110000, sales_2023: 148000 }
];

const categoryData = [
  { category: 'Electronics', peak_month: 'Dec 2023', sales: 280000 },
  { category: 'Clothing', peak_month: 'Nov 2023', sales: 165000 },
  { category: 'Home & Garden', peak_month: 'May 2023', sales: 145000 },
  { category: 'Sports', peak_month: 'Jun 2023', sales: 98000 }
];

const subCategoryGrowth = [
  { sub_category: 'Smartphones', sales_2022: 145000, sales_2023: 198000, growth: 53000 },
  { sub_category: 'Laptops', sales_2022: 125000, sales_2023: 167000, growth: 42000 },
  { sub_category: 'Audio', sales_2022: 98000, sales_2023: 135000, growth: 37000 },
  { sub_category: 'Accessories', sales_2022: 87000, sales_2023: 118000, growth: 31000 },
  { sub_category: 'Gaming', sales_2022: 76000, sales_2023: 105000, growth: 29000 }
];

const COLORS = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6'];

// Components
const StatCard = ({ icon: Icon, title, value, subtitle, color }) => (
  <div className="bg-white rounded-lg shadow-lg p-6 border-l-4" style={{ borderLeftColor: color }}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>
      <Icon className="h-8 w-8" style={{ color }} />
    </div>
  </div>
);

const TabButton = ({ id, label, isActive, onClick }) => (
  <button
    onClick={() => onClick(id)}
    className={`px-6 py-3 rounded-lg font-medium transition-all ${
      isActive
        ? 'bg-blue-600 text-white shadow-lg'
        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
    }`}
  >
    {label}
  </button>
);

// Main Dashboard Component
export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-3xl font-bold text-gray-900">Retail Orders Analysis Dashboard</h1>
          <p className="text-gray-600 mt-1">Data-driven insights from retail orders analysis</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-2 mb-8 overflow-x-auto">
          <TabButton 
            id="overview" 
            label="Overview" 
            isActive={activeTab === 'overview'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            id="products" 
            label="Top Products" 
            isActive={activeTab === 'products'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            id="regions" 
            label="Regional Analysis" 
            isActive={activeTab === 'regions'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            id="trends" 
            label="Growth Trends" 
            isActive={activeTab === 'trends'} 
            onClick={setActiveTab} 
          />
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                icon={DollarSign}
                title="Total Revenue"
                value="$1.43M"
                subtitle="2023 Performance"
                color="#3B82F6"
              />
              <StatCard
                icon={ShoppingCart}
                title="Total Orders"
                value="8,456"
                subtitle="Across all regions"
                color="#10B981"
              />
              <StatCard
                icon={TrendingUp}
                title="Growth Rate"
                value="+23.5%"
                subtitle="YoY Growth"
                color="#EF4444"
              />
              <StatCard
                icon={Award}
                title="Top Category"
                value="Electronics"
                subtitle="Best performing"
                color="#F59E0B"
              />
            </div>

            {/* Quick Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Monthly Performance 2023 vs 2022</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyGrowth}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, '']} />
                    <Legend />
                    <Line type="monotone" dataKey="sales_2022" stroke="#EF4444" name="2022 Sales" strokeWidth={2} />
                    <Line type="monotone" dataKey="sales_2023" stroke="#3B82F6" name="2023 Sales" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Regional Sales Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={regionalData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="sales"
                      label={({ region, percent }) => `${region} ${(percent * 100).toFixed(0)}%`}
                    >
                      {regionalData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Sales']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Top Products Tab */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Top 10 Revenue Generating Products</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={topProducts} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={120} />
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Sales']} />
                  <Bar dataKey="sales" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {topProducts.slice(0, 6).map((product, index) => (
                <div key={product.product_id} className="bg-white rounded-lg shadow p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-semibold">#{index + 1}</span>
                    <span className="text-sm text-gray-500">{product.product_id}</span>
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1">{product.name}</h4>
                  <p className="text-xl font-bold text-blue-600">${product.sales.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Regional Analysis Tab */}
        {activeTab === 'regions' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Sales by Region</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={regionalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="region" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Sales']} />
                  <Bar dataKey="sales" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {regionalData.map((region, index) => (
                <div key={region.region} className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between mb-4">
                    <MapPin className="h-6 w-6 text-green-600" />
                    <span className="text-sm font-medium text-green-600">#{index + 1}</span>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-1">{region.region}</h4>
                  <p className="text-2xl font-bold text-green-600 mb-2">${region.sales.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Top: {region.top_product}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Growth Trends Tab */}
        {activeTab === 'trends' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Sub-Category Growth (2023 vs 2022)</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={subCategoryGrowth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="sub_category" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, '']} />
                  <Legend />
                  <Bar dataKey="sales_2022" fill="#EF4444" name="2022 Sales" />
                  <Bar dataKey="sales_2023" fill="#3B82F6" name="2023 Sales" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Category Peak Performance</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {categoryData.map((category, index) => (
                  <div key={category.category} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Calendar className="h-5 w-5 text-purple-600" />
                      <span className="text-sm text-gray-500">Peak Month</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">{category.category}</h4>
                    <p className="text-lg font-bold text-purple-600 mb-1">${category.sales.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">{category.peak_month}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <p className="text-center text-gray-600">
            Retail Orders Analysis Dashboard - Data-driven insights for business growth
          </p>
        </div>
      </footer>
    </div>
  );
}