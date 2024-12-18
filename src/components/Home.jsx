import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Home.css';

function Home() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/jobs/all'); // Replace with your actual API endpoint
        setJobs(response.data || []);
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="home">
      <div className="hero-section">
        <h1>Your Dream Job Awaits</h1>
        <p>Explore thousands of job opportunities tailored to your skills.</p>
        <button className="explore-button">Explore Jobs</button>
      </div>

      <div className="job-cards-container">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))
        ) : (
          <p>Loading jobs...</p>
        )}
      </div>
    </div>
  );
}

function JobCard({ job }) {
  return (
    <div className="job-card">
      <h3 className="job-title">{job.title}</h3>
      <p className="job-location"><strong>Location:</strong> {job.location}</p>
      <p className="job-type"><strong>Type:</strong> {job.employmentType}</p>
      <p className="job-salary"><strong>Salary Range:</strong> {job.salaryRange || 'Salary not disclosed'}</p>
      <p className="job-skills"><strong>Skills Required:</strong> {job.skillsRequired}</p>
      <p className="job-category"><strong>Category:</strong> {job.category ? job.category.name : 'Not specified'}</p>
      
      <button className="view-details-button" onClick={() => window.location.href = `/job-details/${job.id}`}>View Details</button>
      <button className="apply-now-button" onClick={() => window.location.href = `/apply-job/${job.id}`}>Apply Now</button>
    </div>
  );
}

export default Home;
