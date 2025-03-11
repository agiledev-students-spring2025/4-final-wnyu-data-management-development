import React from 'react';
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <div className="footer-section about">
        <h2 className="logo-text">WNYU Data Management</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, 
          pulvinar facilisis justo mollis, auctor consequat urna.
        </p>
        <div className="contact">
          <span><i className="fas fa-phone"></i> &nbsp; 123-456-789</span>
          <span><i className="fas fa-envelope"></i> &nbsp; info@wnyu.com</span>
        </div>
        <div className="socials">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
        </div>
      </div>

      <div className="footer-section links">
        <h2>Quick Links</h2>
        <br />
        <ul>
          <a href="#"><li>Home</li></a>
          <a href="#"><li>About</li></a>
          <a href="#"><li>Services</li></a>
          <a href="#"><li>Contact</li></a>
        </ul>
      </div>

      <div className="footer-section contact-form">
        <h2>Contact us</h2>
        <br />
        <form action="index.html" method="post">
          <input type="email" name="email" className="text-input contact-input" placeholder="Your email address..." />
          <textarea name="message" className="text-input contact-input" placeholder="Your message..."></textarea>
          <button type="submit" className="btn btn-big contact-btn">
            <i className="fas fa-envelope"></i>
            Send
          </button>
        </form>
      </div>
    </div>

    <div className="footer-bottom">
      &copy; wnyu.com | Designed by Student
    </div>
  </footer>
);

export default Footer;
