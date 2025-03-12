import React from "react";
import {Link} from "react-router-dom";
import "./Header.css"; 
import { useState } from "react";
import Sidebar from "./components/Sidebar";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [allowHover, setAllowHover] = useState(true); // Controls hover behavior
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleMenuClick = () => {
    setIsMenuOpen(true); // Show back arrow
    setAllowHover(false); // Disable hover until mouse leaves and re-enters
    toggleSidebar();
  };

  const handleBackClick = () => {
    setIsMenuOpen(false); // Switch back to menu
    setAllowHover(false); // Prevent hover until mouse leaves and re-enters
    toggleSidebar();
  };

  const handleMouseEnter = () => {
    if (allowHover) {
      setIsMenuOpen(true); // Show back arrow
    }
  };

  const handleMouseLeave = () => {
    setAllowHover(true); // Re-enable hover after mouse leaves
  };

  return (
    <header className="header">
      {/* Menu / Back Arrow Toggle */}
      <img
        src={isMenuOpen ? "/backarrow.png" : "/menu.png"}
        alt="menu"
        className="menu"
        onClick={isMenuOpen ? handleBackClick : handleMenuClick}
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

      {/* Profile Icon */}
      <Link to="/login">
        <img src="/profile.png" alt="Profile" className="profile" />
      </Link>

      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </header>
  );
};

export default Header;

