const db = require('../config/database');
const sql = require('mssql');

// Lấy danh sách tất cả khách sạn
exports.getHotels = async (req, res) => {
    try {
        const pool = await db.poolPromise;
        const result = await pool.request().query('SELECT * FROM Hotel');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Lấy thông tin khách sạn theo ID
exports.getHotelById = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await db;
        const result = await pool.request()
            .input('hotelID', sql.Int, id)
            .query('SELECT * FROM Hotel WHERE hotelID = @hotelID');
        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'Hotel not found' });
        }
        res.json(result.recordset[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Tạo khách sạn mới
exports.createHotel = async (req, res) => {
    const { hotel_name, hotel_address, hotel_phone, hotel_email, rating } = req.body;
    try {
        const pool = await db.poolPromise;
        const result = await pool.request()
            .input('hotel_name', sql.NVarChar, hotel_name)
            .input('hotel_address', sql.NVarChar, hotel_address)
            .input('hotel_phone', sql.VarChar, hotel_phone)
            .input('hotel_email', sql.VarChar, hotel_email)
            .input('rating', sql.Float, rating)
            .query('INSERT INTO Hotel (hotel_name, hotel_address, hotel_phone, hotel_email, rating) VALUES (@hotel_name, @hotel_address, @hotel_phone, @hotel_email, @rating)');
        res.status(201).json({ message: 'Hotel created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Cập nhật thông tin khách sạn
exports.updateHotel = async (req, res) => {
    const { id } = req.params;
    const { hotel_name, hotel_address, hotel_phone, hotel_email, rating } = req.body;
    try {
        const pool = await db;
        const result = await pool.request()
            .input('hotelID', sql.Int, id)
            .input('hotel_name', sql.NVarChar, hotel_name)
            .input('hotel_address', sql.NVarChar, hotel_address)
            .input('hotel_phone', sql.VarChar, hotel_phone)
            .input('hotel_email', sql.VarChar, hotel_email)
            .input('rating', sql.Float, rating)
            .query('UPDATE Hotel SET hotel_name = @hotel_name, hotel_address = @hotel_address, hotel_phone = @hotel_phone, hotel_email = @hotel_email, rating = @rating WHERE hotelID = @hotelID');
        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: 'Hotel not found' });
        }
        res.json({ message: 'Hotel updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Xóa khách sạn
exports.deleteHotel = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await db;
        const result = await pool.request()
            .input('hotelID', sql.Int, id)
            .query('DELETE FROM Hotel WHERE hotelID = @hotelID');
        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: 'Hotel not found' });
        }
        res.json({ message: 'Hotel deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
