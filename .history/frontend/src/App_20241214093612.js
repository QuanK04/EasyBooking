import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import HotelList from './components/HotelList';
import RoomList from './components/RoomList';
import CartPage from './components/CartPage';
import ReviewApp from './components/ReviewApp';
import Footer from './components/Footer';
import BookingsPage from './components/BookingsPage';
import './App.css';


const App = () => {
  return (
    <Router>
      {/* Thanh điều hướng */}
      <nav>
        <div className="nav__logo">Easy Booking</div>
        <ul className="nav__links">
          <li className="link"><a href="/">Home</a></li>
          <li className="link"><a href="/hotels">Hotels</a></li>
          <li className="link"><a href="/cart">Cart</a></li>
          <li className="link"><a href="/bookings">Bookings</a></li>
        </ul>
      </nav>

      {/* Route Definition*/}
      <Routes>
        {/*Route for Login*/}
        <Route path="/login" element={<Login />} />

        {/* Route cho trang chủ */}
        <Route
          path="/"
          element={
            <React.Fragment>
              <header className="section__container header__container">
                <div className="header__image__container">
                  <div className="header__content">
                    <h1>Enjoy Your Dream Vacation</h1>
                    <p>Book Hotels, Rooms and stay packages at the lowest price.</p>
                  </div>
                  <div className="booking__container">
                    <button 
                      className="btn" 
                      onClick={() => (window.location.href = '/hotels')}
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
              <div>
                <ReviewApp/>
              </div>
              <div>
                <Footer/>
              </div>
            </React.Fragment>
          }
        />

        {/* Route cho danh sách khách sạn */}
        <Route
          path="/hotels"
          element={
              <HotelList />
          }
        />

        {/* Route cho danh sách phòng */}
        <Route
          path="/rooms/:hotelID"
          element={
              <RoomList />
          }
        />

        {/* Route cho giỏ hàng */}
        <Route
          path="/cart"
          element={
              <CartPage />
          }
        />
        <Route
        path="/bookings"
        element={<BookingsPage />}
        />
      </Routes> 
    </Router>
  );
};

export default App;