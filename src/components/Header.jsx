import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Header.css';

function Header() {
  const navigate = useNavigate();

  // Mock function to check if a user is logged in
  const isLoggedIn = !!localStorage.getItem('authToken'); // Example: Check if authToken exists

  // Logout function
  const handleLogout = () => {
    // Clear authentication token (or session data)
    localStorage.removeItem('authToken');

    // Redirect to the login page
    navigate('/login');
  };

  return (
    <header className="header">
      <nav className="navbar">
        <div className="logo">Job Board</div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          {isLoggedIn ? (
            <>
              {/* <li><Link to="/dashboard">Dashboard</Link></li> */}
              <li><button className="logout-button" onClick={handleLogout}>Logout</button></li>
            </>
          ) : (
            <li><Link to="/login">Login</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
