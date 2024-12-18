import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const JobDetail = () => {
  const { id } = useParams(); // Job ID from the URL
  const [job, setJob] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/jobs/${id}`);
        setJob(response.data);
      } catch (err) {
        setError("Failed to fetch job details.");
      }
    };
    fetchJob();
  }, [id]);

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!job) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h2>{job.title}</h2>
      <p><strong>Description:</strong> {job.description}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Employment Type:</strong> {job.employmentType}</p>
      <p><strong>Skills Required:</strong> {job.skillsRequired}</p>
      <p><strong>Salary Range:</strong> {job.salaryRange}</p>
      <p><strong>Category:</strong> {job.category.name}</p>
    </div>
  );
};

export default JobDetail;
