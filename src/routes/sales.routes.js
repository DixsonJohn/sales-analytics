const express = require('express');
const {
  getTotalRevenue,
  getRevenueByProduct,
  getRevenueByCategory,
  getRevenueByRegion,
} = require('../controllers/sales.controller');

const router = express.Router();

router.get('/revenue', getTotalRevenue);
router.get('/revenue/product', getRevenueByProduct);
router.get('/revenue/category', getRevenueByCategory);
router.get('/revenue/region', getRevenueByRegion);

module.exports = router;