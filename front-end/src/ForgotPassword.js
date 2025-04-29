import React, { useState } from "react";
import './ForgotPassword.css';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}resend-reset-link`, {
        //const response = await fetch('http://localhost:8080/resend-reset-link', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });
  
        const data = await response.json();
        setMessage(data.message);
  
        if (response.ok) {
          setTimeout(() => {
            navigate('/login');
          }, 2000);
        }
      } catch (error) {
        console.error('Error sending reset link:', error);
        setMessage('Something went wrong. Please try again later.');
      }
    };

  return (
    <div className="forgot-password-container">
      <h2 className="forgot-password-title">Forgot Password</h2>

      <form className="forgot-password-box" onSubmit={handleSubmit}>
        <label className="input-label">Email</label>
        <input
          type="email"
          className="input-field"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit" className="send-email-button">
          Send Reset Link
        </button>

        {message && <p className="success-message">{message}</p>}
      </form>
    </div>
  );
};

export default ForgotPassword;
