const { poolPromise } = require('../config/database');

const registerCustomer = async (req, res) => {
    try {
        const { name, email, phone, address, username, password } = req.body;

        const pool = await poolPromise;
        const result = await pool.request()
            .input('name', name)
            .input('email', email)
            .input('phone', phone)
            .input('address', address)
            .input('username', username)
            .input('password', password)
            .query(`
                INSERT INTO Customer (name, email, phone, address, username, password)
                VALUES (@name, @email, @phone, @address, @username, @password)
            `);

        res.status(201).json({ message: 'Customer registered successfully!' });
    } catch (err) {
        console.error('Error registering customer:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const loginCustomer = async (req, res) => {
    try {
        const { username, password } = req.body;

        const pool = await poolPromise;
        const result = await pool.request()
            .input('username', username)
            .input('password', password)
            .query(`
                SELECT * FROM Customer
                WHERE username = @username AND password = @password
            `);

        if (result.recordset.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        res.status(200).json({ message: 'Login successful', customer: result.recordset[0] });
    } catch (err) {
        console.error('Error logging in:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    registerCustomer,
    loginCustomer
};
