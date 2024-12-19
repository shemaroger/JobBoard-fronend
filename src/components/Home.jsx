import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaSearch, FaMapMarkerAlt, FaBriefcase, FaDollarSign } from 'react-icons/fa'; // Import React Icons
import '../styles/Home.css';

function Home() {
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch jobs from the API
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

  // Filter jobs based on search query
  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.employmentType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="home">
      {/* Hero Section with Modern Look */}
      <div className="hero-section text-center py-5">
        <h1 className="display-3 text-light">Find Your Dream Job</h1>
        <p className="lead text-light mb-4">Start your journey with exciting job opportunities tailored to your expertise.</p>
        
        {/* Search Bar with Icon */}
        <div className="input-group mb-4">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <FaSearch /> {/* Search Icon */}
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="Search jobs by title, location, or type"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Link to="/jobs" className="btn btn-lg btn-gradient">Explore Jobs</Link>
      </div>

      {/* Job Cards Section */}
      <div className="job-cards-container container py-5">
        {filteredJobs.length > 0 ? (
          <div className="row">
            {filteredJobs.map((job) => (
              <div key={job.id} className="col-md-4 mb-4">
                <JobCard job={job} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">No jobs found matching your search criteria.</p>
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
        
        {/* Job Location Icon */}
        <p className="card-text text-muted">
          <FaMapMarkerAlt className="mr-2" />
          {job.location}
        </p>
        
        {/* Employment Type Icon */}
        <p className="card-text">
          <FaBriefcase className="mr-2" />
          {job.employmentType}
        </p>
        
        {/* Salary Icon */}
        <p className="card-text font-weight-bold">
          <FaDollarSign className="mr-2" />
          {job.salaryRange || 'Salary not disclosed'}
        </p>

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
