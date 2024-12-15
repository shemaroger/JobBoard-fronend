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
    role: '', // This will store the role ID
  });

  const [roles, setRoles] = useState([]); // State to hold available roles

  useEffect(() => {
    // Fetch available roles from the backend
    axios
      .get('http://localhost:8080/api/roles/all')
      .then((response) => {
        setRoles(response.data); // Set the roles data to state
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
            role: role.id, // Set the role ID from the fetched user data
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

    // Prepare user data for submission, ensuring role is sent as an object
    const userData = {
      email: user.email,
      password: user.password,
      name: user.name,
      role: {
        id: user.role, // Send role as an object with ID
      },
    };

    axios
      .put(`http://localhost:8080/api/users/update/${id}`, userData)
      .then((response) => {
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
          <select name="role" value={user.role} onChange={handleChange} required>
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
        <button type="submit">Update User</button>
      </form>
    </div>
  );
}

export default EditUser;
