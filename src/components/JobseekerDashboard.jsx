import React from 'react';
import { Link } from 'react-router-dom';

function JobseekerDashboard() {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <div
        style={{
          width: '250px',
          background: '#007bff',
          color: '#fff',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <h2>Jobseeker Dashboard</h2>
        <nav>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li>
              <Link to="/jobs" style={linkStyle}>
                Browse Jobs
              </Link>
            </li>
            <li>
              <Link to="/applications" style={linkStyle}>
                My Applications
              </Link>
            </li>
            <li>
              <Link to="/profile" style={linkStyle}>
                Update Profile
              </Link>
            </li>
            <li>
              <Link to="/saved-jobs" style={linkStyle}>
                Saved Jobs
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, background: '#f8f9fa', padding: '20px' }}>
        <h1>Welcome, [Jobseeker Name]</h1>
        <p>Here’s a summary of your activity:</p>

        <div style={dashboardGrid}>
          {/* Example Cards */}
          <div style={cardStyle}>
            <h3>Recommended Jobs</h3>
            <p>5 new jobs matching your profile</p>
            <Link to="/jobs" style={{ textDecoration: 'none', color: '#007bff' }}>
              View Jobs →
            </Link>
          </div>
          <div style={cardStyle}>
            <h3>My Applications</h3>
            <p>3 applications in progress</p>
            <Link to="/applications" style={{ textDecoration: 'none', color: '#007bff' }}>
              Track Applications →
            </Link>
          </div>
          <div style={cardStyle}>
            <h3>Saved Jobs</h3>
            <p>2 jobs saved for later</p>
            <Link to="/saved-jobs" style={{ textDecoration: 'none', color: '#007bff' }}>
              View Saved Jobs →
            </Link>
          </div>
        </div>
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

const dashboardGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gap: '20px',
  marginTop: '20px',
};

const cardStyle = {
  background: '#fff',
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '20px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
};

export default JobseekerDashboard;
