import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Home,
  Users,
  Briefcase,
  Shield,
  BarChart,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from 'react-feather';

const CreateUser = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [roles, setRoles] = useState([]);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/roles/all')
      .then((response) => {
        setRoles(response.data);
      })
      .catch(() => {
        setMessage('Unable to fetch roles. Please try again later.');
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    const userData = {
      email,
      password,
      name,
      role: {
        id: role,
      },
    };

    try {
      const response = await axios.post(
        'http://localhost:8080/api/users/add',
        userData
      );
      setMessage(`User created successfully: ${response.data.email}`);

      // Reset form
      setEmail('');
      setPassword('');
      setName('');
      setRole('');
      setValidated(false);
    } catch {
      setMessage('Error creating user. Please check your details and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);

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
    <div className="admin-dashboard d-flex">
      {/* Sidebar */}
      <nav
        className={`sidebar bg-dark ${
          isSidebarCollapsed ? 'collapsed' : ''
        } position-fixed vh-100`}
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
                  className={`nav-link ${
                    location.pathname === item.path ? 'active' : ''
                  }`}
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
      <div className="content flex-grow-1 p-4">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8">
              <div className="card shadow-lg border-0 rounded-lg">
                <div className="card-header bg-primary text-white text-center py-4">
                  <h3 className="mb-0">Create New User</h3>
                </div>
                <div className="card-body p-5">
                  <form noValidate validated={validated} onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email Address
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="you@example.com"
                      />
                      <div className="invalid-feedback">
                        Please provide a valid email address.
                      </div>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                        placeholder="••••••••"
                      />
                      <div className="invalid-feedback">
                        Password is required and must be at least 6 characters.
                      </div>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="John Doe"
                      />
                      <div className="invalid-feedback">
                        Full name is required.
                      </div>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="role" className="form-label">
                        User Role
                      </label>
                      <select
                        className="form-select"
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                      >
                        <option value="">Select Role</option>
                        {roles.map((roleOption) => (
                          <option key={roleOption.id} value={roleOption.id}>
                            {roleOption.name}
                          </option>
                        ))}
                      </select>
                      <div className="invalid-feedback">
                        Please select a role.
                      </div>
                    </div>

                    <div className="d-grid">
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg"
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
                      className={`alert ${
                        message.includes('successfully')
                          ? 'alert-success'
                          : 'alert-danger'
                      } mt-3`}
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
    </div>
  );
};

export default CreateUser;
