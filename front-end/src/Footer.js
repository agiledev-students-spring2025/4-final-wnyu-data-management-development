import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css"; 

const Footer = () => {
  return (
    <footer className="footer"> 
        <p>&copy; WNYU 89.1 FM</p>
        <Link to="/">Contact Us</Link>
    </footer>
  );
};

export default Footer;