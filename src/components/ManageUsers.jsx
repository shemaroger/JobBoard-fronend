import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  LogOut,
  Home,
  Users,
  Briefcase,
  Shield,
  BarChart,
  Settings,
  Search,
  Edit2,
  Trash2,
  Plus,
  Tag,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";  // Ensure axios is imported

const ManageUsers = () => {
  const [users, setUsers] = useState([]);  // Ensure users is initialized as an array
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize] = useState(5);  // Adjusting the page size to 5 records per page
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  const menuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: <Home className="me-2" /> },
    { path: '/admin/user', label: 'Manage Users', icon: <Users className="me-2" /> },
    
    { path: '/admin/job-category', label: 'Job Category', icon: <Tag className="me-2" /> },
    { path: '/admin/roles', label: 'Manage Roles', icon: <Shield className="me-2" /> },
    { path: '/admin/reports', label: 'Reports', icon: <BarChart className="me-2" /> },
    { path: '/admin/settings', label: 'Settings', icon: <Settings className="me-2" /> },
  ];

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const fetchUsers = async (page) => {
    try {
      const response = await fetch(`http://localhost:8080/api/users/allUsers?page=${page}&size=${pageSize}`);
      const data = await response.json();
      setUsers(data.content || []);  // Ensure users is always set to an array
      setTotalPages(data.totalPages || 0);
    } catch (err) {
      setError("Error fetching users. Please try again later.");
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await fetch(`http://localhost:8080/api/users/${id}`, {
        method: "DELETE",
      });
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (err) {
      setError("Error deleting user. Please try again.");
    }
  };

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (!query) {
      fetchUsers(currentPage);  // Reset if query is empty
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8080/api/users/search?keyword=${query}`);
      setUsers(response.data || []);  // Update users with search results
      setTotalPages(1);  // Set total pages to 1 since search results are not paginated
    } catch (err) {
      setError("Failed to fetch search results.");
    }
  };

  return (
    <div className="d-flex vh-100">
      {/* Sidebar */}
      <nav className="bg-dark text-white p-3 flex-shrink-0" style={{ width: "320px", position: "fixed", height: "100%", top: "0" }}>
        <h4 className="mb-4">Admin Panel</h4>
        <ul className="nav flex-column">
          {menuItems.map((item) => (
            <li key={item.path} className="nav-item mb-2">
              <Link
                to={item.path}
                className={`nav-link d-flex align-items-center text-white ${location.pathname === item.path ? "active bg-primary" : ""}`}
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
      <div className="flex-grow-1 p-4" style={{ marginLeft: "320px", height: "100%", overflowY: "auto" }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Manage Users</h2>
          <Link to="/admin/user/create" className="btn btn-primary">
            <Plus size={20} className="me-2" /> Add New User
          </Link>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="input-group mb-3">
          <span className="input-group-text">
            <Search size={20} />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search users..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Name</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>{user.name}</td>
                  <td>
                    <span className="badge bg-info text-dark">
                      {user.role?.name || "N/A"}
                    </span>
                  </td>
                  <td>
                    <Link to={`/admin/user/edit/${user.id}`} className="btn btn-sm btn-warning me-2">
                      <Edit2 size={18} />
                    </Link>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="btn btn-sm btn-danger"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="d-flex justify-content-between align-items-center">
          <button
            className="btn btn-outline-secondary"
            disabled={currentPage === 0}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>
          <span>
            Page {currentPage + 1} of {totalPages}
          </span>
          <button
            className="btn btn-outline-secondary"
            disabled={currentPage === totalPages - 1}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
