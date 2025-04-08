// components/TopBar.jsx
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const TopBar = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    setCurrentUser(null);
    navigate('/');
  };

  return (
    <div className="top-bar">
      <div className="user-menu">
        <button className="user-id">
          {currentUser?.email || 'User'}
          <span className="dropdown-icon">▼</span>
        </button>
        <div className="dropdown-content">
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      </div>
      
      <div className="notification-buttons">
        <button className="notification-btn">
          <span className="badge">3</span> 🔔
        </button>
        <button className="reminder-btn">⏰</button>
      </div>
    </div>
  );
};

export default TopBar;