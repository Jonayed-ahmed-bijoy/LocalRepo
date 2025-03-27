import React from "react";
import "./App.css";

const App = () => {
  return (
    <div className="container">
      <div className="login-box">
        <h2>Login</h2>
        <input type="email" placeholder="Email" className="input-field" />
        <input type="password" placeholder="Password" className="input-field" />
        <a href="#" className="forgot-password">Forgot password?</a>
        <button className="login-btn">LOGIN</button>
        <div className="or">or</div>
        <button className="google-btn">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" alt="Google Logo" />
          Login with Google
        </button>
        <p>Don’t have an account? <a href="#">Sign up</a></p>
      </div>
    </div>
  );
};

export default App;