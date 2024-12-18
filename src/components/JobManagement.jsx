
import React, { useState, useEffect } from "react";
import axios from "axios";

const AddJob = () => {
  const [jobDetails, setJobDetails] = useState({
    title: "",
    description: "",
    location: "",
    employmentType: "",
    skillsRequired: "",
    salaryRange: "",
    categoryId: "",
    employerId:""
  });

  const [categories, setCategories] = useState([]); // For category dropdown
  const [error, setError] = useState(null);

  // Fetch categories when component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/categories/all"
        );
        setCategories(response.data || []); // Set the categories
        setError(null);
      } catch (error) {
        setError("Failed to fetch categories. Please try again.");
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobDetails({ ...jobDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError(null);

  const employerId = localStorage.getItem("loginUserId"); // Ensure this is available in localStorage
  if (!employerId) {
    setError("Employer ID is missing. Please log in again.");
    return;
  }

  const payload = {
    ...jobDetails,
    category: { id: jobDetails.categoryId }, // Send category ID correctly
  };

  try {
    const response = await axios.post(
      `http://localhost:8080/api/jobs/add?employerId=${employerId}`,  // Send employerId as query parameter
      payload
    );
    if (response.status === 200) {
      alert("Job added successfully!");
      setJobDetails({
        title: "",
        description: "",
        location: "",
        employmentType: "",
        skillsRequired: "",
        salaryRange: "",
        categoryId: "",
      });
    }
  } catch (error) {
    console.error("Error adding job:", error.response || error.message);
    setError(error.response?.data?.message || "Failed to add job.");
  }
};



  return (
    <div className="container">
      <h2>Add New Job</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={jobDetails.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={jobDetails.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div>
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={jobDetails.location}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Employment Type:</label>
          <select
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
        <div>
          <label>Skills Required:</label>
          <input
            type="text"
            name="skillsRequired"
            value={jobDetails.skillsRequired}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Salary Range:</label>
          <input
            type="text"
            name="salaryRange"
            value={jobDetails.salaryRange}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Category:</label>
          <select
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
        <button type="submit">Add Job</button>
      </form>
    </div>
  );
};

export default AddJob ;