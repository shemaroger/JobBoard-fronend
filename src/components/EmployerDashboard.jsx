import React from 'react';
import { Link } from 'react-router-dom';

function EmployerDashboard() {
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
        <h2>Employer Dashboard</h2>
        <nav>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li>
              <Link to="/add-list" style={linkStyle}>
                Post a Job
              </Link>
            </li>
            <li>
              <Link to="/job/add" style={linkStyle}>
                Manage Job Posts
              </Link>
            </li>
            <li>
              <Link to="/view-applications" style={linkStyle}>
                View Applications
              </Link>
            </li>
            <li>
              <Link to="/analytics" style={linkStyle}>
                Job Analytics
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, background: '#f8f9fa', padding: '20px' }}>
        <h1>Welcome, [Employer Name]</h1>
        <p>Here’s an overview of your activity:</p>

        <div style={dashboardGrid}>
          {/* Summary Cards */}
          <div style={cardStyle}>
            <h3>Active Job Posts</h3>
            <p>10 job postings are live</p>
            <Link to="/job/lists" style={{ textDecoration: 'none', color: '#007bff' }}>
              Manage Jobs →
            </Link>
          </div>
          <div style={cardStyle}>
            <h3>Applications Received</h3>
            <p>45 applications pending review</p>
            <Link to="/view-applications" style={{ textDecoration: 'none', color: '#007bff' }}>
              View Applications →
            </Link>
          </div>
          <div style={cardStyle}>
            <h3>Job Analytics</h3>
            <p>Track performance of job postings</p>
            <Link to="/analytics" style={{ textDecoration: 'none', color: '#007bff' }}>
              View Analytics →
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

export default EmployerDashboard;
