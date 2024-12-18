import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const EditJob = () => {
  const { id } = useParams(); // Job ID from the URL
  const [jobDetails, setJobDetails] = useState({
    title: "",
    description: "",
    location: "",
    employmentType: "",
    skillsRequired: "",
    salaryRange: "",
    categoryId: "",
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/jobs/${id}`);
        setJobDetails(response.data);
      } catch (err) {
        setError("Failed to fetch job details.");
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/categories/all");
        setCategories(response.data || []);
      } catch (err) {
        setError("Failed to fetch categories.");
      }
    };

    fetchJobDetails();
    fetchCategories();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.put(`http://localhost:8080/api/jobs/update/${id}`, jobDetails);
      if (response.status === 200) {
        setSuccess("Job updated successfully!");
      }
    } catch (err) {
      setError("Failed to update job.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Edit Job</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={jobDetails.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            className="form-control"
            name="description"
            value={jobDetails.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            className="form-control"
            name="location"
            value={jobDetails.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Employment Type</label>
          <select
            className="form-control"
            name="employmentType"
            value={jobDetails.employmentType}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Contract">Contract</option>
          </select>
        </div>
        <div className="form-group">
          <label>Skills Required</label>
          <input
            type="text"
            className="form-control"
            name="skillsRequired"
            value={jobDetails.skillsRequired}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Salary Range</label>
          <input
            type="text"
            className="form-control"
            name="salaryRange"
            value={jobDetails.salaryRange}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <select
            className="form-control"
            name="categoryId"
            value={jobDetails.categoryId}
            onChange={handleChange}
            required
          >
            <option value="">Select a Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Update Job
        </button>
      </form>
    </div>
  );
};

export default EditJob;
