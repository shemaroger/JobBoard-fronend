import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import '../styles/Login.css';

// Service function for API calls
const loginUser = async (email, password) => {
  const response = await fetch('http://localhost:8080/api/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) throw new Error('Login failed');
  return response.json();
};

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage(''); // Clear error on input change
  };

  // Validate email format
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!validateEmail(formData.email)) {
      setErrorMessage('Please enter a valid email.');
      return;
    }
    if (formData.password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);

    try {
      // Login user
      const data = await loginUser(formData.email, formData.password);
      console.log('API Response:', data);

      // Handle 2FA if needed
      if (data.needs2FA) {
        setSuccessMessage('Login successful! Please check your email for the 2FA code.');
        navigate('/two-factor', { state: { email: formData.email } });
        return;
      }

      // Redirect based on role
      const redirectPath = data.redirect;
      if (redirectPath) {
        // Store necessary data in local storage or state for later use
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userRole', data.role);

        console.log('Navigating to:', redirectPath);
        navigate(redirectPath);
      } else {
        setErrorMessage('Redirection failed. Please contact support.');
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      setErrorMessage(error.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Automatically redirect if user is already logged in
  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    const storedToken = localStorage.getItem('authToken');
    if (storedRole && storedToken) {
      const rolePaths = {
        Admin: '/admin',
        User: '/user-dashboard',
        Employer: '/employer-dashboard',
      };

      const redirectPath = rolePaths[storedRole];
      if (redirectPath) {
        console.log('Redirecting to stored role:', redirectPath);
        navigate(redirectPath);
      }
    }
  }, [navigate]);

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
