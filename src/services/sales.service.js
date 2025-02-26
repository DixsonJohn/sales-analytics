const connectDB = require('../config/database');

// Total Revenue for a date range
async function getTotalRevenue(startDate, endDate) {
  try {
    const db = await connectDB();
    const [rows] = await db.execute(
      `SELECT SUM(quantity * unitPrice * (1 - discount)) AS total_revenue
       FROM OrderItems
       JOIN Orders ON OrderItems.orderId = Orders.id
       WHERE dateOfSale BETWEEN ? AND ?`,
      [startDate, endDate]
    );
    await db.end();
    return rows && rows[0] || 0;
  } catch (error) {
    console.error('Error in getTotalRevenue:', error.message);
    throw new Error('Database error while fetching total revenue');
  }
}

// Total Revenue by Product for a date range
async function getRevenueByProduct(startDate, endDate) {
  try {
    const db = await connectDB();
    const [rows] = await db.execute(
      `SELECT Products.name AS product, 
              SUM(quantity * unitPrice * (1 - discount)) AS revenue
       FROM OrderItems
       JOIN Orders ON OrderItems.orderId = Orders.id
       JOIN Products ON OrderItems.productId = Products.id
       WHERE dateOfSale BETWEEN ? AND ?
       GROUP BY Products.name
       ORDER BY revenue DESC`,
      [startDate, endDate]
    );
    await db.end();
    return rows;
  } catch (error) {
    console.error('Error in getRevenueByProduct:', error.message);
    throw new Error('Database error while fetching revenue by product');
  }
}

// Total Revenue by Category for a date range
async function getRevenueByCategory(startDate, endDate) {
  try {
    const db = await connectDB();
    const [rows] = await db.execute(
      `SELECT Products.category, 
              SUM(quantity * unitPrice * (1 - discount)) AS revenue
       FROM OrderItems
       JOIN Orders ON OrderItems.orderId = Orders.id
       JOIN Products ON OrderItems.productId = Products.id
       WHERE dateOfSale BETWEEN ? AND ?
       GROUP BY Products.category
       ORDER BY revenue DESC`,
      [startDate, endDate]
    );
    await db.end();
    return rows;
  } catch (error) {
    console.error('Error in getRevenueByCategory:', error.message);
    throw new Error('Database error while fetching revenue by category');
  }
}

// Total Revenue by Region for a date range
async function getRevenueByRegion(startDate, endDate) {
  try {
    const db = await connectDB();
    const [rows] = await db.execute(
      `SELECT Orders.region, 
              SUM(quantity * unitPrice * (1 - discount)) AS revenue
       FROM OrderItems
       JOIN Orders ON OrderItems.orderId = Orders.id
       WHERE dateOfSale BETWEEN ? AND ?
       GROUP BY Orders.region
       ORDER BY revenue DESC`,
      [startDate, endDate]
    );
    await db.end();
    return rows;
  } catch (error) {
    console.error('Error in getRevenueByRegion:', error.message);
    throw new Error('Database error while fetching revenue by region');
  }
}

module.exports = {
  getTotalRevenue,
  getRevenueByProduct,
  getRevenueByCategory,
  getRevenueByRegion,
};