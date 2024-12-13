import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const RoomList = () => {
    const { hotelID } = useParams(); // Lấy hotelID từ URL
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
        return <div>Loading rooms...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>
                Rooms for Hotel {hotelID}
            </h1>
            {rooms.length === 0 ? (
                <p style={{ textAlign: 'center' }}>No rooms available for this hotel.</p>
            ) : (
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                        gap: '20px',
                    }}
                >
                    {rooms.map((room) => (
                        <div
                            key={room.roomID}
                            style={{
                                border: '1px solid #ddd',
                                borderRadius: '8px',
                                padding: '20px',
                                textAlign: 'center',
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                                backgroundColor: 'white',
                            }}
                        >
                            <h2>Room {room.roomID}</h2>
                            <p>Type: {room.room_type}</p>
                            <p>Price: ${room.price}</p>
                            <p>Status: {room.status}</p>
                            <button
                                onClick={() => handleAddToCart(room.roomID)}
                                style={{
                                    padding: '10px 20px',
                                    backgroundColor: '#007bff',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    marginTop: '10px',
                                }}
                            >
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RoomList;
