import React, { useEffect, useState } from 'react';
import './CartPage.css';

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
            const data = await response.json();
            alert(`Booking confirmed successfully! Your booking ID is: ${data.bookingID}`);
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
        <div className="cart-container">
            <h1 className="cart-header">Your Cart</h1>
            {cartItems.length === 0 ? (
                <p className="cart-empty">Your cart is empty.</p>
            ) : (
                <div>
                    <ul className="cart-list">
                        {cartItems.map((item) => (
                            <li key={item.cartID} className="cart-item">
                                <div className="cart-item-details">
                                    <h2>Room {item.roomID}</h2>
                                    <p>Type: {item.room_type}</p>
                                    <p>Price: ${item.price}</p>
                                </div>
                                <button
                                    onClick={() => handleRemoveFromCart(item.cartID)}
                                    className="remove-btn"
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                    <button onClick={handleConfirmBooking} className="confirm-btn">
                        Confirm Booking
                    </button>
                </div>
            )}
        </div>
    );
    
};

export default CartPage;
