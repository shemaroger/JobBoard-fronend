import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [user, setUser] = useState({
    email: '',
    password: '',
    name: '',
    role: '',
  });

  const [roles, setRoles] = useState([]);  // State to hold available roles

  useEffect(() => {
    // Fetch available roles from the backend
    axios.get('http://localhost:8080/api/roles/all')
      .then(response => {
        setRoles(response.data);  // Set the roles data to state
      })
      .catch(error => {
        console.error('There was an error fetching the roles!', error);
      });
  }, []);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8080/api/users/${id}`)
        .then((response) => {
          setUser(response.data);  // Set the user data from API
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
    axios
      .put(`http://localhost:8080/api/users/update/${id}`, user)
      .then((response) => {
        alert('User updated successfully');
        navigate('/admin/user');
      })
      .catch((error) => {
        console.error('Error updating user:', error);
        alert('Error updating user. Please try again.');
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
            {roles.map((role) => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>
        <button type="submit">Update User</button>
      </form>
    </div>
  );
}

export default EditUser;
