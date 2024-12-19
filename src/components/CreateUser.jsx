import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Home, Users, Briefcase, Shield, BarChart, Settings, LogOut, Tag } from 'react-feather';
import { Link, useLocation } from 'react-router-dom';

const CreateUser = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: '',
  });
  const [validated, setValidated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const roles = [
    { id: 'admin', name: 'Admin' },
    { id: 'user', name: 'User' },
    { id: 'moderator', name: 'Moderator' },
  ];

  const menuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: <Home className="me-2" /> },
    { path: '/admin/user', label: 'Manage Users', icon: <Users className="me-2" /> },
    { path: '/add-list', label: 'Manage Job Listings', icon: <Briefcase className="me-2" /> },
    { path: '/admin/job-category', label: 'Job Category', icon: <Tag className="me-2" /> },
    { path: '/admin/roles', label: 'Manage Roles', icon: <Shield className="me-2" /> },
    { path: '/admin/reports', label: 'Reports', icon: <BarChart className="me-2" /> },
    { path: '/admin/settings', label: 'Settings', icon: <Settings className="me-2" /> },
  ];

  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setMessage('User created successfully!');
      setIsSubmitting(false);
      setFormData({ email: '', password: '', name: '', role: '' });
      setValidated(false);
    }, 2000);
  };

  const location = useLocation();

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <nav
        className={`bg-dark text-white p-3 ${isSidebarCollapsed ? 'w-50' : 'w-100'} vh-100`}
        style={{
          position: 'fixed',
          top: '0',
          bottom: '0',
          transition: 'width 0.3s ease',
          overflowY: 'auto',
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="mb-0">Admin Panel</h4>
          <button
            className="btn btn-light d-lg-none"
            onClick={toggleSidebar}
            aria-label="Toggle Sidebar"
          >
            {isSidebarCollapsed ? 'Expand' : 'Collapse'}
          </button>
        </div>
        <ul className="nav flex-column">
          {menuItems.map((item) => (
            <li key={item.path} className="nav-item mb-2">
              <Link
                to={item.path}
                className={`nav-link d-flex align-items-center text-white ${location.pathname === item.path ? 'active bg-primary' : ''}`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-auto">
          <Link to="/logout" className="nav-link text-danger">
            <LogOut size={20} />
            <span className="ms-2">Logout</span>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container py-5 ms-lg-320" style={{ flex: 1 }}>
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8">
            <div className="card shadow-sm border-0 rounded-lg">
              <div className="card-header bg-light text-dark text-center py-4">
                <h3 className="mb-0">Create New User</h3>
              </div>
              <div className="card-body p-5">
                <form noValidate validated={validated} onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="email" className="form-label fw-bold">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="form-control border-secondary rounded-2"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="you@example.com"
                    />
                    <div className="invalid-feedback">
                      Please provide a valid email address.
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="password" className="form-label fw-bold">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control border-secondary rounded-2"
                      id="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      minLength={6}
                      placeholder="••••••••"
                    />
                    <div className="invalid-feedback">
                      Password is required and must be at least 6 characters.
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="name" className="form-label fw-bold">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="form-control border-secondary rounded-2"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                    />
                    <div className="invalid-feedback">
                      Full name is required.
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="role" className="form-label fw-bold">
                      User Role
                    </label>
                    <select
                      className="form-select border-secondary rounded-2"
                      id="role"
                      value={formData.role}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Role</option>
                      {roles.map((roleOption) => (
                        <option key={roleOption.id} value={roleOption.id}>
                          {roleOption.name}
                        </option>
                      ))}
                    </select>
                    <div className="invalid-feedback">Please select a role.</div>
                  </div>

                  <div className="d-grid mt-4">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg rounded-pill fw-bold"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Creating...
                        </>
                      ) : (
                        'Create User'
                      )}
                    </button>
                  </div>
                </form>

                {message && (
                  <div
                    className={`alert ${message.includes('successfully') ? 'alert-success' : 'alert-danger'} mt-3`}
                  >
                    {message}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
