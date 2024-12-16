import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/AdminDashboard.css'; // Include a custom CSS file for additional styling
import {
  Users,
  Briefcase,
  Shield,
  BarChart,
  Settings,
  Home,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Tag, // Import the Tag icon for Job Category
} from 'lucide-react';

function AdminDashboard() {
  const location = useLocation();
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  const menuItems = [
    {
      path: '/admin/dashboard',
      label: 'Dashboard',
      icon: <Home className="me-2" />,
    },
    {
      path: '/admin/user',
      label: 'Manage Users',
      icon: <Users className="me-2" />,
    },
    {
      path: '/admin/jobs',
      label: 'Manage Job Listings',
      icon: <Briefcase className="me-2" />,
    },
    {
      path: '/admin/job-category', // Added new path for Job Category
      label: 'Job Category',
      icon: <Tag className="me-2" />, // Icon for Job Category
    },
    {
      path: '/admin/roles',
      label: 'Manage Roles',
      icon: <Shield className="me-2" />,
    },
    {
      path: '/admin/reports',
      label: 'Reports',
      icon: <BarChart className="me-2" />,
    },
    {
      path: '/admin/settings',
      label: 'Settings',
      icon: <Settings className="me-2" />,
    },
  ];

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <nav
        className={`sidebar bg-dark ${isSidebarCollapsed ? 'collapsed' : ''} position-fixed vh-100`}
      >
        <div className="d-flex flex-column align-items-center pt-3">
          <button
            className="btn btn-light btn-sm toggle-sidebar mb-3"
            onClick={toggleSidebar}
          >
            {isSidebarCollapsed ? <ChevronRight /> : <ChevronLeft />}
          </button>
          <h2 className="text-white text-center mb-4">
            <span className="logo">Admin</span>
          </h2>
          <ul className="nav flex-column w-100">
            {menuItems.map((item) => (
              <li key={item.path} className="nav-item">
                <Link
                  to={item.path}
                  className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                >
                  {item.icon}
                  {!isSidebarCollapsed && item.label}
                </Link>
              </li>
            ))}
            <li className="nav-item mt-auto">
              <Link to="/logout" className="nav-link text-danger">
                <LogOut className="me-2" />
                {!isSidebarCollapsed && 'Logout'}
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <main
        className={`main-content ${isSidebarCollapsed ? 'expanded' : ''} col-md-9 ms-sm-auto col-lg-10 px-md-4`}
      >
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">Dashboard Overview</h1>
          <div className="btn-toolbar mb-2 mb-md-0">
            <div className="btn-group me-2">
              <button type="button" className="btn btn-sm btn-outline-primary">
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard Quick Stats */}
        <div className="row g-4">
          {[{ icon: <Users size={48} className="text-primary mb-3" />, title: 'Total Users', value: '1,234' },
            { icon: <Briefcase size={48} className="text-success mb-3" />, title: 'Active Job Listings', value: '56' },
            { icon: <BarChart size={48} className="text-warning mb-3" />, title: 'Total Reports', value: '42' },
          ].map((stat, index) => (
            <div className="col-md-4" key={index}>
              <div className="card text-center shadow-sm">
                <div className="card-body">
                  {stat.icon}
                  <h5 className="card-title">{stat.title}</h5>
                  <p className="card-text display-6">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="row g-4 mt-4">
          <div className="col-md-8">
            <div className="card shadow-sm">
              <div className="card-header">User Growth</div>
              <div className="card-body">
                <div className="progress" style={{ height: '20px' }}>
                  <div
                    className="progress-bar bg-gradient-primary"
                    role="progressbar"
                    style={{ width: '65%' }}
                  >
                    65%
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-header">Job Listings by Department</div>
              <div className="card-body">
                {[{ name: 'Tech', count: 44, color: 'primary' },
                  { name: 'Finance', count: 32, color: 'success' },
                  { name: 'Marketing', count: 22, color: 'info' },
                  { name: 'Sales', count: 15, color: 'warning' },
                ].map((dept, index) => (
                  <div
                    className="d-flex justify-content-between align-items-center mb-2"
                    key={index}
                  >
                    <span>{dept.name}</span>
                    <span className={`badge bg-${dept.color}`}>{dept.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
