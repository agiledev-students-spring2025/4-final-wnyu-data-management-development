import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

const NAVIGATION_ITEMS = [
  { path: '/', label: 'Home' },
  { path: '/Collection', label: 'View our Collection' },
  { path: '/Contacts', label: 'View Contacts' }
];

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const firstFocusableRef = useRef(null);
    const lastFocusableRef = useRef(null);
    const previousFocusRef = useRef(null);
    const location = useLocation();
    
    // Store the element that had focus before opening
    useEffect(() => {
      if (isOpen) {
        previousFocusRef.current = document.activeElement;
        if (firstFocusableRef.current) {
          firstFocusableRef.current.focus();
        }
      } else if (previousFocusRef.current) {
        // Return focus when sidebar closes
        previousFocusRef.current.focus();
      }
    }, [isOpen]);
    
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
      <>
        {isOpen && (
          <div 
            className="sidebar-overlay"
            onClick={toggleSidebar}
            aria-hidden="true"
          />
        )}
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
            ref={firstFocusableRef}
          >×</button>

          <nav className="sidebar-nav" aria-label="Main navigation">
            {NAVIGATION_ITEMS.map((item, index) => (
              <Link 
                key={item.path}
                to={item.path} 
                className={`sidebar-link ${location.pathname === item.path ? 'active' : ''}`}
                onClick={toggleSidebar}
                ref={index === NAVIGATION_ITEMS.length - 1 ? lastFocusableRef : null}
              >
                {item.label}
              </Link>
            ))}
          </nav>

        </div>
      </>
    );
  };

export default Sidebar;