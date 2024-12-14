import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css'; // Import Font Awesome
import '../styles/Login.css';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

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

  // Email validation
  if (!validateEmail(formData.email)) {
    setErrorMessage('Please enter a valid email.');
    return;
  }

  // Password validation
  if (formData.password.length < 6) {
    setErrorMessage('Password must be at least 6 characters.');
    return;
  }

  setIsLoading(true);

  try {
    const response = await fetch('http://localhost:8080/api/users/login', {
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
      console.log('Response data:', data); // Debugging: Log the response data

      // Check if 2FA is required
      if (data.needs2FA) {
        setSuccessMessage('Login successful! Please check your email for the 2FA code.');
        setFormData({ email: '', password: '' });
        setErrorMessage('');
        
        // Redirect to the 2FA page
        navigate('/two-factor', { state: { email: formData.email } });
      } else {
        setSuccessMessage('Login successful!');
        setFormData({ email: '', password: '' });
        setErrorMessage('');
        // Proceed with normal login if 2FA is not required
      }
    } else {
      const data = await response.json();
      console.log('Login failed data:', data); // Debugging: Log the failure data
      setErrorMessage(data.message || 'Login failed. Please check your credentials.');
    }
  } catch (error) {
    console.error('Error:', error);
    setErrorMessage('An error occurred. Please try again later.');
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="login-container d-flex align-items-center justify-content-center vh-100">
      <div className="card p-4 shadow-sm" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Login</h2>
        {errorMessage && (
          <div className="alert alert-danger">
            <i className="fa fa-exclamation-circle me-2"></i>
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="alert alert-success">
            <i className="fa fa-check-circle me-2"></i>
            {successMessage}
          </div>
        )}
        <form onSubmit={handleSubmit}>
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
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={isLoading}
          >
            {isLoading ? (
              <><i className="fa fa-spinner fa-spin me-2"></i>Logging in...</>
            ) : (
              'Login'
            )}
          </button>
        </form>
        <div className="mt-3 text-center">
          <p className="small">
            Don't have an account? <a href="/signup" className="text-primary">Sign Up</a>
          </p>
          <p className="small">
            <a href="/forgot-password" className="text-secondary">Forgot Password?</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
