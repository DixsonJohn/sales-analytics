const cron = require('node-cron');
const { loadCSV } = require('../services/csv.service');
const fs = require('fs');
const path = require('path');
const logFilePath = path.join(__dirname, '../logs/data-refresh.log');

// Logs data refresh activities
function logDataRefresh(message) {
  const timestamp = new Date().toISOString();
  fs.appendFileSync(logFilePath, `[${timestamp}] ${message}\n`);
}

// Schedule the job to run every day at midnight (00:00)
cron.schedule('0 0 * * *', async () => {
  try {
    console.log('Running scheduled data refresh...');
    logDataRefresh('Running scheduled data refresh...');

    const filePath = path.join(__dirname, '../../uploads/sales_data.csv');
    if (!fs.existsSync(filePath)) {
      logDataRefresh('sales_data.csv file not found. Skipping refresh.');
      return;
    }

    await loadCSV(filePath);
    logDataRefresh('Scheduled data refresh completed successfully.');
    console.log('Data refresh completed.');
  } catch (error) {
    logDataRefresh(`Scheduled data refresh failed: ${error.message}`);
    console.error('Scheduled data refresh failed:', error.message);
  }
});