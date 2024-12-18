import React, { useState, useEffect } from 'react';
import { addJob } from '../services/jobService'; // Use named import
import { getAllCategories } from '../services/jobCategoryService'; // Correct import for getting categories
import { getLoggedInUserId } from '../services/authService'; // Add this service to fetch logged-in user ID

function AddJobForm() {
  const [job, setJob] = useState({
    title: '',
    location: '',
    description: '',
    employmentType: 'Full-Time', // Default value
    skillsRequired: '',
    salaryRange: '',
    employer: '', // This will be dynamically set based on the logged-in user
    category: '', // This will be set when the user selects a category
  });

  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Fetch categories when the component mounts
    getAllCategories()
      .then((response) => setCategories(response.data))  // Access the data correctly from response
      .catch((err) => {
        console.error("Failed to fetch categories:", err);
        setError("Failed to load categories.");
      });

    // Fetch the logged-in user's ID (employer)
    getLoggedInUserId()
      .then((userId) => setJob((prevJob) => ({ ...prevJob, employer: userId })))
      .catch((err) => {
        console.error("Failed to fetch logged-in user:", err);
        setError("Failed to load employer.");
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob({ ...job, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Log the job state to verify employer and category
    console.log("Job state on submit:", job);

    // Validate that category and employer are selected
    if (!job.category || !job.employer) {
      setError('Category and Employer must be selected.');
      return;
    }

    // Validate salary range format (simple numeric check)
    if (job.salaryRange && isNaN(job.salaryRange)) {
      setError('Salary range must be a number.');
      return;
    }

    setIsSubmitting(true);
    addJob(job)
      .then(() => {
        setSuccess('Job created successfully!');
        setJob({
          title: '',
          location: '',
          description: '',
          employmentType: 'Full-Time',
          skillsRequired: '',
          salaryRange: '',
          employer: job.employer, // Keep the employer ID intact
          category: '', // Reset category for re-selection
        });
      })
      .catch((err) => {
        console.error('Error creating job:', err.response ? err.response.data : err.message);
        setError(err.response?.data?.message || 'Failed to create job. Please try again.');
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <div className="container mt-4">
      <h2>Add New Job</h2>
      <form onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <input
          name="title"
          placeholder="Job Title"
          className="form-control"
          value={job.title}
          onChange={handleChange}
        />
        <input
          name="location"
          placeholder="Location"
          className="form-control mt-2"
          value={job.location}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          className="form-control mt-2"
          value={job.description}
          onChange={handleChange}
        />
        
        <select
          name="employmentType"
          className="form-control mt-2"
          value={job.employmentType}
          onChange={handleChange}
        >
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Contract">Contract</option>
        </select>

        <input
          name="skillsRequired"
          placeholder="Skills Required"
          className="form-control mt-2"
          value={job.skillsRequired}
          onChange={handleChange}
        />
        <input
          name="salaryRange"
          placeholder="Salary Range"
          className="form-control mt-2"
          value={job.salaryRange}
          onChange={handleChange}
        />

        <select
          name="category"
          className="form-control mt-2"
          value={job.category}
          onChange={handleChange}
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <button type="submit" className="btn btn-success mt-2" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Add Job'}
        </button>
      </form>
    </div>
  );
}

export default AddJobForm;
