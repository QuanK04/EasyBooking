const sql = require('mssql');
const db = require('../config/database');

// Lấy tất cả reviews
exports.getReviews = async (req, res) => {
    try {
        const pool = await db.poolPromise; // Nếu `db` là poolPromise từ config
        const result = await pool.request().query('SELECT * FROM Review');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Lấy review theo ID
exports.getReviewById = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await db;
        const result = await pool.request()
            .input('reviewID', sql.Int, id)
            .query('SELECT * FROM Review WHERE reviewID = @reviewID');
        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.json(result.recordset[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Tạo review mới
exports.createReview = async (req, res) => {
    const { rating, review_date, comments, customerID } = req.body;
    try {
        const pool = await db.poolPromise;
        await pool.request()
            .input('rating', sql.Int, rating)
            .input('review_date', sql.Date, review_date)
            .input('comments', sql.NVarChar, comments)
            .input('customerID', sql.Int, customerID)
            .query(
                'INSERT INTO Review (rating, review_date, comments, customerID) VALUES (@rating, @review_date, @comments, @customerID)'
            );
        res.status(201).json({
            message: 'Review created successfully',
            review: { rating, review_date, comments, customerID },
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Cập nhật review
exports.updateReview = async (req, res) => {
    const { id } = req.params;
    const { rating, review_date, comments } = req.body;
    try {
        const pool = await db;
        const result = await pool.request()
            .input('reviewID', sql.Int, id)
            .input('rating', sql.Int, rating)
            .input('review_date', sql.Date, review_date)
            .input('comments', sql.NVarChar, comments)
            .query(
                'UPDATE Review SET rating = @rating, review_date = @review_date, comments = @comments WHERE reviewID = @reviewID'
            );
        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.json({ id, rating, review_date, comments });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Xóa review
exports.deleteReview = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await db.poolPromise;
        const result = await pool.request()
            .input('reviewID', sql.Int, id)
            .query('DELETE FROM Review WHERE reviewID = @reviewID');
        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
