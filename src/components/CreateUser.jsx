import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const CreateUser = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [roles, setRoles] = useState([]);
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8080/api/roles/all')
            .then(response => {
                setRoles(response.data);
            })
            .catch(error => {
                setMessage('Unable to fetch roles. Please try again later.');
            });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        
        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
            return;
        }

        setIsSubmitting(true);
        setMessage('');

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
            
            // Reset form
            setEmail('');
            setPassword('');
            setName('');
            setRole('');
            setValidated(false);
        } catch (error) {
            setMessage('Error creating user. Please check your details and try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-lg-6 col-md-8">
                    <div className="card shadow-lg border-0 rounded-lg">
                        <div className="card-header bg-primary text-white text-center py-4">
                            <h3 className="mb-0">Create New User</h3>
                        </div>
                        <div className="card-body p-5">
                            <form noValidate validated={validated} onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email Address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        placeholder="you@example.com"
                                    />
                                    <div className="invalid-feedback">
                                        Please provide a valid email address.
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        minLength={6}
                                        placeholder="••••••••"
                                    />
                                    <div className="invalid-feedback">
                                        Password is required and must be at least 6 characters.
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Full Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        placeholder="John Doe"
                                    />
                                    <div className="invalid-feedback">
                                        Full name is required.
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="role" className="form-label">User Role</label>
                                    <select
                                        className="form-select"
                                        id="role"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                        required
                                    >
                                        <option value="">Select Role</option>
                                        {roles.map((roleOption) => (
                                            <option key={roleOption.id} value={roleOption.id}>
                                                {roleOption.name}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="invalid-feedback">
                                        Please select a role.
                                    </div>
                                </div>

                                <div className="d-grid">
                                    <button 
                                        type="submit" 
                                        className="btn btn-primary btn-lg"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                Creating...
                                            </>
                                        ) : (
                                            'Create User'
                                        )}
                                    </button>
                                </div>
                            </form>

                            {message && (
                                <div className={`alert ${message.includes('successfully') 
                                    ? 'alert-success' 
                                    : 'alert-danger'} mt-3`}
                                >
                                    {message}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateUser;