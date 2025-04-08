// components/SignUp.jsx
import { Link } from 'react-router-dom';

const SignUp = () => {
  return (
    <div className="auth-container">
      <h2>Sign up</h2>
      <form className="auth-form">
        <div className="input-group">
          <label>Email</label>
          <input type="email" required />
        </div>
        <div className="input-group">
          <label>Enter Password</label>
          <input type="password" required />
        </div>
        <div className="input-group">
          <label>Confirm Password</label>
          <input type="password" required />
        </div>
        <button type="submit">Create Account</button>
        
        <div className="separator">OR</div>
        
        <button className="google-btn" type="button">
          <img src="/assets/google-logo.png" alt="Google" width="20" />
          Sign up with Google
        </button>
        
        <div className="links">
          <span>
            Already have an account? <Link to="/">Login</Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default SignUp;