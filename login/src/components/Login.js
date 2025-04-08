// components/Login.jsx
import { Link,useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    // Add your actual login logic here
    setCurrentUser({ email: 'mdjonayedahmed@gmail.com'}); // Mock login
    navigate('/library'); // Add this redirect
  };


  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form className="auth-form" onSubmit={handleLogin}>
      
        <div className="input-group">
          <label>Email</label>
          <input type="email" required />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input type="password" required />
        </div>
        <button type="submit">LOGIN</button>
        
        <div className="separator">OR</div>
        
        <button className="google-btn" type="button">
        
          <img src="/assets/google-logo.png" alt="Google" className="google" width="20"  />
          Login with Google
        </button>
        
        <div className="links">
          <Link to="/reset-password">Forgot password?</Link>
          <span>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;