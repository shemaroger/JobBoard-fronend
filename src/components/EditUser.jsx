import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
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

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState({
    email: '',
    password: '',
    name: '',
    role: '',
  });
  const [roles, setRoles] = useState([]);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const menuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: <Home className="me-2" /> },
    { path: '/admin/user', label: 'Manage Users', icon: <Users className="me-2" /> },
   
    { path: '/admin/roles', label: 'Manage Roles', icon: <Shield className="me-2" /> },
    { path: '/admin/reports', label: 'Reports', icon: <BarChart className="me-2" /> },
    { path: '/admin/settings', label: 'Settings', icon: <Settings className="me-2" /> },
  ];

  useEffect(() => {
    // Fetch available roles from the backend
    axios
      .get('http://localhost:8080/api/roles/all')
      .then((response) => {
        setRoles(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the roles!', error);
      });
  }, []);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8080/api/users/${id}`)
        .then((response) => {
          const { email, password, name, role } = response.data;
          setUser({
            email,
            password,
            name,
            role: role.id,
          });
        })
        .catch((error) => {
          console.error('Error fetching user:', error);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email: user.email,
      password: user.password,
      name: user.name,
      role: { id: user.role },
    };

    axios
      .put(`http://localhost:8080/api/users/update/${id}`, userData)
      .then(() => {
        alert('User updated successfully');
        navigate('/admin/user');
      })
      .catch((error) => {
        console.error('Error updating user:', error);
        if (error.response) {
          alert(
            `Error updating user: ${error.response.data.message || 'Please try again.'}`
          );
        } else {
          alert('Error updating user. No response from backend.');
        }
      });
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="admin-dashboard d-flex">
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
      <div className="main-content container-fluid ms-auto">
        <h2 className="text-center">Edit User</h2>
        <div className="d-flex justify-content-center">
          <form onSubmit={handleSubmit} className="mt-4 col-md-6 mx-auto">
            <div className="mb-3">
              <label>Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={user.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={user.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label>Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={user.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label>Role</label>
              <select
                name="role"
                className="form-select"
                value={user.role}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select Role
                </option>
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Update User
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditUser;
