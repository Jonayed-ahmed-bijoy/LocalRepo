import React, { useState } from "react";
import "./signup.css"; // Import the CSS file

const Signup = () => {
  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  
    const handleSignup = () => {
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      alert(`Account created for: ${email}`);
    };
  
    return (
      <div className="container">
        <div className="signup-box">
          <h2>Sign up</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button onClick={handleSignup}>Create Account</button>
          <hr />
          <button className="google-btn">
            <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google Logo" />
            Sign up with Google
          </button>
        </div>
      </div>
    );
};

export default Signup;