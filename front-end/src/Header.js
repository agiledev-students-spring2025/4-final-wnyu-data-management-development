import React from "react";
import { Link } from "react-router-dom";
import "./Header.css"; 

const Header = () => {
  return (
    <header className="header">
      {/* Wrap the logo inside <Link> to navigate to "/" */}
      <Link to="/">
        <img src="/wnyu_logo2.png" alt="WNYU Logo" className="logo" />
      </Link>
      <img src="/profile.png" alt="Profile" className="profile" />
    </header>
  );
};

export default Header;