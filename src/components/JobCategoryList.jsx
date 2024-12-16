import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobCategoryForm from './JobCategoryForm';

const JobCategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState(null);

    // Fetch categories when the component mounts
    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/categories/all');
            setCategories(response.data);
        } catch (err) {
            console.error('Error fetching categories', err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/categories/delete/${id}`);
            fetchCategories(); // Refresh categories list
        } catch (err) {
            console.error('Error deleting category', err);
        }
    };

    return (
        <div>
            <JobCategoryForm categoryId={categoryId} setCategories={setCategories} setCategoryId={setCategoryId} />
            <h2>Job Categories</h2>
            <ul>
                {categories.map((category) => (
                    <li key={category.id}>
                        {category.name}
                        <button onClick={() => setCategoryId(category.id)}>Edit</button>
                        <button onClick={() => handleDelete(category.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default JobCategoryList;
