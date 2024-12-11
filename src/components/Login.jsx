import React, { useState } from 'react';
import '../styles/Login.css';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Handle form data change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage(''); // Clear error on change
  };

  // Validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email
    if (!validateEmail(formData.email)) {
      setErrorMessage('Please enter a valid email.');
      return;
    }

    // Validate password (e.g., minimum length)
    if (formData.password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true); // Show loading state

    try {
      const response = await fetch('http://localhost:8080/api/login', { // Backend URL for login
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage('Login successful!');
        setFormData({ email: '', password: '' });
        setErrorMessage('');
        // Handle success (e.g., store token or redirect)
        console.log('Logged in successfully:', data);
      } else {
        const data = await response.json();
        setErrorMessage(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false); // Hide loading state
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      {errorMessage && <p className="error">{errorMessage}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default Login;
