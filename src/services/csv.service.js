const fs = require('fs');
const path = require('path');
const csvParser = require('csv-parser');
const connectDB = require('../config/database');

const filePath = path.join(__dirname, '../../uploads/sales_data.csv'); // Cross-platform path

// Converts CSV column names to JavaScript-friendly format
function normalizeCSVRow(row) {
    return {
      OrderID: row['Order ID'],
      ProductID: row['Product ID'],
      CustomerID: row['Customer ID'],
      ProductName: row['Product Name'],
      Category: row['Category'],
      Region: row['Region'],
      DateOfSale: row['Date of Sale'],
      QuantitySold: row['Quantity Sold'],
      UnitPrice: row['Unit Price'],
      Discount: row['Discount'],
      ShippingCost: row['Shipping Cost'],
      PaymentMethod: row['Payment Method'],
      CustomerName: row['Customer Name'],
      CustomerEmail: row['Customer Email'],
      CustomerAddress: row['Customer Address']
    };
  }

// Loads CSV data into the database
async function loadCSV() {
  try {
    const db = await connectDB();

    console.log('Reading CSV file:', filePath);
    const records = [];

    // Read CSV file and parse data
    await new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', (row) => {
          records.push(normalizeCSVRow(row));
        })
        .on('end', resolve)
        .on('error', reject);
    });

    console.log(`Found ${records.length} records in CSV`);

    // Insert data into MySQL
    for (const record of records) {
      const { OrderID, ProductID, CustomerID, ProductName, Category, Region, DateOfSale, QuantitySold, UnitPrice, Discount, ShippingCost, PaymentMethod, CustomerName, CustomerEmail, CustomerAddress } = record;

      // Insert Customer
      await db.execute(
        `INSERT INTO Customers (id, name, email, address) VALUES (?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE name=?, email=?, address=?`,
        [CustomerID, CustomerName, CustomerEmail, CustomerAddress, CustomerName, CustomerEmail, CustomerAddress]
      );

      // Insert Product
      await db.execute(
        `INSERT INTO Products (id, name, category) VALUES (?, ?, ?)
         ON DUPLICATE KEY UPDATE name=?, category=?`,
        [ProductID, ProductName, Category, ProductName, Category]
      );

      // Insert Order
      await db.execute(
        `INSERT INTO Orders (id, customerId, region, dateOfSale, paymentMethod) 
         VALUES (?, ?, ?, ?, ?) 
         ON DUPLICATE KEY UPDATE customerId=?, region=?, dateOfSale=?, paymentMethod=?`,
        [OrderID, CustomerID, Region, DateOfSale, PaymentMethod, CustomerID, Region, DateOfSale, PaymentMethod]
      );

      // Insert OrderItem
      await db.execute(
        `INSERT INTO OrderItems (orderId, productId, quantity, unitPrice, discount, shippingCost) 
         VALUES (?, ?, ?, ?, ?, ?) 
         ON DUPLICATE KEY UPDATE quantity=?, unitPrice=?, discount=?, shippingCost=?`,
        [OrderID, ProductID, QuantitySold, UnitPrice, Discount, ShippingCost, QuantitySold, UnitPrice, Discount, ShippingCost]
      );
    }

    await db.end();
    console.log('CSV data successfully imported into MySQL');
  } catch (error) {
    console.error('Error loading CSV:', error.message);
    throw new Error('Failed to process CSV file');
  }
}

module.exports = { loadCSV };