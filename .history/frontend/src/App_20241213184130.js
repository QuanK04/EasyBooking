import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Sử dụng Router
import Login from './components/Login';
import HotelList from './components/HotelList'; // Import HotelList
import RoomList from './components/RoomList';
import Cart from './components/CartPage';
import './App.css';

const App = () => {
  return (
    <Router>
      <nav>
        <div className="nav__logo">Easy Booking</div>
        <ul className="nav__links">
          <li className="link"><a href="/">Home</a></li>
          <li className="link"><a href="/hotels">Hotels</a></li>
          <li className="link"><a href="/carts">Cart</a></li>
        </ul>
      </nav>

      <Routes>
        {/* Trang chủ */}
        <Route
          path="/"
          element={
            <header className="section__container header__container">
              <div className="header__image__container">
                <div className="header__content">
                  <h1>Enjoy Your Dream Vacation</h1>
                  <p>Book Hotels, Rooms and stay packages at the lowest price.</p>
                </div>
                <div className="booking__container">
                  <button 
                    className="btn" 
                    onClick={() => (window.location.href = '/hotels')} // Điều hướng bằng URL
                    style={{
                      padding: '10px 20px',
                      fontSize: '16px',
                      cursor: 'pointer',
                      marginTop: '20px'
                    }}
                  >
                    View Hotels
                  </button>
                </div>
              </div>
            </header>
            
          }
        />

        {/* Trang danh sách khách sạn */}
        <Route path="/hotels" element={<HotelList />} />
        <Route path="/rooms/:hotelID" element={<RoomList />} /> {/* Route RoomList */}
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />

      </Routes>
      <footer className="footer">
        <div className="section__container footer__container">
          <div className="footer__col">
            <h3>Easy Booking</h3>
            <p>
              Easy Booking is a premier hotel booking website that offers a seamless and convenient way to find and book accommodations worldwide.
            </p>
            <p>
              With a user-friendly interface and a vast selection of hotels, Easy Booking aims to provide a stress-free experience for travelers seeking the perfect stay.
            </p>
          </div>
          <div className="footer__col">
            <h4>Group</h4>
            <p>About Us</p>
          </div>
        </div>
      </footer>
    </Router>
  );
};

export default App;
