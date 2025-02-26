const express = require('express');
const { triggerDataRefresh } = require('../controllers/dataRefresh.controller');

const router = express.Router();

router.post('/refresh', triggerDataRefresh);

module.exports = router;