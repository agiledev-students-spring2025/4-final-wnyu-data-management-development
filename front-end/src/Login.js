import React from 'react'

const Login = () => {
  return (
    <div className="login-contianer">
        {/** Header */}
         {/** Logo */}
         <img src="/wnyu_logo2.png" alt="logo" className="logo"/>

         <div className="login-box">
            {/** Username */}
            <label className="input-label">Username</label>
            <input type="text" className="input-field" placeholder=""/>

            {/** Password */}
            <label className="input-label">Password</label>
            <input type="password" className="input-field" placeholder=""/>

            {/** Login button */}
            <button className="login-button">Login</button>

            {/** Forgot password */}
            <div className="forgot-password">
                <p>Forgot password?</p>
            </div>

            {/** Don't have an account? */}
            <div className="signup-text">Don't have an account?</div>

            {/** Sign up button */}
            <button className="signup-button">Sign Up</button>
         </div>
    </div>
  )
}

export default Login