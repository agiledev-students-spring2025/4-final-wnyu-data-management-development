import React from "react";

const Profile = () => {
  // Example user data
  const user = {
    firstName: "John",
    lastName: "Doe",
    role: "Admin",
    email: "johndoe@example.com",
    profilePic: "/example-pic.png", 
  };

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
      <button className="logout-button">
        Log Out
      </button>
    </div>
  );
};

export default Profile;
