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

            {/** username */}
            <label className="input-label">Username</label>
            <input type="text" className="input-field" placeholder=""/>

            {/** email */}
            <label className="input-label">Email</label>
            <input type="email" className="input-field" placeholder=""/>

            {/** password */}
            <label className="input-label">Password</label>
            <input
            type="password"
            className="input-field"
            placeholder=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />

            {/** confirm password */}
            <label className="input-label">Confirm Password</label>
            <input
            type="password"
            className="input-field"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            />

            {/* error Message */}
            {error && <p className="error-message">{error}</p>}

            {/* sign Up Button */}
            <button type="submit" className="signup-button">
            Sign Up
            </button>

            {/* already have an account? */}
            <div className="login-text">
            Already have an account? Login
            </div>
        </form>
    </div>
  )
}
export default Signup