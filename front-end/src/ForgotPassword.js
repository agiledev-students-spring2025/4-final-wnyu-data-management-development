import React, { useState } from "react";
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setMessage("A password reset link has been sent to your email.");
    } else {
      setMessage("Please enter a valid email.");
    }
  };

  return (
    <div className="forgot-password-container">
      {/* Header */}

      {/* Forgot Password Label */}
      <h2 className="forgot-password-title">Forgot Password</h2>

      <form className="forgot-password-box" onSubmit={handleSubmit}>
        {/* Email */}
        <label className="input-label">Email</label>
        <input
          type="email"
          className="input-field"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Send email button */}
        <button type="submit" className="send-email-button">
          Send Reset Link
        </button>

        {/* Display message */}
        {message && <p className="success-message">{message}</p>}
      </form>
    </div>
  );
};

export default ForgotPassword;
