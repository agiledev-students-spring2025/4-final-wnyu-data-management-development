import React, { useState } from 'react';
import './Signup.css';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('Staff');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            const response = await fetch('http://localhost:8080/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password, email, role })
            });

            const data = await response.json();
            
            if (response.ok) {
                // Store the access token locally
                localStorage.setItem('accessToken', data.accessToken);

                // Store the user's role or info
                localStorage.setItem('userRole', role);
                
                navigate('/login'); // Redirect to login page after successful signup
            } else {
                setError(data.message); // Display error if the signup fails
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-box">
                <h2>Sign Up</h2>

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

                <label className="input-label">Email</label>
                <input 
                    type="email" 
                    className="input-field" 
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label className="input-label">Role</label>
                <select className="input-field" value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="Staff">Staff</option>
                    <option value="Admin">Admin</option>
                </select>
                
                <button className="signup-button" onClick={handleSignup}>Sign Up</button>

                {error && <p className="error-message">{error}</p>}

                <div className="login-text">Already have an account?</div>
                <button className="login-button" onClick={() => navigate('/login')}>Login</button>
            </div>
        </div>
    );
};

export default Signup;
