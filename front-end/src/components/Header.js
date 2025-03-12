import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar"; // Import Sidebar
import "./Header.css";
import "./Sidebar.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [allowHover, setAllowHover] = useState(true);

  const toggleSidebar = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.classList.toggle("sidebar-open", !isMenuOpen);
  };

  const handleMouseEnter = () => {
    if (allowHover) {
      setIsMenuOpen(true);
    }
  };

  const handleMouseLeave = () => {
    setAllowHover(true);
  };

  return (
    <>
      {/* Sidebar Component */}
      <Sidebar isOpen={isMenuOpen} toggleSidebar={toggleSidebar} />

      {/* Header */}
      <header className="header">
        <img
          src={isMenuOpen ? "/backarrow.png" : "/menu.png"}
          alt="menu"
          className="menu"
          onClick={toggleSidebar}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />

        {/* Logo and Text */}
        <Link to="/" className="logo-container">
          <img src="/wnyu_logo2.png" alt="WNYU Logo" className="logo" />
          <div className="stacked-text">
            <h1>Archive</h1>
            <h2>WNYU's stored media</h2>
          </div>
        </Link>

        <img src="/profile.png" alt="Profile" className="profile" />
      </header>
    </>
  );
};

export default Header;
