const db = require('../config/database');
const sql = require('mssql');

// Lấy danh sách tất cả các phòng
exports.getRooms = async (req, res) => {
    try {
        const pool = await db.poolPromise;
        const result = await pool.request().query('SELECT * FROM Room');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Lấy thông tin phòng theo ID
exports.getRoomsByHotelId = async (req, res) => {
    const { id } = req.params; // id là hotelID
    try {
        const pool = await db.poolPromise;
        const result = await pool.request()
            .input('hotelID', sql.Int, id)
            .query('SELECT * FROM Room WHERE hotelID = @hotelID');
        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'No rooms found for this hotel.' });
        }
        res.json(result.recordset); // Trả về toàn bộ danh sách phòng
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Tạo phòng mới
exports.createRoom = async (req, res) => {
    const { room_type, price, status, hotelID } = req.body;
    try {
        const pool = await db.poolPromise;
        const result = await pool.request()
            .input('room_type', sql.NVarChar, room_type)
            .input('price', sql.Float, price)
            .input('status', sql.NVarChar, status)
            .input('hotelID', sql.Int, hotelID)
            .query('INSERT INTO Room (room_type, price, status, hotelID) VALUES (@room_type, @price, @status, @hotelID)');
        res.status(201).json({ message: 'Room created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Cập nhật thông tin phòng
exports.updateRoom = async (req, res) => {
    const { id } = req.params;
    const { room_type, price, status, hotelID } = req.body;
    try {
        const pool = await db.poolPromise;
        const result = await pool.request()
            .input('roomID', sql.Int, id)
            .input('room_type', sql.NVarChar, room_type)
            .input('price', sql.Float, price)
            .input('status', sql.NVarChar, status)
            .input('hotelID', sql.Int, hotelID)
            .query('UPDATE Room SET room_type = @room_type, price = @price, status = @status, hotelID = @hotelID WHERE roomID = @roomID');
        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.json({ message: 'Room updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Xóa phòng
exports.deleteRoom = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await db.poolPromise;
        const result = await pool.request()
            .input('roomID', sql.Int, id)
            .query('DELETE FROM Room WHERE roomID = @roomID');
        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.json({ message: 'Room deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
