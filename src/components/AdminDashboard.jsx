import React, { useState } from 'react';
import { Link, useLocation, Navigate, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/AdminDashboard.css';
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
  Tag,
} from 'lucide-react';

function AdminDashboard() {
  const location = useLocation();
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  const menuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: <Home className="me-2" /> },
    { path: '/admin/user', label: 'Manage Users', icon: <Users className="me-2" /> },
    { path: '/admin/jobs', label: 'Manage Job Listings', icon: <Briefcase className="me-2" /> },
    { path: '/admin/job-category', label: 'Job Category', icon: <Tag className="me-2" /> },
    { path: '/admin/roles', label: 'Manage Roles', icon: <Shield className="me-2" /> },
    { path: '/admin/reports', label: 'Reports', icon: <BarChart className="me-2" /> },
    { path: '/admin/settings', label: 'Settings', icon: <Settings className="me-2" /> },
  ];

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <nav className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''} position-fixed vh-100`}>
        <div className="sidebar-header d-flex flex-column align-items-center pt-4">
          <button
            className="btn btn-light btn-sm toggle-sidebar mb-3"
            onClick={toggleSidebar}
            aria-label="Toggle Sidebar"
          >
            {isSidebarCollapsed ? <ChevronRight /> : <ChevronLeft />}
          </button>
          <h2 className="text-white text-center mb-4">
            <span className="logo">Admin</span>
          </h2>
        </div>
        <ul className="nav flex-column w-100">
          {menuItems.map((item) => (
            <li key={item.path} className="nav-item">
              <Link
                to={item.path}
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                {item.icon}
                {!isSidebarCollapsed && <span>{item.label}</span>}
              </Link>
            </li>
          ))}
          <li className="nav-item mt-auto">
            <Link to="/login" className="nav-link text-danger">
              <LogOut className="me-2" />
              {!isSidebarCollapsed && 'Logout'}
            </Link>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className={`main-content ${isSidebarCollapsed ? 'expanded' : ''} col-md-9 ms-sm-auto col-lg-10 px-md-4`}>
        {/* Set default route to /admin/user */}
        <Routes>
          <Route path="/" element={<Navigate to="/admin/user" replace />} />
          {/* Other routes */}
          <Route path="/admin/user" element={<div>Manage Users Content</div>} />
          <Route path="/admin/dashboard" element={<div>Dashboard Content</div>} />
          <Route path="/admin/jobs" element={<div>Manage Jobs Content</div>} />
          <Route path="/admin/job-category" element={<div>Job Category Content</div>} />
          <Route path="/admin/roles" element={<div>Manage Roles Content</div>} />
          <Route path="/admin/reports" element={<div>Reports Content</div>} />
          <Route path="/admin/settings" element={<div>Settings Content</div>} />
        </Routes>
      </main>
    </div>
  );
}

export default AdminDashboard;
