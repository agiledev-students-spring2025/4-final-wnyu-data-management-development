import React from "react";
import { Link } from "react-router-dom";
import "./Header.css"; 

const Header = () => {
  return (
    <header className="header">
      <div className="logo">WNYU</div>
      <nav className="nav-menu">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/Collection">Collection</Link></li>
          <li><Link to="/Contacts">Contacts</Link></li>
          <li><Link to="/Profile">Profile</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;