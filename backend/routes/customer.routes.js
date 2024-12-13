const express = require('express');
const router = express.Router();
const { registerCustomer, loginCustomer } = require('../controllers/customer.controller');

// Đăng ký khách hàng
router.post('/register', registerCustomer);

// Đăng nhập
router.post('/login', loginCustomer);

module.exports = router;
