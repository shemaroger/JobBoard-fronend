import React, { useEffect, useState } from 'react';
import axios from 'axios';

function RoleManagement() {
  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState('');
  const [editRoleId, setEditRoleId] = useState(null);
  const [editRoleName, setEditRoleName] = useState('');

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await axios.get('/api/roles/all');
      setRoles(response.data);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  const handleAddRole = async () => {
    try {
      await axios.post('/api/roles/add', { name: newRole });
      setNewRole('');
      fetchRoles();
    } catch (error) {
      console.error('Error adding role:', error);
    }
  };

  const handleEditRole = async (id) => {
    try {
      await axios.put(`/api/roles/${id}`, { name: editRoleName });
      setEditRoleId(null);
      setEditRoleName('');
      fetchRoles();
    } catch (error) {
      console.error('Error editing role:', error);
    }
  };

  const handleDeleteRole = async (id) => {
    try {
      await axios.delete(`/api/roles/${id}`);
      fetchRoles();
    } catch (error) {
      console.error('Error deleting role:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Role Management</h1>

      {/* Add Role Section */}
      <div>
        <h2>Add a New Role</h2>
        <input
          type="text"
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
          placeholder="Enter role name"
        />
        <button onClick={handleAddRole}>Add Role</button>
      </div>

      {/* Roles List */}
      <div style={{ marginTop: '30px' }}>
        <h2>Existing Roles</h2>
        <ul>
          {roles.map((role) => (
            <li key={role.id} style={{ marginBottom: '10px' }}>
              {editRoleId === role.id ? (
                <>
                  <input
                    type="text"
                    value={editRoleName}
                    onChange={(e) => setEditRoleName(e.target.value)}
                    placeholder="Edit role name"
                  />
                  <button onClick={() => handleEditRole(role.id)}>Save</button>
                  <button onClick={() => setEditRoleId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <span>{role.name}</span>
                  <button onClick={() => {
                    setEditRoleId(role.id);
                    setEditRoleName(role.name);
                  }}>Edit</button>
                  <button onClick={() => handleDeleteRole(role.id)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default RoleManagement;
