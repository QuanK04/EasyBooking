const express = require('express');
const router = express.Router();
const {
    getCartByCustomerId,
    addToCart,
    removeFromCart,
    confirmBooking,
} = require('../controllers/cart.controller');

// Routes
router.get('/:customerID', getCartByCustomerId); // Lấy giỏ hàng theo customerID
router.post('/', addToCart); // Thêm phòng vào giỏ hàng
router.delete('/:cartID', removeFromCart); // Xóa giỏ hàng
router.post('/confirm', confirmBooking);
module.exports = router;
