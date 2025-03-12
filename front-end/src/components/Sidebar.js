import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {
    return (
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={toggleSidebar}>×</button>
        <nav className="sidebar-nav">
          <Link to="/" onClick={toggleSidebar}>Home</Link>
          <Link to="/Collection" onClick={toggleSidebar}>View our Collection</Link>
          <Link to="/Contacts" onClick={toggleSidebar}>View Contacts</Link>
        </nav>
      </div>
    );
  };

export default Sidebar;