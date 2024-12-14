import React from 'react';
import { Link } from 'react-router-dom';

function AdminDashboard() {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <div
        style={{
          width: '250px',
          background: '#343a40',
          color: '#fff',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <h2>Admin Dashboard</h2>
        <nav>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li>
              <Link to="/admin/user" style={linkStyle}>
                Manage Users
              </Link>
            </li>
            <li>
              <Link to="/admin/jobs" style={linkStyle}>
                Manage Job Listings
              </Link>
            </li>
            <li>
              <Link to="/admin/roles" style={linkStyle}>
                Manage Roles
              </Link>
            </li>
            <li>
              <Link to="/admin/reports" style={linkStyle}>
                Reports
              </Link>
            </li>
            <li>
              <Link to="/admin/settings" style={linkStyle}>
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, background: '#f8f9fa', padding: '20px' }}>
        <h1>Welcome to the Admin Dashboard</h1>
        <p>Select an option from the menu to get started.</p>
      </div>
    </div>
  );
}

const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
  display: 'block',
  padding: '10px 0',
};

export default AdminDashboard;
