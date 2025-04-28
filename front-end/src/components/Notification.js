import React, { useState, useEffect } from 'react';
import './Notification.css';

const Notification = ({ message, type = "info", duration = 3000, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return visible ? (
    <div className={`notification ${type}`}>
      <p>{message}</p>
      <button className="close-button" onClick={() => {
        setVisible(false);
        if (onClose) onClose();
      }}>×</button>
    </div>
  ) : null;
};

export default Notification;