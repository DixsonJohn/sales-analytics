const { loadCSV } = require('../services/csv.service');
const fs = require('fs');
const path = require('path');
const logDirectory = path.join(__dirname, '../logs');
const logFilePath = path.join(logDirectory, 'data-refresh.log');

// Ensure log directory exists before writing logs
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true });
}

// Logs data refresh activities
function logDataRefresh(message) {
  const timestamp = new Date().toISOString();
  fs.appendFileSync(logFilePath, `[${timestamp}] ${message}\n`);
}

exports.triggerDataRefresh = async (req, res, next) => {
  try {
    console.log('Running manual data refresh...');
    logDataRefresh('Running manual data refresh...');

    const filePath = 'uploads/sales_data.csv';
    if (!fs.existsSync(filePath)) {
      logDataRefresh('sales_data.csv file not found. Skipping refresh.');
      return res.status(400).json({ success: false, message: 'sales_data.csv file not found' });
    }

    await loadCSV(filePath);
    logDataRefresh('Manual data refresh completed successfully.');

    res.json({
      success: true,
      message: 'Manual data refresh completed successfully'
    });
  } catch (error) {
    logDataRefresh(`Manual data refresh failed: ${error.message}`);
    next(error);
  }
};