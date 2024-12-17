import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Edit2, Trash2 } from 'lucide-react';
import 'react-toastify/dist/ReactToastify.css';

function RoleManagement() {
  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState('');
  const [editRoleId, setEditRoleId] = useState(null);
  const [editRoleName, setEditRoleName] = useState('');

  const fetchRoles = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/roles/all');
      setRoles(response.data);
    } catch (error) {
      console.error('Error fetching roles:', error);
      showToast('Error fetching roles', 'error');
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleAddRole = async () => {
    try {
      await axios.post('http://localhost:8080/api/roles/add', { name: newRole });
      setNewRole('');
      fetchRoles();
      showToast('Role added successfully', 'success');
    } catch (error) {
      console.error('Error adding role:', error);
      showToast('Error adding role', 'error');
    }
  };

  const handleEditRole = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/roles/${id}`, { name: editRoleName });
      setEditRoleId(null);
      setEditRoleName('');
      fetchRoles();
      showToast('Role updated successfully', 'success');
    } catch (error) {
      console.error('Error editing role:', error);
      showToast('Error updating role', 'error');
    }
  };

  const handleDeleteRole = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/roles/${id}`);
      fetchRoles();
      showToast('Role deleted successfully', 'success');
    } catch (error) {
      console.error('Error deleting role:', error);
      showToast('Error deleting role', 'error');
    }
  };

  const showToast = (message, type) => {
    if (type === 'success') {
      toast.success(message, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error(message, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="container my-5">
      <ToastContainer />
      <h1 className="text-center mb-4">Role Management</h1>
      <div className="card">
        <div className="card-body">
          <h2 className="card-title mb-4">Add a New Role</h2>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              placeholder="Enter role name"
              aria-label="New Role"
              aria-describedby="button-addon2"
            />
            <button
              className="btn btn-primary"
              type="button"
              id="button-addon2"
              onClick={handleAddRole}
            >
              Add Role
            </button>
          </div>
        </div>
      </div>
      <div className="card mt-4">
        <div className="card-body">
          <h2 className="card-title mb-4">Existing Roles</h2>
          <ul className="list-group">
            {roles.map((role) => (
              <li
                key={role.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {editRoleId === role.id ? (
                  <>
                    <input
                      type="text"
                      className="form-control"
                      value={editRoleName}
                      onChange={(e) => setEditRoleName(e.target.value)}
                      placeholder="Edit role name"
                    />
                    <div>
                      <button
                        className="btn btn-success me-2"
                        onClick={() => handleEditRole(role.id)}
                      >
                        <i className="bi bi-check-circle"></i> Save
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => setEditRoleId(null)}
                      >
                        <i className="bi bi-x-circle"></i> Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <span>{role.name}</span>
                    <div>
                      <button
                        className="btn btn-primary me-2"
                        onClick={() => {
                          setEditRoleId(role.id);
                          setEditRoleName(role.name);
                        }}
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteRole(role.id)}
                      >
                        <Trash2 size={16} /> 
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default RoleManagement;