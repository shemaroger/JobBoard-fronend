import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaPlus, FaClipboardList, FaUsers, FaChartLine } from "react-icons/fa";

const AddJob = () => {
  const [jobDetails, setJobDetails] = useState({
    title: "",
    description: "",
    location: "",
    employmentType: "",
    skillsRequired: "",
    salaryRange: "",
    categoryId: "",
  });

  const [categories, setCategories] = useState([]); // For category dropdown
  const [error, setError] = useState(null);

  // Fetch categories when component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/categories/all");
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
        `http://localhost:8080/api/jobs/add?employerId=${employerId}`, // Send employerId as query parameter
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
    <div className="d-flex" style={{ height: "100vh" }}>
      {/* Sidebar */}
      <div className="bg-dark text-white p-4" style={{ width: "250px" }}>
        <h2 className="mb-4">Employer Dashboard</h2>
        <nav>
          <ul className="list-unstyled">
            <li className="mb-3">
              <Link to="/add-list" className="text-white d-flex align-items-center">
                <FaPlus className="mr-2" /> Post a Job
              </Link>
            </li>
            <li className="mb-3">
              <Link to="/job/add" className="text-white d-flex align-items-center">
                <FaClipboardList className="mr-2" /> Manage Job Posts
              </Link>
            </li>
            <li className="mb-3">
              <Link to="/view-applications" className="text-white d-flex align-items-center">
                <FaUsers className="mr-2" /> View Applications
              </Link>
            </li>
            <li className="mb-3">
              <Link to="/analytics" className="text-white d-flex align-items-center">
                <FaChartLine className="mr-2" /> Job Analytics
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="container-fluid p-4">
        <div className="row">
          <div className="col-md-9 offset-md-3">
            <h2 className="mb-4">Add New Job</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}

            <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow-sm">
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={jobDetails.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  value={jobDetails.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  className="form-control"
                  id="location"
                  name="location"
                  value={jobDetails.location}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="employmentType">Employment Type</label>
                <select
                  className="form-control"
                  id="employmentType"
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
                <label htmlFor="skillsRequired">Skills Required</label>
                <input
                  type="text"
                  className="form-control"
                  id="skillsRequired"
                  name="skillsRequired"
                  value={jobDetails.skillsRequired}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="salaryRange">Salary Range</label>
                <input
                  type="text"
                  className="form-control"
                  id="salaryRange"
                  name="salaryRange"
                  value={jobDetails.salaryRange}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="categoryId">Category</label>
                <select
                  className="form-control"
                  id="categoryId"
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

              <button type="submit" className="btn btn-primary btn-block mt-3">
                Add Job
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddJob;
