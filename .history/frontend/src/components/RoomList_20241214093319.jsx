import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import './RoomList.css';

const RoomList = () => {
    const { hotelID } = useParams(); // Lấy hotelID từ URL
    const navigate = useNavigate();
    const [rooms, setRooms] = useState([]); // Lưu danh sách phòng
    const [error, setError] = useState(null); // Lưu lỗi nếu có
    const [loading, setLoading] = useState(true); // Trạng thái loading

    // Hàm gọi API để lấy danh sách phòng theo hotelID
    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/rooms/${hotelID}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch rooms');
                }
                const data = await response.json();
                setRooms(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRooms();
    }, [hotelID]);

    // Hàm xử lý thêm phòng vào giỏ hàng
    const handleAddToCart = async (roomID) => {
        const customerID = 1; // Giả sử ID khách hàng là 1 (cần thay đổi nếu có đăng nhập)
        try {
            const response = await fetch('http://localhost:5000/api/carts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ roomID, customerID }),
            });

            if (!response.ok) {
                throw new Error('Failed to add to cart');
            }

            alert(`Room ${roomID} has been added to your cart!`);
        } catch (err) {
            alert(err.message);
        }
    };

    // Xử lý trạng thái loading và lỗi
    if (loading) {
        return <div className="loading">Loading rooms...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    return (
        <div className="room-list-container">
            <h1 className="header">Rooms for Hotel {hotelID}</h1>
            {rooms.length === 0 ? (
                <p className="no-rooms">No rooms available for this hotel.</p>
            ) : (
                <div className="room-grid">
                    {rooms.map((room) => (
                        <div key={room.roomID} className="room-card">
                            <h2 className="room-title">Room {room.roomID}</h2>
                            <p className="room-info">Type: {room.room_type}</p>
                            <p className="room-info">Price: ${room.price}</p>
                            <p className={`room-status ${room.status === 'Available' ? 'available' : 'occupied'}`}>
                                Status: {room.status}
                            </p>
                            <button
                                onClick={() => handleAddToCart(room.roomID)}
                                className="add-to-cart-btn"
                                disabled={room.status !== 'Available'}
                            >
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
            )}
            <button
            onClick={() => navigate('/hotellist')}
            className="back-btn"
        >
            Back to Hotel List
        </button>
        </div>
    );
};

export default RoomList;