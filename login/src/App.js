import React from "react";
import "./App.css";



const App = () => {
  return (
    <div className="container">
      <div className="login-box">
        <h2>Login</h2>
        <form>
          <label>Email</label>
          <input type="email" placeholder="Enter your email" required />
          <label>Password</label>
          <input type="password" placeholder="Enter your password" required />
          <div className="forgot-password">
            <a href="#">Forgot password?</a>
          </div>
          <button type="submit" className="login-btn">LOGIN</button>
        </form>
        <div className="or-divider">or</div>
        <button className="google-login">
          <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google Logo" />
          Login with Google
        </button>
        <p className="signup-link">
          Don't have an account? <a href="#">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default App;