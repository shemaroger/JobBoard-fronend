import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';  // Replaced useHistory with useNavigate

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();  // Replacing useHistory with useNavigate
  const [user, setUser] = useState({
    email: '',
    password: '',
    name: '',
    role: '',
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/users/${id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user:', error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8080/api/users/${id}`, user)
      .then((response) => {
        alert('User updated successfully');
        navigate('/admin/users');  // Using navigate to redirect after the update
      })
      .catch((error) => {
        console.error('Error updating user:', error);
      });
  };

  return (
    <div>
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Role</label>
          <select name="role" value={user.role} onChange={handleChange}>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
            {/* Add other roles here */}
          </select>
        </div>
        <button type="submit">Update User</button>
      </form>
    </div>
  );
}

export default EditUser;
