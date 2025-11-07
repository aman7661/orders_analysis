// server.js
const express = require('express');
const cors = require('cors');
const connection = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// 1. Top 10 Revenue Products
app.get('/api/top-products', (req, res) => {
  connection.query(
    `SELECT product_id, SUM(sale_price) AS sales FROM df_orders GROUP BY product_id ORDER BY sales DESC LIMIT 10;`,
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results);
    }
  );
});

// 2. Top 5 Products by Region
app.get('/api/top-products-by-region', (req, res) => {
  connection.query(
    `WITH regional_sales AS (
      SELECT region, product_id, SUM(sale_price) AS sales
      FROM df_orders
      GROUP BY region, product_id
    )
    SELECT region, product_id, sales FROM (
      SELECT regional_sales.*, ROW_NUMBER() OVER (PARTITION BY region ORDER BY sales DESC) AS rn FROM regional_sales
    ) ranked WHERE rn <= 5;`,
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results);
    }
  );
});

// 3. Month-over-Month Growth (2022 vs 2023)
app.get('/api/monthly-growth', (req, res) => {
  connection.query(
    `WITH monthly_sales AS (
      SELECT YEAR(order_date) AS order_year, MONTH(order_date) AS order_month, SUM(sale_price) AS sales
      FROM df_orders
      GROUP BY YEAR(order_date), MONTH(order_date)
    )
    SELECT order_month,
      SUM(CASE WHEN order_year = 2022 THEN sales ELSE 0 END) AS sales_2022,
      SUM(CASE WHEN order_year = 2023 THEN sales ELSE 0 END) AS sales_2023
    FROM monthly_sales GROUP BY order_month ORDER BY order_month;`,
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results);
    }
  );
});

// 4. Highest Sales Month by Category
app.get('/api/category-peak-month', (req, res) => {
  connection.query(
    `WITH cat_month_sales AS (
      SELECT category, DATE_FORMAT(order_date, '%Y%m') AS order_year_month, SUM(sale_price) AS sales
      FROM df_orders
      GROUP BY category, DATE_FORMAT(order_date, '%Y%m')
    )
    SELECT category, order_year_month, sales FROM (
      SELECT cat_month_sales.*, ROW_NUMBER() OVER (PARTITION BY category ORDER BY sales DESC) AS rn FROM cat_month_sales
    ) ranked WHERE rn = 1;`,
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results);
    }
  );
});

// 5. Highest Growth Sub-category
app.get('/api/subcat-growth', (req, res) => {
  connection.query(
    `WITH yearly_subcat_sales AS (
      SELECT sub_category, YEAR(order_date) AS order_year, SUM(profit) AS profit
      FROM df_orders
      GROUP BY sub_category, YEAR(order_date)
    ),
    subcat_growth AS (
      SELECT sub_category,
             SUM(CASE WHEN order_year = 2022 THEN profit ELSE 0 END) AS profit_2022,
             SUM(CASE WHEN order_year = 2023 THEN profit ELSE 0 END) AS profit_2023
      FROM yearly_subcat_sales
      GROUP BY sub_category
    )
    SELECT sub_category, profit_2022, profit_2023, (profit_2023 - profit_2022) AS growth
    FROM subcat_growth
    ORDER BY growth DESC
    LIMIT 1;`,
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results);
    }
  );
});

app.get('/', (req, res) => {
  res.send('Order Analysis API running!');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Express backend running on port ${PORT} 🚀`);
});
