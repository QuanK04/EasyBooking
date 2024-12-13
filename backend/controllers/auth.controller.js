const db = require('../config/database');
const sql = require('mssql');
const jwt = require('jsonwebtoken');

// Đăng nhập khách hàng
exports.customerLogin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const pool = await db.poolPromise;
        const result = await pool.request()
            .input('username', sql.NVarChar, username)
            .input('password', sql.NVarChar, password)
            .query('SELECT * FROM Customer WHERE username = @username AND password = @password');

        if (result.recordset.length === 0) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const customer = result.recordset[0];
        const token = jwt.sign({ id: customer.customerID }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token, customer });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Đăng nhập admin
exports.adminLogin = (req, res) => {
    const { username, password } = req.body;

    if (username === 'admin' && password === 'admin') {
        const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, role: 'admin' });
    } else {
        res.status(401).json({ error: 'Invalid admin credentials' });
    }
};
