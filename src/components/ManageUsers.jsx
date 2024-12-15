import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, LogOut, Home, Users, Briefcase, Shield, BarChart, Settings } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/AdminDashboard.css';

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [error, setError] = useState(null);
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation(); // For active link highlighting

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

  useEffect(() => {
    fetchUsers(currentPage, pageSize);
  }, [currentPage, pageSize]);

  const fetchUsers = (page, size) => {
    axios
      .get(`http://localhost:8080/api/users/allUsers?page=${page}&size=${size}`)
      .then((response) => {
        setUsers(response.data.content || []);
        setTotalPages(response.data.totalPages || 0);
      })
      .catch((error) => {
        setError('Error fetching users. Please try again later.');
        console.error('Error fetching users:', error);
      });
  };

  const handleDeleteUser = (id) => {
    axios
      .delete(`http://localhost:8080/api/users/${id}`)
      .then(() => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      })
      .catch((error) => {
        setError('Error deleting user. Please try again later.');
        console.error('Error deleting user:', error);
      });
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

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
      <main
        className={`main-content ${
          isSidebarCollapsed ? 'expanded' : ''
        } col-md-9 ms-sm-auto col-lg-10 px-md-4`}
      >
        <h2>Manage Users</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {/* Add New User Button */}
        <div style={{ marginBottom: '20px' }}>
          <Link to="/admin/user/create">
            <button className="btn btn-primary">Add New User</button>
          </Link>
        </div>

        {/* Users Table */}
        {users.length > 0 ? (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Name</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>{user.name}</td>
                  <td>{user.role?.name || 'N/A'}</td>
                  <td>
                    <Link to={`/admin/user/edit/${user.id}`} className="btn btn-sm btn-warning">
                      Edit
                    </Link>{' '}
                    |{' '}
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="btn btn-sm btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No users found.</p>
        )}

        {/* Pagination Controls */}
        <div style={{ marginTop: '20px' }}>
          <button
            className="btn btn-outline-primary"
            disabled={currentPage === 0}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>
          <span style={{ margin: '0 10px' }}>
            Page {currentPage + 1} of {totalPages}
          </span>
          <button
            className="btn btn-outline-primary"
            disabled={currentPage === totalPages - 1}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
}

export default ManageUsers;
