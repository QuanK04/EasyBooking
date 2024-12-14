const { poolPromise } = require('../config/database');

const getBookings = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM Booking');
        res.status(200).json(result.recordset);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getBookingById = async (req, res) => {
    try {
        const { id } = req.params;
        const pool = await poolPromise;
        const result = await pool.request()
            .input('bookingID', id)
            .query('SELECT * FROM Booking WHERE bookingID = @bookingID');
        if (result.recordset.length === 0) return res.status(404).json({ message: 'Booking not found' });
        res.status(200).json(result.recordset[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createBooking = async (req, res) => {
    try {
        const { booking_date, booking_price, check_in, check_out, customerID, roomID } = req.body;
        const pool = await poolPromise;
        await pool.request()
            .input('booking_date', booking_date)
            .input('booking_price', booking_price)
            .input('check_in', check_in)
            .input('check_out', check_out)
            .input('customerID', customerID)
            .input('roomID', roomID)
            .query('INSERT INTO Booking (booking_date, booking_price, check_in, check_out, customerID, roomID) VALUES (@booking_date, @booking_price, @check_in, @check_out, @customerID, @roomID)');
        res.status(201).json({ message: 'Booking created successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const { booking_date, booking_price, check_in, check_out } = req.body;
        const pool = await poolPromise;
        const result = await pool.request()
            .input('bookingID', id)
            .input('booking_date', booking_date)
            .input('booking_price', booking_price)
            .input('check_in', check_in)
            .input('check_out', check_out)
            .query('UPDATE Booking SET booking_date = @booking_date, booking_price = @booking_price, check_in = @check_in, check_out = @check_out WHERE bookingID = @bookingID');
        if (result.rowsAffected[0] === 0) return res.status(404).json({ message: 'Booking not found' });
        res.status(200).json({ message: 'Booking updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const pool = await poolPromise;
        const result = await pool.request()
            .input('bookingID', id)
            .query('DELETE FROM Booking WHERE bookingID = @bookingID');
        if (result.rowsAffected[0] === 0) return res.status(404).json({ message: 'Booking not found' });
        res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getBookings, getBookingById, createBooking, updateBooking, deleteBooking };
