import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ResetPassword.css";

const ResetPassword = () => {
  const { email } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}reset-password`,
        {
          //const response = await fetch("http://localhost:8080/reset-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, newPassword }),
        }
      );

      const data = await response.json();
      setMessage(data.message);

      if (response.ok) {
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (error) {
      console.error("Reset failed:", error);
      setMessage("Something went wrong.");
    }
  };

  return (
    <div className="reset-password-container">
      <h2>Reset Password for {email}</h2>
      <form onSubmit={handleReset} className="reset-password-box">
        <label className="input-label">New Password</label>
        <input
          type="password"
          className="input-field"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit" className="reset-password-button">
          Reset
        </button>
        {message && (
          <p
            className={
              message.includes("success") ? "success-message" : "error-message"
            }
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default ResetPassword;
