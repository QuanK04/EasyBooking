const jwt = require('jsonwebtoken');
const db = require('../config/database');
const sql = require('mssql');

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const pool = await db.poolPromise;

        // Kiểm tra thông tin người dùng
        const result = await pool.request()
            .input('username', sql.VarChar, username)
            .input('password', sql.VarChar, password)
            .query('SELECT * FROM Customer WHERE username = @username AND password = @password');

        if (result.recordset.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const customer = result.recordset[0];

        // Tạo JWT token
        const token = jwt.sign(
            { customerID: customer.customerID, username: customer.username },
            process.env.JWT_SECRET || 'your_secret_key', // Đặt khóa bí mật trong `.env`
            { expiresIn: '1h' }
        );

        res.json({ token, message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
