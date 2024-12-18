import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function JobDetails() {
  const { id } = useParams(); // Access the job id from the URL
  const [jobDetails, setJobDetails] = useState(null);
  const [error, setError] = useState(null); // Added error state

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
    return <p>{error}</p>; // Display error message if there’s an error
  }

  if (!jobDetails) {
    return <p>Loading job details...</p>;
  }

  return (
    <div className="job-details">
      <h2>{jobDetails.title}</h2>
      <p>{jobDetails.description}</p>
      <p>Location: {jobDetails.location}</p>
      <p>Salary: {jobDetails.salaryRange}</p>
      {/* Add more details as necessary */}
    </div>
  );
}

export default JobDetails;
