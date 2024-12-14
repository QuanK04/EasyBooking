const db = require('../config/database');
const sql = require('mssql');

// API: Lấy giỏ hàng theo customerID
exports.getCartByCustomerId = async (req, res) => {
    const { customerID } = req.params;
    try {
        const pool = await db.poolPromise;
        const result = await pool.request()
            .input('customerID', sql.Int, customerID)
            .query(`
                SELECT c.cartID, r.roomID, r.room_type, r.price
                FROM Cart c
                INNER JOIN Room r ON c.roomID = r.roomID
                WHERE c.customerID = @customerID
            `);
        res.json(result.recordset); // Trả về danh sách phòng trong giỏ hàng
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addToCart = async (req, res) => {
    const { roomID, customerID } = req.body;
    try {
        const pool = await db.poolPromise;
        const roomCheck = await pool.request()
            .input('roomID', sql.Int, roomID)
            .query('SELECT * FROM Room WHERE roomID = @roomID');
        if (roomCheck.recordset.length === 0) {
            return res.status(404).json({ message: 'Room not found' });
        }
        const room = roomCheck.recordset[0];

        // Kiểm tra trạng thái phòng
        if (room.status.toLowerCase() !== 'available') {
            return res.status(400).json({ message: 'Room is not available for booking' });
        }
        // Thêm phòng vào giỏ hàng
        await pool.request()
            .input('roomID', sql.Int, roomID)
            .input('customerID', sql.Int, customerID)
            .query('INSERT INTO Cart VALUES (@roomID, @customerID)');
        
        res.status(201).json({ message: 'Room added to cart successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.removeFromCart = async (req, res) => {
    const { cartID } = req.params;
    try {
        const pool = await db.poolPromise;

        const result = await pool.request()
            .input('cartID', sql.Int, cartID)
            .query('DELETE FROM Cart WHERE cartID = @cartID');
        
        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        res.status(200).json({ message: 'Cart item removed successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.confirmBooking = async (req, res) => {
    const { customerID } = req.body; // Lấy customerID từ request body
    try {
        console.log('CustomerID:', customerID);

        const pool = await db.poolPromise;

        // Lấy danh sách phòng từ giỏ hàng của customer
        const cartItems = await pool.request()
            .input('customerID', sql.Int, customerID)
            .query('SELECT roomID FROM Cart WHERE customerID = @customerID');
        
        if (cartItems.recordset.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }
        
        const totalPrice = cartItems.recordset.reduce((sum, item) => sum + item.price, 0);

        // Tạo booking mới
        const result = await pool.request()
            .input('booking_price', sql.Float, totalPrice)
            .input('booking_date', sql.DateTime, new Date()) // Thời gian hiện tại
            .input('customerID', sql.Int, customerID)
            .query(`
                INSERT INTO Booking (booking_price, booking_date, customerID)
                OUTPUT INSERTED.bookingID
                VALUES (@booking_price, @booking_date, @customerID)
            `);

        const bookingID = result.recordset[0].bookingID;
        console.log('Booking ID:', bookingID);


        // Chuyển trạng thái của các phòng trong giỏ hàng thành 'Occupied'
        for (const item of cartItems.recordset) {
            await pool.request()
                .input('roomID', sql.Int, item.roomID)
                .query('UPDATE Room SET status = \'Occupied\' WHERE roomID = @roomID');
            await pool.request()
                .input('bookingID', sql.Int, bookingID)
                .input('roomID', sql.Int, item.roomID)
                .query('INSERT INTO BookingRoom (bookingID, roomID) VALUES (@bookingID, @roomID)');
        }

        // Xóa các phòng trong giỏ hàng sau khi đặt phòng thành công
        await pool.request()
            .input('customerID', sql.Int, customerID)
            .query('DELETE FROM Cart WHERE customerID = @customerID');

        res.status(200).json({ message: 'Booking confirmed successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};