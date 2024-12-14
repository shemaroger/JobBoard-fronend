import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function TwoFactor() {
  const [token, setToken] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { email } = location.state || {}; // Retrieve email from state passed via navigation

  const handleTokenChange = (e) => {
    setToken(e.target.value);
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8080/api/users/validate-2fa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          token: token,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('2FA validated:', data);

        // Redirect to dashboard or home after successful validation
        navigate('/admin');
      } else {
        const data = await response.json();
        setErrorMessage(data.message || 'Invalid or expired token.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred. Please try again later.');
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
