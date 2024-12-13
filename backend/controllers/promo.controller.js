const db = require('../config/database');
const sql = require('mssql');

// Lấy danh sách tất cả khuyến mãi
exports.getPromos = async (req, res) => {
    try {
        const pool = await db.poolPromise;
        const result = await pool.request().query('SELECT * FROM Promo');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Lấy thông tin khuyến mãi theo ID
exports.getPromoById = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await db.poolPromise;
        const result = await pool.request()
            .input('promoID', sql.Int, id)
            .query('SELECT * FROM Promo WHERE promoID = @promoID');
        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'Promo not found' });
        }
        res.json(result.recordset[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Tạo khuyến mãi mới
exports.createPromo = async (req, res) => {
    const { promoName, discount_type, discount_value, promo_start_date, promo_end_date } = req.body;
    try {
        const pool = await db.poolPromise;
        await pool.request()
            .input('promoName', sql.NVarChar, promoName)
            .input('discount_type', sql.NVarChar, discount_type)
            .input('discount_value', sql.Float, discount_value)
            .input('promo_start_date', sql.Date, promo_start_date)
            .input('promo_end_date', sql.Date, promo_end_date)
            .query(`
                INSERT INTO Promo (promoName, discount_type, discount_value, promo_start_date, promo_end_date)
                VALUES (@promoName, @discount_type, @discount_value, @promo_start_date, @promo_end_date)
            `);
        res.status(201).json({ message: 'Promo created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Cập nhật khuyến mãi
exports.updatePromo = async (req, res) => {
    const { id } = req.params;
    const { promoName, discount_type, discount_value, promo_start_date, promo_end_date } = req.body;
    try {
        const pool = await db.poolPromise;
        const result = await pool.request()
            .input('promoID', sql.Int, id)
            .input('promoName', sql.NVarChar, promoName)
            .input('discount_type', sql.NVarChar, discount_type)
            .input('discount_value', sql.Float, discount_value)
            .input('promo_start_date', sql.Date, promo_start_date)
            .input('promo_end_date', sql.Date, promo_end_date)
            .query(`
                UPDATE Promo
                SET promoName = @promoName, discount_type = @discount_type,
                    discount_value = @discount_value, promo_start_date = @promo_start_date,
                    promo_end_date = @promo_end_date
                WHERE promoID = @promoID
            `);
        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: 'Promo not found' });
        }
        res.json({ message: 'Promo updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Xóa khuyến mãi
exports.deletePromo = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await db.poolPromise;
        const result = await pool.request()
            .input('promoID', sql.Int, id)
            .query('DELETE FROM Promo WHERE promoID = @promoID');
        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: 'Promo not found' });
        }
        res.json({ message: 'Promo deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
