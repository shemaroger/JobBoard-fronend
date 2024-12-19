import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
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
      <div className="container my-5">
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      </div>
    );
  }

  if (!jobDetails) {
    return (
      <div className="container my-5 d-flex justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8">
          <div className="card shadow-lg border-light rounded">
            <div className="card-header bg-primary text-white text-center py-5">
              <h2 className="display-4 font-weight-bold">{jobDetails.title}</h2>
              <p className="lead text-white-50">{jobDetails.location} | {jobDetails.salaryRange || 'Salary not disclosed'} | {jobDetails.employmentType}</p>
            </div>
            <div className="card-body">
              <div className="mb-4">
                <p className="font-weight-bold text-muted"><i className="bi bi-geo-alt-fill"></i> <span className="text-dark">{jobDetails.location}</span></p>
                <p className="font-weight-bold text-muted"><i className="bi bi-currency-dollar"></i> <span className="text-dark">{jobDetails.salaryRange || 'Salary not disclosed'}</span></p>
                <p className="font-weight-bold text-muted"><i className="bi bi-clock-fill"></i> <span className="text-dark">{jobDetails.employmentType}</span></p>
              </div>

              <div className="mb-5">
                <h4 className="font-weight-bold">Job Description</h4>
                <p>{jobDetails.description}</p>
              </div>

              <div className="d-flex justify-content-between align-items-center mt-4">
                <button 
                  className="btn btn-outline-primary btn-lg shadow-sm"
                  onClick={() => navigate(-1)}
                >
                  <i className="bi bi-arrow-left-circle-fill"></i> Back
                </button>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDetails;
