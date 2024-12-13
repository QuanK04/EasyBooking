const express = require('express');
const router = express.Router();
const { customerLogin, adminLogin } = require('../controllers/auth.controller');

router.post('/customer', customerLogin); // Login khách hàng
router.post('/admin', adminLogin); // Login admin

module.exports = router;
