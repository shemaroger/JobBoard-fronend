import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is included

function JobDetails() {
  const { id } = useParams(); // Access the job id from the URL
  const [jobDetails, setJobDetails] = useState(null);
  const [error, setError] = useState(null); // Added error state
  const navigate = useNavigate(); // Hook to navigate

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/jobs/details/${id}`);
        setJobDetails(response.data);
      } catch (err) {
        setError("Failed to fetch job details."); // Set error state on failure
        console.error("Failed to fetch job details:", err);
      }
    };

    fetchJobDetails();
  }, [id]);

  if (error) {
    return (
      <div className="container my-4">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  if (!jobDetails) {
    return (
      <div className="container my-4">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <p>Loading job details...</p>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white">
          <h3>{jobDetails.title}</h3>
        </div>
        <div className="card-body">
          <p className="card-text"><strong>Description:</strong> {jobDetails.description}</p>
          <p className="card-text"><strong>Location:</strong> {jobDetails.location}</p>
          <p className="card-text"><strong>Salary:</strong> {jobDetails.salaryRange || 'Salary not disclosed'}</p>
          <p className="card-text"><strong>Employment Type:</strong> {jobDetails.employmentType}</p>
          
          <button className="btn btn-outline-primary" onClick={() => navigate(-1)}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobDetails;
