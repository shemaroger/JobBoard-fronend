import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateUser = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [roles, setRoles] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Fetch available roles from the backend
        axios.get('http://localhost:8080/api/roles/all')
            .then(response => {
                setRoles(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the roles!', error);
            });
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const userData = {
            email,
            password,
            name,
            role: {
                id: role
            }
        };

        try {
            const response = await axios.post('http://localhost:8080/api/users/add', userData);
            setMessage(`User created successfully: ${response.data.email}`);
        } catch (error) {
            setMessage('Error creating user. Please try again.');
            console.error('There was an error creating the user!', error);
        }
    };

    return (
        <div>
            <h2>Create User</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email: </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password: </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Name: </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Role: </label>
                    <select value={role} onChange={(e) => setRole(e.target.value)} required>
                        <option value="">Select Role</option>
                        {roles.map((role) => (
                            <option key={role.id} value={role.id}>
                                {role.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Create User</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default CreateUser;
