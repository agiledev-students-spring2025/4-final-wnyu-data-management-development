import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {
    // Add keyboard event handler for ESC key
    useEffect(() => {
      const handleEsc = (event) => {
        if (event.key === 'Escape' && isOpen) {
          toggleSidebar();
        }
      };
      
      if (isOpen) {
        document.addEventListener('keydown', handleEsc);
      }
      
      return () => {
        document.removeEventListener('keydown', handleEsc);
      };
    }, [isOpen, toggleSidebar]);

    return (
      <div 
        className={`sidebar ${isOpen ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <button 
          className="close-btn" 
          onClick={toggleSidebar}
          aria-label="Close navigation menu"
        >×</button>

        <nav className="sidebar-nav" aria-label="Main navigation">
          <Link 
            to="/" 
            className="sidebar-link"
            onClick={toggleSidebar}
          >
            Home
          </Link>
          <Link 
            to="/Collection" 
            className="sidebar-link"
            onClick={toggleSidebar}
          >
            View our Collection
          </Link>
          <Link 
            to="/Contacts" 
            className="sidebar-link"
            onClick={toggleSidebar}
          >
            View Contacts
          </Link>
        </nav>

      </div>
    );
  };

export default Sidebar;