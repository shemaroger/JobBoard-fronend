import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css'; // Import Font Awesome
import '../styles/Signup.css'; // Include additional custom styles if needed

function Signup() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage('');
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username.trim()) {
      setErrorMessage('Username is required.');
      return;
    }

    if (!validateEmail(formData.email)) {
      setErrorMessage('Invalid email address.');
      return;
    }
    
    if (formData.password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8080/api/users/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.username,
          email: formData.email,
          password: formData.password,
          role: { id: 2 },
        }),
      });

      if (response.ok) {
        setSuccessMessage('Signup successful! Please log in.');
        setFormData({ username: '', email: '', password: '' });
        setErrorMessage('');
      } else {
        const data = await response.json();
        setErrorMessage(data.message || 'Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4 w-50">
        <h2 className="text-center mb-4">Create an Account</h2>
        {errorMessage && <div className="alert alert-danger"><i className="fa fa-exclamation-circle me-2"></i>{errorMessage}</div>}
        {successMessage && <div className="alert alert-success"><i className="fa fa-check-circle me-2"></i>{successMessage}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <div className="input-group">
              <span className="input-group-text"><i className="fa fa-user"></i></span>
              <input
                type="text"
                id="username"
                name="username"
                className="form-control"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <div className="input-group">
              <span className="input-group-text"><i className="fa fa-envelope"></i></span>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="input-group">
              <span className="input-group-text"><i className="fa fa-lock"></i></span>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
            {isLoading ? <><i className="fa fa-spinner fa-spin me-2"></i>Signing up...</> : 'Signup'}
          </button>
        </form>
        <div className="text-center mt-3">
          <p>
            Already have an account? <Link to="/login" className="text-primary">Log in</Link>
          </p>
          <p>
            Forgot your password? <Link to="/forgot-password" className="text-primary">Reset it</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;