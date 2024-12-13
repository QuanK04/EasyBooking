import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div className="hotel-list">
      <h1>List of Hotels</h1>
      {hotels.map((hotel) => (
        <div key={hotel.hotelID} className="hotel-card">
          <h2>{hotel.hotel_name}</h2>
          <p>{hotel.hotel_address}</p>
          <p>{hotel.hotel_phone}</p>
          <button onClick={() => navigate(`/rooms/${hotel.hotelID}`)}>
            View Rooms
          </button>
        </div>
      ))}
    </div>
  );
};

export default HotelList;
