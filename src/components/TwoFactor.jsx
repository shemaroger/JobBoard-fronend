import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function TwoFactor() {
  const [token, setToken] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { email } = location.state || {}; // Retrieve email from state

  useEffect(() => {
    if (!email) {
      // If no email is present, redirect back to login
      navigate('/login');
    }
    document.getElementById('token').focus();
  }, [email, navigate]);

  const handleTokenChange = (e) => {
    setToken(e.target.value);
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token || token.length < 6) {
      setErrorMessage('Token must be at least 6 characters.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/users/validate-2fa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Important for handling cookies/sessions
        body: JSON.stringify({ email, token }),
      });

      // Log the raw response for debugging
      console.log('Raw Response:', response);

      const data = await response.text(); // Try to get text first
      console.log('Response Data:', data);

      if (response.ok) {
        console.log('2FA validated successfully');
        navigate('/admin');
      } else {
        // Try to parse as JSON if possible
        let errorData;
        try {
          errorData = JSON.parse(data);
        } catch (parseError) {
          errorData = { message: data || 'Unknown error occurred' };
        }
        
        setErrorMessage(errorData.message || 'Invalid or expired token.');
        console.error('Validation Error:', errorData);
      }
    } catch (error) {
      console.error('Network or Request Error:', error);
      setErrorMessage(`Network error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Enter 2FA Token</h2>
      {errorMessage && (
        <div className="alert alert-danger">
          <i className="fa fa-exclamation-circle me-2"></i>
          {errorMessage}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="token" className="form-label">2FA Token</label>
          <input
            type="text"
            id="token"
            name="token"
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
            <><i className="fa fa-spinner fa-spin me-2"></i>Validating...</>
          ) : (
            'Submit'
          )}
        </button>
      </form>
    </div>
  );
}

export default TwoFactor;