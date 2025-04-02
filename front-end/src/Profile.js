import React from "react";
import { useNavigate } from "react-router-dom";
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user')) || {
    firstName: "Guest",
    role: "Unknown",
    email: "N/A",
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="profile-container">
      <h2>{user.username}</h2>
      <p>Role: {user.role}</p>
      <p>Email: {user.email}</p>
      <button className="logout-button" onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default Profile;
