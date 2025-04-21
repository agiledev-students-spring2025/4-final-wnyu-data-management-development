import React from "react";
import { Link } from "react-router-dom";
import "./ProfileSidebar.css";

const ProfileSidebar = ({ isOpen, handleLogout, toggleSidebar }) => {
  return (
    <div className={`profile-sidebar ${isOpen ? "open" : ""}`}>
      <button className="profile-close-btn" onClick={toggleSidebar}>×</button>
      <div className="profile-title">Account</div>
      <ul>
        <li>
          <Link to="/profile" onClick={toggleSidebar}>Profile</Link>
        </li>
        <li>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ProfileSidebar;