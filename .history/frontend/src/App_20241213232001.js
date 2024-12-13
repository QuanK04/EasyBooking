import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import HotelList from './components/HotelList';
import RoomList from './components/RoomList';
import CartPage from './components/CartPage';
import PrivateRoute from './components/PrivateRoute';
import Review_App from './components/Review_App';
import Footer from './components/Footer';
import './App.css';


const App = () => {
  return (
    <Router>
      {/* Thanh điều hướng */}
      <nav>
        <div className="nav__logo">Easy Booking</div>
        <ul className="nav__links">
          <li className="link"><a href="#">Home</a></li>
          <li className="link"><a href="#">Book</a></li>
          <li className="link"><a href="#">Blog</a></li>
          <li className="link"><a href="#">Contact Us</a></li>
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
                <Review_App />
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
            <PrivateRoute>
              <HotelList />
            </PrivateRoute>
          }
        />

        {/* Route cho danh sách phòng */}
        <Route
          path="/rooms/:hotelID"
          element={
            <PrivateRoute>
              <RoomList />
            </PrivateRoute>
          }
        />

        {/* Route cho giỏ hàng */}
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <CartPage />
            </PrivateRoute>
          }
        />
      </Routes> 
    </Router>
  );
};

export default App;