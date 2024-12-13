import React, { useEffect, useState } from 'react';

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]); // Danh sách phòng trong giỏ hàng
    const [error, setError] = useState(null); // Lưu lỗi nếu có
    const customerID = 1; // Sử dụng customerID giả định là 1

    // Lấy danh sách phòng trong giỏ hàng của customerID
    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/carts/${customerID}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch cart items');
                }
                const data = await response.json();
                setCartItems(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchCartItems();
    }, [customerID]);

    // Xóa phòng khỏi giỏ hàng
    const handleConfirmBooking = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/carts/confirm`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ customerID }),
            });

            if (!response.ok) {
                throw new Error('Failed to confirm booking');
            }

            alert('Booking confirmed successfully!');
            setCartItems([]); // Reset giỏ hàng sau khi đặt phòng
        } catch (err) {
            alert(err.message);
        }
    };
    // Hiển thị lỗi nếu có
    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Your Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    <ul>
                        {cartItems.map((item) => (
                            <li key={item.roomID}>
                                <h2>Room {item.roomID}</h2>
                                <p>Type: {item.room_type}</p>
                                <p>Price: ${item.price}</p>
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={handleConfirmBooking}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            marginTop: '20px',
                        }}
                    >
                        Confirm Booking
                    </button>
                </div>
            )}
        </div>
    );
};

export default CartPage;