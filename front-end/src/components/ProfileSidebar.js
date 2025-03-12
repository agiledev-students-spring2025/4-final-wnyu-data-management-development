import React from "react";
import { Link } from "react-router-dom";
import "./ProfileSidebar.css";

const ProfileSidebar = ({ isOpen }) => {
  return (
    <div className={`profile-sidebar ${isOpen ? "open" : ""}`}>
      <ul>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/logout">Logout</Link>
        </li>
      </ul>
    </div>
  );
};

export default ProfileSidebar;
