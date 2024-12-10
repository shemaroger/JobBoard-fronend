import React, { useState, useEffect } from "react";
import axios from "../../services/api";
import AddRole from "./AddRole";

const AdminDashboard = () => {
  const [roles, setRoles] = useState([]);
  const [editingRole, setEditingRole] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  // Fetch roles
  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = () => {
    axios
      .get("/api/roles")
      .then((response) => setRoles(response.data))
      .catch((error) => alert("Failed to fetch roles: " + error.message));
  };

  // Delete role
  const handleDelete = (id) => {
    axios
      .delete(`/api/roles/${id}`)
      .then(() => {
        alert("Role deleted successfully!");
        fetchRoles();
      })
      .catch((error) => alert("Error deleting role: " + error.message));
  };

  // Edit role
  const handleEdit = (role) => {
    setEditingRole(role);
    setUpdatedName(role.name);
  };

  // Update role
  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`/api/roles/${editingRole.id}`, { name: updatedName })
      .then(() => {
        alert("Role updated successfully!");
        setEditingRole(null);
        fetchRoles();
      })
      .catch((error) => alert("Error updating role: " + error.message));
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div>
        <h3>Roles</h3>
        <ul>
          {roles.map((role) => (
            <li key={role.id}>
              {role.name}
              <button onClick={() => handleEdit(role)}>Edit</button>
              <button onClick={() => handleDelete(role.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Add New Role</h3>
        <AddRole />
      </div>

      {editingRole && (
        <div>
          <h3>Edit Role</h3>
          <form onSubmit={handleUpdate}>
            <label htmlFor="updatedName">Role Name:</label>
            <input
              type="text"
              id="updatedName"
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
              required
            />
            <button type="submit">Update Role</button>
            <button onClick={() => setEditingRole(null)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
