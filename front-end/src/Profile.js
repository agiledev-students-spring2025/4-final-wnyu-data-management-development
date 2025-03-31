import React from "react";
import { useNavigate } from "react-router-dom";
import './Profile.css';

const Profile = () => {
  // Example user data
  const user = {
    userName: "admin123",
    role: "Admin",
    email: "johndoe@example.com",
    profilePic: "/example-pic.png", 
  };
  const navigate = useNavigate()

  return (
    <div className="profile-container">
      {/* Header */}

      {/* Profile Picture */}
      <img src={user.profilePic} alt="Profile" className="profile-pic" />

      {/* User Name */}
      <h2 className="profile-name">
        {user.firstName} {user.lastName}
      </h2>

      {/* User Role */}
      <p className="profile-role">{user.role}</p>

      {/* Email */}
      <p className="profile-email">{user.email}</p>

      {/* Log Out Button */}
      <button className="logout-button" onClick={() => navigate('/')}>Log Out </button>
    </div>
  );
};

export default Profile;
