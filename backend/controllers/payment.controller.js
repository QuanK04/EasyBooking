const db = require('../config/database');
const sql = require('mssql');

// Lấy danh sách tất cả các thanh toán
exports.getPayments = async (req, res) => {
    try {
        const pool = await db.poolPromise;
        const result = await pool.request().query('SELECT * FROM Payment');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Lấy thông tin chi tiết một thanh toán
exports.getPaymentById = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await db.poolPromise;
        const result = await pool.request()
            .input('paymentID', sql.Int, id)
            .query('SELECT * FROM Payment WHERE paymentID = @paymentID');
        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        res.json(result.recordset[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Tạo thanh toán mới
exports.createPayment = async (req, res) => {
    const { pay_amount, pay_date, pay_method, status, bookingID } = req.body;
    try {
        const pool = await db.poolPromise;
        await pool.request()
            .input('pay_amount', sql.Float, pay_amount)
            .input('pay_date', sql.DateTime, pay_date)
            .input('pay_method', sql.NVarChar, pay_method)
            .input('status', sql.NVarChar, status)
            .input('bookingID', sql.Int, bookingID)
            .query(`
                INSERT INTO Payment (pay_amount, pay_date, pay_method, status, bookingID)
                VALUES (@pay_amount, @pay_date, @pay_method, @status, @bookingID)
            `);
        res.status(201).json({ message: 'Payment created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Cập nhật thông tin thanh toán
exports.updatePayment = async (req, res) => {
    const { id } = req.params;
    const { pay_amount, pay_date, pay_method, status } = req.body;
    try {
        const pool = await db.poolPromise;
        const result = await pool.request()
            .input('paymentID', sql.Int, id)
            .input('pay_amount', sql.Float, pay_amount)
            .input('pay_date', sql.DateTime, pay_date)
            .input('pay_method', sql.NVarChar, pay_method)
            .input('status', sql.NVarChar, status)
            .query(`
                UPDATE Payment
                SET pay_amount = @pay_amount, pay_date = @pay_date,
                    pay_method = @pay_method, status = @status
                WHERE paymentID = @paymentID
            `);
        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        res.json({ message: 'Payment updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Xóa một thanh toán
exports.deletePayment = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await db.poolPromise;
        const result = await pool.request()
            .input('paymentID', sql.Int, id)
            .query('DELETE FROM Payment WHERE paymentID = @paymentID');
        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        res.json({ message: 'Payment deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
