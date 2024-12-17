import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Trash2, Edit2, PlusCircle } from 'lucide-react';
import 'react-toastify/dist/ReactToastify.css';
import { createCategory, getAllCategories, updateCategory, deleteCategory } from '../services/jobCategoryService';

function JobCategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllCategories();
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories', error);
      setError('Failed to fetch categories. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCategory = async () => {
    if (!newCategory.trim()) {
      setError('Category name cannot be empty');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await createCategory({ name: newCategory.trim() });
      fetchCategories();
      setNewCategory('');
      showToast('Category created successfully', 'success');
    } catch (error) {
      console.error('Error creating category', error);
      showToast('Failed to create category', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCategory = async () => {
    if (!editCategoryName.trim()) {
      setError('Category name cannot be empty');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await updateCategory(editCategoryId, { name: editCategoryName.trim() });
      fetchCategories();
      setEditCategoryId(null);
      setEditCategoryName('');
      showToast('Category updated successfully', 'success');
    } catch (error) {
      console.error('Error updating category', error);
      showToast('Failed to update category', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await deleteCategory(id);
      fetchCategories();
      showToast('Category deleted successfully', 'success');
    } catch (error) {
      console.error('Error deleting category', error);
      showToast('Failed to delete category', 'error');
    } finally {
      setLoading(false);
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
      <h1 className="text-center mb-4">Job Category Management</h1>

      {/* Error Notification */}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {/* Add New Category Section */}
      <div className="card">
        <div className="card-body">
          <h2 className="card-title mb-4">Add New Category</h2>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Enter category name"
              aria-label="New Category"
              aria-describedby="button-addon2"
              disabled={loading}
            />
            <button
              className="btn btn-primary"
              type="button"
              id="button-addon2"
              onClick={handleCreateCategory}
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Category'}
            </button>
          </div>
        </div>
      </div>

      {/* Categories List Section */}
      <div className="card mt-4">
        <div className="card-body">
          <h2 className="card-title mb-4">Existing Categories</h2>
          <ul className="list-group">
            {categories.length === 0 ? (
              <li className="list-group-item">No categories found</li>
            ) : (
              categories.map((category) => (
                <li
                  key={category.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  {editCategoryId === category.id ? (
                    <>
                      <input
                        type="text"
                        className="form-control"
                        value={editCategoryName}
                        onChange={(e) => setEditCategoryName(e.target.value)}
                        placeholder="Edit category name"
                      />
                      <div>
                        <button
                          className="btn btn-success me-2"
                          onClick={handleUpdateCategory}
                        >
                          Save
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => setEditCategoryId(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <span>{category.name}</span>
                      <div>
                        <button
                          className="btn btn-primary me-2"
                          onClick={() => {
                            setEditCategoryId(category.id);
                            setEditCategoryName(category.name);
                          }}
                        >
                          <Edit2 size={20} />
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDeleteCategory(category.id)}
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default JobCategoryManagement;
