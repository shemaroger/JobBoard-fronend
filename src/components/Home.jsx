import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import '../styles/Home.css';

function Home() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/jobs/all');
        setJobs(response.data || []);
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="home">
      {/* Hero Section with Modern Look */}
      <div className="hero-section text-center py-5">
        <h1 className="display-3 text-light">Find Your Dream Job</h1>
        <p className="lead text-light mb-4">Start your journey with exciting job opportunities tailored to your expertise.</p>
        <Link to="/jobs" className="btn btn-lg btn-gradient">Explore Jobs</Link>
      </div>

      {/* Job Cards Section */}
      <div className="job-cards-container container py-5">
        {jobs.length > 0 ? (
          <div className="row">
            {jobs.map((job) => (
              <div key={job.id} className="col-md-4 mb-4">
                <JobCard job={job} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">Loading jobs...</p>
        )}
      </div>
    </div>
  );
}

function JobCard({ job }) {
  return (
    <div className="job-card card shadow-lg rounded-lg">
      <div className="card-body">
        <h5 className="card-title text-primary">{job.title}</h5>
        <p className="card-text text-muted">{job.location}</p>
        <p className="card-text">{job.employmentType}</p>
        <p className="card-text font-weight-bold">{job.salaryRange || 'Salary not disclosed'}</p>

        <div className="d-flex justify-content-between">
          <Link to={`/job-details/${job.id}`} className="btn btn-outline-primary btn-sm">
            View Details
          </Link>
          <Link to={`/apply/${job.id}`} className="btn btn-success btn-sm">
            Apply Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
