import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {
    return (
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={toggleSidebar}>×</button>

        <nav className="sidebar-nav">
          <Link 
            to="/" 
            className="rounded-full py-3 px-6 mb-4 text-white font-medium text-center block hover:bg-gray-800 transition-all duration-200"
            onClick={toggleSidebar}
          >
            Home
          </Link>
          <Link 
            to="/Collection" 
            className="rounded-full py-3 px-6 mb-4 text-white font-medium text-center block hover:bg-gray-800 transition-all duration-200"
            onClick={toggleSidebar}
          >
            View our Collection
          </Link>
          <Link 
            to="/Contacts" 
            className="rounded-full py-3 px-6 text-white font-medium text-center block hover:bg-gray-800 transition-all duration-200"
            onClick={toggleSidebar}
          >
            View Contacts
          </Link>
        </nav>

      </div>
    );
  };

export default Sidebar;