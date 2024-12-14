import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ManageUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/users/allUsers')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const handleDeleteUser = (id) => {
    // API call to delete user
    axios
      .delete(`http://localhost:8080/api/users/${id}`)
      .then((response) => {
        setUsers(users.filter((user) => user.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
      });
  };

  return (
    <div>
      <h2>Manage Users</h2>
      <div style={{ marginBottom: '20px' }}>
        <Link to="/admin/users/create">
          <button>Add New User</button>
        </Link>
      </div>
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
              <td>{user.role?.name}</td>
              <td>
                <Link to={`/admin/users/edit/${user.id}`}>Edit</Link> |{' '}
                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageUsers;
