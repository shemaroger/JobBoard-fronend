import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Signup.css'; // Import custom styles

function Signup() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage(''); // Clear error on change
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

    setIsLoading(true); // Start loading

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
          role: { id: 2 }, // Default role: 'User'
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
      console.error('Error:', error); // Log the error for debugging
      setErrorMessage('An error occurred. Please try again.');
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2>Create an Account</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={errorMessage.includes('Username') ? 'invalid' : ''}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errorMessage.includes('email') ? 'invalid' : ''}
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
              className={errorMessage.includes('Password') ? 'invalid' : ''}
              required
            />
          </label>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Signing up...' : 'Signup'}
          </button>
        </form>
        <div className="additional-links">
          <p>
            Already have an account? <Link to="/login">Log in</Link>
          </p>
          <p>
            Forgot your password? <Link to="/forgot-password">Reset it</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
