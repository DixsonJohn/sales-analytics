const {
    getTotalRevenue,
    getRevenueByProduct,
    getRevenueByCategory,
    getRevenueByRegion,
} = require('../services/sales.service');

// Common function to handle API requests
const handleRequest = async (req, res, serviceFunction) => {
    try {
        const data = await serviceFunction(req.query.startDate, req.query.endDate, req.query.interval);
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getTotalRevenue = (req, res) => handleRequest(req, res, getTotalRevenue);
exports.getRevenueByProduct = (req, res) => handleRequest(req, res, getRevenueByProduct);
exports.getRevenueByCategory = (req, res) => handleRequest(req, res, getRevenueByCategory);
exports.getRevenueByRegion = (req, res) => handleRequest(req, res, getRevenueByRegion);