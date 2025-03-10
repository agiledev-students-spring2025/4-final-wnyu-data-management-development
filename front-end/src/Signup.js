import React, { useState } from 'react'

const Signup = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
    } else {
      setError("");
      alert("Account created successfully!"); // Replace with actual sign-up logic
    }
  };
    
  return (
    <div className="signup-container">
        {/** Header */}
        {/** Logo */}
        <img src="/wnyu_logo2.png" alt="logo" className="logo"/>

        <form className="signup-box" onSubmit={handleSubmit}>
            <h3>Sign Up</h3>

            {/** Username */}
            <label className="input-label">Username</label>
            <input type="text" className="input-field" placeholder=""/>

            {/** Email */}
            <label className="input-label">Email</label>
            <input type="email" className="input-field" placeholder=""/>

            {/** Password */}
            <label className="input-label">Password</label>
            <input
            type="password"
            className="input-field"
            placeholder=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />

            {/** Confirm Password */}
            <label className="input-label">Confirm Password</label>
            <input
            type="password"
            className="input-field"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            />

            {/* Error Message */}
            {error && <p className="error-message">{error}</p>}

            {/* Sign Up Button */}
            <button type="submit" className="signup-button">
            Sign Up
            </button>

            {/* Already have an account? */}
            <div className="login-text">
            Already have an account? Login
            </div>
        </form>
    </div>
  )
}
export default Signup