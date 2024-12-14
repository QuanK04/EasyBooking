import React, { useEffect, useState } from 'react';
import './BookingsPage.css';
const BookingsPage = () => {
    const [bookings, setBookings] = useState([]); // Danh sách booking
    const [error, setError] = useState(null); // Lưu lỗi nếu có
    const customerID = 1; // Giả định customerID = 1 (có thể thay đổi theo người dùng đăng nhập)

    // Lấy danh sách booking từ API
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/bookings/${customerID}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch bookings');
                }
                const data = await response.json();
                setBookings(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchBookings();
    }, [customerID]);

    // Hiển thị lỗi nếu có
    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="bookings-container">
            <h1 className="bookings-header">Your Bookings</h1>
            {bookings.length === 0 ? (
                <p className="no-bookings">No bookings found.</p>
            ) : (
                <table className="bookings-table">
                    <thead>
                        <tr>
                            <th>Booking ID</th>
                            <th>Customer Name</th>
                            <th>Booking Date</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking.bookingID}>
                                <td>{booking.bookingID}</td>
                                <td>{booking.customer_name}</td>
                                <td>{new Date(booking.booking_date).toLocaleDateString()}</td>
                                <td>${booking.booking_price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default BookingsPage;
