import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}login`, {
        //const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store the access token in localStorage
        localStorage.setItem("accessToken", data.accessToken);

        // Store user info (username, role, etc.)
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <label className="input-label">Username</label>
        <input
          type="text"
          className="input-field"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label className="input-label">Password</label>
        <input
          type="password"
          className="input-field"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login-button" onClick={handleLogin}>
          Login
        </button>

        {error && <p className="error">{error}</p>}

        <div
          className="signup-text"
          onClick={() => navigate("/forgot-password")}
          style={{ cursor: "pointer", textDecoration: "underline" }}
        >
          Forgot My Password
        </div>
        <div className="signup-text">Don't have an account?</div>
        <button className="signup-button" onClick={() => navigate("/signup")}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Login;
