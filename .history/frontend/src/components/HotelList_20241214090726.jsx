import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HotelList.css';
const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();

  const hotelImages = {
    1: 'assets/hotel-1.jpg',
    2: 'assets/hotel-2.jpg',
    3: 'assets/hotel-3.jpg',
    4: 'assets/hotel-4.jpg',
    5: 'assets/hotel-5.jpg',
    6: 'assets/hotel-6.jpg',
  };
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
        <img
              src={hotelImages[hotel.hotelID] || 'assets/default-hotel.jpg'}
              alt={`Hotel ${hotel.hotel_name}`}
            />
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