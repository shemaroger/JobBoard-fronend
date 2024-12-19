import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function CreateApplication() {
  const { jobId } = useParams(); // Extract jobId from the URL

  useEffect(() => {
    console.log('Job ID:', jobId);
  }, [jobId]);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle file selection
  const handleFileChange = (event) => {
    setFiles(Array.from(event.target.files)); // Convert FileList to an array
  };

  // Submit the form
  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    // Validate fields
    if (!fullName || !email || !phoneNumber || !jobId) {
      setError('Please fill in all the required fields.');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('jobId', jobId);
    formData.append('fullName', fullName);
    formData.append('email', email);
    formData.append('phoneNumber', phoneNumber);

    // Append multiple files
    files.forEach((file, index) => {
      formData.append(`files[${index}]`, file);
    });

    try {
      const response = await axios.post('http://localhost:8080/api/applications/apply', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage(`Application submitted successfully for Job ID ${jobId}`);
      setFullName('');
      setEmail('');
      setPhoneNumber('');
      setFiles([]);
      console.log(response.data);
    } catch (err) {
      setError('Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="card p-5" style={{ width: '600px' }}> {/* Increased width here */}
        <h2 className="text-center mb-4" style={{ fontSize: '30px' }}>Apply for Job</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="fullName" className="form-label" style={{ fontSize: '16px' }}>Full Name</label>
            <input
              type="text"
              className="form-control form-control-lg"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              placeholder="Enter your full name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="form-label" style={{ fontSize: '16px' }}>Email</label>
            <input
              type="email"
              className="form-control form-control-lg"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="form-label" style={{ fontSize: '16px' }}>Phone Number</label>
            <input
              type="tel"
              className="form-control form-control-lg"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              placeholder="Enter your phone number"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="file" className="form-label" style={{ fontSize: '16px' }}>Upload Files</label>
            <input
              type="file"
              className="form-control form-control-lg"
              id="file"
              multiple
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled={loading} style={{ padding: '12px', fontSize: '18px' }}>
            {loading ? "Submitting..." : "Apply Now"}
          </button>
        </form>

        {message && <p className="text-success mt-3 text-center" style={{ fontSize: '16px' }}>{message}</p>}
        {error && <p className="text-danger mt-3 text-center" style={{ fontSize: '16px' }}>{error}</p>}
      </div>
    </div>
  );
}

export default CreateApplication;
