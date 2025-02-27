const express = require('express');
const salesRoutes = require('./routes/sales.routes');
const dataRefreshRoutes = require('./routes/dataRefresh.routes');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();
require('./jobs/dataRefresh'); // Start scheduled data refresh job

const app = express();

// Middleware
app.use(express.json());

// Register API Routes
app.use('/api', salesRoutes);
app.use('/api', dataRefreshRoutes);

// Global Error Handler
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
