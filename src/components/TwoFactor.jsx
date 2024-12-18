import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function TwoFactor() {
  const [token, setToken] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch stored user details
  const email = localStorage.getItem('loginEmail');
  const role = localStorage.getItem('loginRole');
  const userId = localStorage.getItem('loginUserId'); // Retrieve userId

  // Role-based redirect paths
  const rolePaths = {
    Admin: '/admin',
    Employer: '/employer-dashboard',
    User: '/user-dashboard',
  };

  // Redirect to login if email is missing
  useEffect(() => {
    if (!email) {
      navigate('/login');
    }
  }, [email, navigate]);

  // Handle token input change
  const handleTokenChange = (e) => {
    setToken(e.target.value);
    setErrorMessage('');
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token || token.length < 6) {
      setErrorMessage('Token must be at least 6 characters.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await fetch('http://localhost:8080/api/users/validate-2fa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, token }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Invalid token');
      }

      const data = await response.json();
      console.log('2FA Validation Response:', data);

      // Store token and redirect based on role
      localStorage.setItem('authToken', data.token || 'dummy-token');
      const redirectPath = rolePaths[role];

      if (redirectPath) {
        setSuccessMessage('Two-factor authentication successful!');
        setTimeout(() => navigate(redirectPath), 1500); // Redirect after 1.5 seconds
      } else {
        setErrorMessage('Invalid user role. Please contact support.');
      }

      // Here you can use the userId after successful 2FA verification
      console.log('User ID after successful 2FA:', userId);

    } catch (error) {
      console.error('2FA Validation Error:', error);
      setErrorMessage(error.message || 'Failed to validate token. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-sm mx-auto" style={{ maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Two-Factor Authentication</h2>
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
            <label htmlFor="token" className="form-label">Enter the 2FA Token</label>
            <input
              type="text"
              id="token"
              className="form-control"
              value={token}
              onChange={handleTokenChange}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={isLoading}
          >
            {isLoading ? (
              <><i className="fa fa-spinner fa-spin me-2"></i>Verifying...</>
            ) : (
              'Verify Token'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default TwoFactor;
