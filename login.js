import React, { useState } from 'react';
import './LoginForm.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted:', { email, password });
    // Add your authentication logic here
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Login</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="forgot-password">
            <a href="/forgot-password">Forgot password ?</a>
          </div>
          
          <button type="submit" className="login-button">LOGIN</button>
        </form>
        
        <div className="divider">OR</div>
        
        <button className="google-login">
          Login with Google
        </button>
        
        <div className="signup-link">
          Don't have an account ? <a href="/signup">Sign up</a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;