import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { 
  Users, 
  Briefcase, 
  Shield, 
  BarChart, 
  Settings, 
  Home, 
  LogOut 
} from 'lucide-react';

function AdminDashboard() {
  const location = useLocation();

  const menuItems = [
    { 
      path: "/admin/dashboard", 
      label: "Dashboard", 
      icon: <Home className="me-2" /> 
    },
    { 
      path: "/admin/user", 
      label: "Manage Users", 
      icon: <Users className="me-2" /> 
    },
    { 
      path: "/admin/jobs", 
      label: "Manage Job Listings", 
      icon: <Briefcase className="me-2" /> 
    },
    { 
      path: "/admin/roles", 
      label: "Manage Roles", 
      icon: <Shield className="me-2" /> 
    },
    { 
      path: "/admin/reports", 
      label: "Reports", 
      icon: <BarChart className="me-2" /> 
    },
    { 
      path: "/admin/settings", 
      label: "Settings", 
      icon: <Settings className="me-2" /> 
    }
  ];

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <nav className="col-md-3 col-lg-2 d-md-block bg-dark sidebar">
          <div className="position-sticky pt-3">
            <div className="text-center mb-4">
              <h2 className="text-white">Admin Panel</h2>
            </div>
            <ul className="nav flex-column">
              {menuItems.map((item) => (
                <li key={item.path} className="nav-item">
                  <Link 
                    to={item.path} 
                    className={`nav-link ${location.pathname === item.path ? 'active' : 'text-white'}`}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="nav-item mt-auto">
                <Link to="/logout" className="nav-link text-danger">
                  <LogOut className="me-2" />
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* Main Content */}
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">Dashboard Overview</h1>
            <div className="btn-toolbar mb-2 mb-md-0">
              <div className="btn-group me-2">
                <button type="button" className="btn btn-sm btn-outline-secondary">
                  Export
                </button>
              </div>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="row">
            <div className="col-md-4">
              <div className="card text-center mb-4">
                <div className="card-body">
                  <Users className="mb-3 text-primary" size={48} />
                  <h5 className="card-title">Total Users</h5>
                  <p className="card-text display-6">1,234</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-center mb-4">
                <div className="card-body">
                  <Briefcase className="mb-3 text-success" size={48} />
                  <h5 className="card-title">Active Job Listings</h5>
                  <p className="card-text display-6">56</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-center mb-4">
                <div className="card-body">
                  <BarChart className="mb-3 text-warning" size={48} />
                  <h5 className="card-title">Total Reports</h5>
                  <p className="card-text display-6">42</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;