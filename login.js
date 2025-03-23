import React, { useState } from "react";
import "./login.css"; // Import the CSS file

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Email: ${email}\nPassword: ${password}`);
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="forgot-password">
          <a href="#">Forgot password?</a>
        </div>

        <button type="submit" className="login-button">Login</button>

        <div className="divider">or</div>

        <button className="google-login">
          <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google" />
          Login with Google
        </button>

        <p className="signup-text">
          Don't have an account? <a href="#">Sign up</a>
        </p>
      </form>
    </div>
  );
};

export default Login;