const express = require('express');
const router = express.Router();
const {
    getReviews,
    getReviewById,
    createReview,
    updateReview,
    deleteReview
} = require('../controllers/review.controller');

// Routes
router.get('/', getReviews); // Lấy tất cả reviews
router.get('/:id', getReviewById); // Lấy review theo ID
router.post('/', createReview); // Tạo review mới
router.put('/:id', updateReview); // Cập nhật review
router.delete('/:id', deleteReview); // Xóa review

module.exports = router;
