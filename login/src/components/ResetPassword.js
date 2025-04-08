// components/ResetPassword.jsx
import { Link } from 'react-router-dom';

const ResetPassword = () => {
  return (
    <div className="auth-container">
      <h2>Reset Password</h2>
      <form className="auth-form">
        <div className="input-group">
          <label>Enter Your Email</label>
          <input type="email" required />
        </div>
        <button type="submit">CONFIRM</button>
        
        <div className="links">
          <Link to="/">Back to Login</Link>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;