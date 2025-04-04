import React from "react";
import { Link } from "react-router-dom";
import "./ProfileSidebar.css";

const ProfileSidebar = ({ isOpen, handleLogout }) => {
  return (
    <div className={`profile-sidebar ${isOpen ? "open" : ""}`}>
      <ul>
        <li>
          <Link to="/profile">Profile</Link>
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
