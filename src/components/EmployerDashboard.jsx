import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlus, FaClipboardList, FaChartLine, FaUsers } from 'react-icons/fa';

function EmployerDashboard() {
  const navigate = useNavigate();

  // Redirect to '/add-list' by default
  useEffect(() => {
    navigate('/add-list');
  }, [navigate]);

  return (
    <div className="d-flex" style={{ height: '100vh' }}>
      {/* Sidebar */}
      <div className="bg-dark text-white p-4" style={{ width: '250px' }}>
        <h2 className="mb-4">Employer Dashboard</h2>
        <nav>
          <ul className="list-unstyled">
            <li className="mb-3">
              <Link to="/add-list" className="text-white d-flex align-items-center">
                <FaPlus className="mr-2" /> Post a Job
              </Link>
            </li>
            <li className="mb-3">
              <Link to="/job/add" className="text-white d-flex align-items-center">
                <FaClipboardList className="mr-2" /> Manage Job Posts
              </Link>
            </li>
            <li className="mb-3">
              <Link to="/view-applications" className="text-white d-flex align-items-center">
                <FaUsers className="mr-2" /> View Applications
              </Link>
            </li>
            <li className="mb-3">
              <Link to="/analytics" className="text-white d-flex align-items-center">
                <FaChartLine className="mr-2" /> Job Analytics
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-fill bg-light p-4">
        <h1>Welcome, [Employer Name]</h1>
        <p>Here’s an overview of your activity:</p>

        <div className="row row-cols-1 row-cols-md-3 g-4 mt-4">
          {/* Summary Cards */}
          <div className="col">
            <div className="card shadow-sm h-100">
              <div className="card-body text-center">
                <h5 className="card-title">Active Job Posts</h5>
                <p className="card-text">10 job postings are live</p>
                <Link to="/job/lists" className="btn btn-primary">
                  Manage Jobs →
                </Link>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card shadow-sm h-100">
              <div className="card-body text-center">
                <h5 className="card-title">Applications Received</h5>
                <p className="card-text">45 applications pending review</p>
                <Link to="/view-applications" className="btn btn-primary">
                  View Applications →
                </Link>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card shadow-sm h-100">
              <div className="card-body text-center">
                <h5 className="card-title">Job Analytics</h5>
                <p className="card-text">Track performance of job postings</p>
                <Link to="/analytics" className="btn btn-primary">
                  View Analytics →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployerDashboard;
