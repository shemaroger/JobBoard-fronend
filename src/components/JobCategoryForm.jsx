import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JobCategoryForm = ({ categoryId, setCategories, setCategoryId }) => {
    const [categoryName, setCategoryName] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch category data for updating
        if (categoryId) {
            axios.get(`http://localhost:8080/api/categories/${categoryId}`)
                .then(response => {
                    setCategoryName(response.data.name);
                })
                .catch(err => setError('Error fetching category'));
        }
    }, [categoryId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const category = { name: categoryName };

        try {
            if (categoryId) {
                // Update category
                console.log("Updating category:", category);
                const response = await axios.put(`http://localhost:8080/api/categories/update/${categoryId}`, category);
                console.log("Update response:", response.data);
            } else {
                // Create new category
                console.log("Creating category:", category);
                const response = await axios.post('http://localhost:8080/api/categories/add', category);
                console.log("Create response:", response.data);
            }
            setCategoryName('');
            setCategoryId(null);
            fetchCategories(); // Fetch updated categories list
        } catch (err) {
            console.error('Error saving category:', err);
            setError('Error saving category');
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/categories/all');
            setCategories(response.data);
        } catch (err) {
            console.error('Error fetching categories:', err);
            setError('Error fetching categories');
        }
    };

    return (
        <div>
            <h2>{categoryId ? 'Update Category' : 'Create Category'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Category Name</label>
                    <input
                        type="text"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">{categoryId ? 'Update' : 'Create'}</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default JobCategoryForm;
