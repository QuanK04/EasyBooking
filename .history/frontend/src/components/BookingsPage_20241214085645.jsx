import React, { useEffect, useState } from 'react';

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
        <div>
            <h1>Your Bookings</h1>
            {bookings.length === 0 ? (
                <p>No bookings found.</p>
            ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid #ddd', padding: '10px' }}>Booking ID</th>
                            <th style={{ border: '1px solid #ddd', padding: '10px' }}>Customer Name</th>
                            <th style={{ border: '1px solid #ddd', padding: '10px' }}>Booking Date</th>
                            <th style={{ border: '1px solid #ddd', padding: '10px' }}>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking.bookingID}>
                                <td style={{ border: '1px solid #ddd', padding: '10px' }}>{booking.bookingID}</td>
                                <td style={{ border: '1px solid #ddd', padding: '10px' }}>{booking.customer_name}</td>
                                <td style={{ border: '1px solid #ddd', padding: '10px' }}>{new Date(booking.booking_date).toLocaleDateString()}</td>
                                <td style={{ border: '1px solid #ddd', padding: '10px' }}>${booking.booking_price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default BookingsPage;
