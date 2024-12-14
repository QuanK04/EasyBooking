const db = require('../config/database');
const sql = require('mssql');

// API: Lấy danh sách booking theo customerID
exports.getBookingsByCustomerId = async (req, res) => {
    const { customerID } = req.params;
    try {
        const pool = await db.poolPromise;
        const result = await pool.request()
            .input('customerID', sql.Int, customerID)
            .query(`
                SELECT 
                    b.bookingID,
                    b.booking_price,
                    b.booking_date,
                    c.name AS customer_name
                FROM Booking b
                INNER JOIN Customer c ON b.customerID = c.customerID
                WHERE b.customerID = @customerID
            `);

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'No bookings found for this customer' });
        }

        res.status(200).json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
