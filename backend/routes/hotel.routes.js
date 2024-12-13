const express = require('express');
const router = express.Router();
const {
    getHotels,
    getHotelById,
    createHotel,
    updateHotel,
    deleteHotel
} = require('../controllers/hotel.controller');

// Lấy danh sách tất cả khách sạn
router.get('/', getHotels); // Lấy danh sách tất cả khách sạn
router.get('/:id', getHotelById); // Lấy thông tin khách sạn theo ID
router.post('/', createHotel); // Tạo khách sạn mới
router.put('/:id', updateHotel); // Cập nhật thông tin khách sạn
router.delete('/:id', deleteHotel);

module.exports = router;
