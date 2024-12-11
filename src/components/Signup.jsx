import React, { useState } from 'react';
import '../styles/Signup.css';

function Signup() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    console.log(`Field changed: ${e.target.name}, Value: ${e.target.value}`);
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage(''); // Clear error on change
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    console.log(`Validating email: ${email}, Result: ${isValid}`);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Form submitted:', formData);

    if (!formData.username.trim()) {
      setErrorMessage('Username is required.');
      console.log('Validation error: Username is required.');
      return;
    }

    if (!validateEmail(formData.email)) {
      setErrorMessage('Invalid email address.');
      console.log('Validation error: Invalid email address.');
      return;
    }

    if (formData.password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      console.log('Validation error: Password too short.');
      return;
    }

    setIsLoading(true); // Start loading
    console.log('Sending signup request to the server...');

    try {
      const response = await fetch('/api/users/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.username,
          email: formData.email,
          password: formData.password,
          role: { id: 2 }, // Replace with the default role ID
        }),
      });

      if (response.ok) {
        console.log('Signup successful:', formData);
        setSuccessMessage('Signup successful!');
        setFormData({ username: '', email: '', password: '' });
        setErrorMessage('');
      } else {
        const data = await response.json();
        console.error('Signup failed:', data.message || 'Unknown error');
        setErrorMessage(data.message || 'Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('An error occurred during signup:', error);
      setErrorMessage('An error occurred. Please try again.');
    } finally {
      setIsLoading(false); // Stop loading
      console.log('Signup process complete.');
    }
  };

  return (
    <div className="signup">
      <h2>Signup</h2>
      {errorMessage && <p className="error">{errorMessage}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
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
    </div>
  );
}

export default Signup;
