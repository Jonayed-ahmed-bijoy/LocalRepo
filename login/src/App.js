// App.js
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ResetPassword from './components/ResetPassword';
import Library from './components/Library';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';


function AppWrapper() {
  const location = useLocation();
  const isAuthPage = ['/', '/signup', '/reset-password'].includes(location.pathname);

  return (
    <div className={`${isAuthPage ? 'auth-page ' + location.pathname.slice(1) : ''}`}>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/library" element={<Library />}>
            <Route path="books" element={<Library />} />
            <Route path="card" element={<Library />} />
            <Route path="rooms" element={<Library />} />
            <Route path="upcoming" element={<Library />} />
            <Route path="account" element={<Library />} />
            <Route path="history" element={<Library />} />
              
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

// App.js
function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/library" element={<Library />}>
              <Route index element={<div>Books content...</div>} />
              <Route path="card" element={<div>Library Card...</div>} />
              <Route path="rooms" element={<div>Rooms...</div>} />
              <Route path="upcoming" element={<div>Upcoming...</div>} />
              <Route path="account" element={<div>Account...</div>} />
              <Route path="history" element={<div>History...</div>} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;