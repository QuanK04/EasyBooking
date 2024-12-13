import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HotelList.css';
const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Gọi API từ backend
    fetch('http://localhost:5000/api/hotels')
      .then((response) => response.json())
      .then((data) => setHotels(data))
      .catch((error) => console.error('Error fetching hotels:', error));
  }, []);

  return (
  <section className="section__container popular__container">
    <h2 className="section__header">Available Hotels</h2>
      <div className="popular__grid">
        {hotels.map((hotel,index)=>(
        <div className="popular__card" key={index}>
        <img src="assets/hotel-1.jpg" alt="popular hotel" />
        <div className="popular__content">
        <div className="popular__card__header">
          <h4>{hotel.hotel_name}</h4>
          <h4>{hotel.hotel_rating}</h4>
        </div>
        <p>{hotel.hotel_address}</p>
        <button className='button-28' onClick={() => navigate(`/rooms/${hotel.hotelID}`)}>
          View Rooms
        </button>
        </div>  
        </div>
        ))}
      </div>
  </section>
  );
};

export default HotelList;