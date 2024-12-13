import React from 'react';
import './App.css';

const App = () => {
  return (
    <>
      <nav>
        <div className="nav__logo">Easy Booking</div>
        <ul className="nav__links">
          <li className="link"><a href="#">Home</a></li>
          <li className="link"><a href="#">Book</a></li>
          <li className="link"><a href="#">Blog</a></li>
          <li className="link"><a href="#">Contact Us</a></li>
        </ul>
      </nav>
      <header className="section__container header__container">
        <div className="header__image__container">
          <div className="header__content">
            <h1>Enjoy Your Dream Vacation</h1>
            <p>Book Hotels, Rooms and stay packages at lowest price.</p>
          </div>
          <div className="booking__container">
            <form>
              <div className="form__group">
                <div className="input__group">
                  <input type="text" />
                  <label>Location</label>
                </div>
                <p>Where are you going?</p>
              </div>
              <div className="form__group">
                <div className="input__group">
                  <input type="text" />
                  <label>Check In</label>
                </div>
                <p>Add date</p>
              </div>
              <div className="form__group">
                <div className="input__group">
                  <input type="text" />
                  <label>Check Out</label>
                </div>
                <p>Add date</p>
              </div>
              <div className="form__group">
                <div className="input__group">
                  <input type="text" />
                  <label>Guests</label>
                </div>
                <p>Add guests</p>
              </div>
            </form>
            <button className="btn"><i className="ri-search-line"></i></button>
          </div>
        </div>
      </header>
      <section className="section__container popular__container">
        <h2 className="section__header">Popular Hotels</h2>
        <div className="popular__grid">
          <div className="popular__card">
            <img src="assets/hotel-1.jpg" alt="popular hotel" />
            <div className="popular__content">
              <div className="popular__card__header">
                <h4>The Plaza Hotel</h4>
                <h4>$499</h4>
              </div>
              <p>New York City, USA</p>
            </div>
          </div>
          <div className="popular__card">
            <img src="assets/hotel-2.jpg" alt="popular hotel" />
            <div className="popular__content">
              <div className="popular__card__header">
                <h4>Ritz Paris</h4>
                <h4>$549</h4>
              </div>
              <p>Paris, France</p>
            </div>
          </div>
          <div className="popular__card">
            <img src="assets/hotel-3.jpg" alt="popular hotel" />
            <div className="popular__content">
              <div className="popular__card__header">
                <h4>The Peninsula</h4>
                <h4>$599</h4>
              </div>
              <p>Hong Kong</p>
            </div>
          </div>
          <div className="popular__card">
            <img src="assets/hotel-4.jpg" alt="popular hotel" />
            <div className="popular__content">
              <div className="popular__card__header">
                <h4>Atlantis The Palm</h4>
                <h4>$449</h4>
              </div>
              <p>Dubai, United Arab Emirates</p>
            </div>
          </div>
          <div className="popular__card">
            <img src="assets/hotel-5.jpg" alt="popular hotel" />
            <div className="popular__content">
              <div className="popular__card__header">
                <h4>The Ritz-Carlton</h4>
                <h4>$649</h4>
              </div>
              <p>Tokyo, Japan</p>
            </div>
          </div>
          <div className="popular__card">
            <img src="assets/hotel-6.jpg" alt="popular hotel" />
            <div className="popular__content">
              <div className="popular__card__header">
                <h4>Marina Bay Sands</h4>
                <h4>$549</h4>
              </div>
              <p>Singapore</p>
            </div>
          </div>
        </div>
      </section>
      <section className="client">
        <div className="section__container client__container">
          <h2 className="section__header">What our clients say</h2>
          <div className="client__grid">
            <div className="client__card">
              <img src="assets/client-1.jpg" alt="client" />
              <p>
                The booking process was seamless, and the confirmation was instant. I highly recommend Easy Booking for hassle-free hotel bookings.
              </p>
            </div>
            <div className="client__card">
              <img src="assets/client-2.jpg" alt="client" />
              <p>
                The website provided detailed information about hotels, including amenities, photos, which helped me make an informed decision.
              </p>
            </div>
            <div className="client__card">
              <img src="assets/client-3.jpg" alt="client" />
              <p>
                I was able to book a room within minutes, and the hotel exceeded my expectations. I appreciate Easy Booking's efficiency and reliability.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="section__container">
        <div className="reward__container">
          <p>100+ discount codes</p>
          <h4>Join rewards and discover amazing discounts on your booking</h4>
          <button className="reward__btn" >Join Rewards</button>
        </div>
      </section>
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
            <h4>Company</h4>
            <p>About Us</p>
            <p>Our Team</p>
            <p>Blog</p>
            <p>Book</p>
            <p>Contact Us</p>
          </div>
          <div className="footer__col">
            <h4>Legal</h4>
            <p>FAQs</p>
            <p>Terms & Conditions</p>
            <p>Privacy Policy</p>
          </div>
          <div className="footer__col">
            <h4>Resources</h4>
            <p>Social Media</p>
            <p>Help Center</p>
            <p>Partnerships</p>
          </div>
        </div>
        <div className="footer__bar">
          Copyright © 2024 Database Lab. All rights reserved.
        </div>
      </footer>
    </>
  );
};

export default App;
