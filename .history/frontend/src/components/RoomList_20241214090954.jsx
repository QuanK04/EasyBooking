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
    const handleRemoveFromCart = async (cartID) => {
        try {
            const response = await fetch(`http://localhost:5000/api/carts/${cartID}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to remove item from cart');
            }

            alert('Room removed from cart successfully');
            setCartItems(cartItems.filter(item => item.cartID !== cartID));
        } catch (err) {
            alert(err.message);
        }
    };

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
        <div style={{ padding: '20px', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Your Cart</h1>
            {cartItems.length === 0 ? (
                <p style={{ textAlign: 'center' }}>Your cart is empty.</p>
            ) : (
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: '20px',
                    }}
                >
                    {cartItems.map((item) => (
                        <div
                            key={item.cartID}
                            style={{
                                border: '1px solid #ddd',
                                borderRadius: '8px',
                                padding: '20px',
                                backgroundColor: '#fff',
                                textAlign: 'center',
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            <img
                                src="assets/room-placeholder.jpg" // Đường dẫn ảnh tạm thời
                                alt={`Room ${item.roomID}`}
                                style={{
                                    width: '100%',
                                    height: '150px',
                                    objectFit: 'cover',
                                    borderRadius: '8px 8px 0 0',
                                }}
                            />
                            <h2 style={{ margin: '15px 0' }}>Room {item.roomID}</h2>
                            <p>Type: {item.room_type}</p>
                            <p>Price: ${item.price}</p>
                            <button
                                onClick={() => handleRemoveFromCart(item.cartID)}
                                style={{
                                    padding: '10px 20px',
                                    backgroundColor: '#dc3545',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    marginTop: '15px',
                                }}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
            {cartItems.length > 0 && (
                <button
                    onClick={handleConfirmBooking}
                    style={{
                        display: 'block',
                        margin: '30px auto 0',
                        padding: '15px 30px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontSize: '16px',
                    }}
                >
                    Confirm Booking
                </button>
            )}
        </div>
    );
};

export default CartPage;
