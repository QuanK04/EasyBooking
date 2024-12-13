import React from 'react';

const Footer = () => {
    return (
        <div>
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
        </div>
    );
};

export default Footer;