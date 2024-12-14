const express = require('express');
const router = express.Router();
const { getBookingsByCustomerId } = require('../controllers/booking.controller');

// Route: Lấy danh sách booking theo customerID
router.get('/:customerID', getBookingsByCustomerId);

module.exports = router;
