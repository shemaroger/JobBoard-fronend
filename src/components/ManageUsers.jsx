import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // Tracks the current page
  const [totalPages, setTotalPages] = useState(0); // Total number of pages
  const [pageSize, setPageSize] = useState(10); // Number of items per page
  const [error, setError] = useState(null);

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
    // Confirm the delete action with a prompt (optional)
    if (window.confirm('Are you sure you want to delete this user?')) {
      axios
        .delete(`http://localhost:8080/api/users/${id}`)
        .then((response) => {
          if (response.status === 200) {
            // Success: Update the users list by filtering out the deleted user
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
          } else {
            setError('Failed to delete user. Please try again.');
            console.error('Failed to delete user:', response);
          }
        })
        .catch((error) => {
          setError('Error deleting user. Please try again later.');
          console.error('Error deleting user:', error);
        });
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div>
      <h2>Manage Users</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{ marginBottom: '20px' }}>
        <Link to="/admin/user/create">
          <button>Add New User</button>
        </Link>
      </div>
      {users.length > 0 ? (
        <table border="1" style={{ width: '100%', textAlign: 'left' }}>
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
                  <Link to={`/admin/user/edit/${user.id}`}>Edit</Link> |{' '}
                  <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
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
          disabled={currentPage === 0}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        <span style={{ margin: '0 10px' }}>
          Page {currentPage + 1} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages - 1}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ManageUsers;
