import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import ProfileSidebar from "./ProfileSidebar"; 
import "./Header.css";
import "./ProfileSidebar.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false); 
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.classList.toggle("sidebar-open", !isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const isLoggedIn = !!localStorage.getItem("user");

  const handleProfileClick = () => {
    if (isLoggedIn) {
      setIsProfileOpen(!isProfileOpen);
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <Sidebar isOpen={isMenuOpen} toggleSidebar={toggleSidebar} />

      <header className="header">
        <img
          src={isMenuOpen ? "/backarrow.png" : "/menu.png"}
          alt="menu"
          className="menu"
          onClick={toggleSidebar}
        />

        <Link to="/" className="logo-container">
          <img src="/wnyu_logo2.png" alt="WNYU Logo" className="logo" />
          <div className="stacked-text">
            <h1>Cache</h1>
            <h2>WNYU's stored media</h2>
          </div>
        </Link>

        <div className="profile-container" onClick={handleProfileClick}>
          <img src="/profile.png" alt="Profile" className="profile" />
          {isLoggedIn && (
            <ProfileSidebar
              isOpen={isProfileOpen}
              handleLogout={handleLogout}
            />
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
