import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPlus, FaClipboardList, FaUsers, FaChartLine } from "react-icons/fa";
import { Link } from "react-router-dom";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const employerId = localStorage.getItem("loginUserId");

  useEffect(() => {
    const fetchJobs = async () => {
      if (!employerId) {
        setError("Employer ID is missing");
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:8080/api/jobs/employer/${employerId}`
        );
        setJobs(response.data || []);
        setFilteredJobs(response.data || []);
        setError(null);
      } catch (err) {
        setError("Failed to fetch jobs.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, [employerId]);

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (!query) {
      setFilteredJobs(jobs); // Reset if query is empty
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.get(
        `http://localhost:8080/api/jobs/search?keyword=${query}`
      );
      setFilteredJobs(response.data || []);
    } catch (err) {
      setError("Failed to fetch search results.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      await axios.delete(`http://localhost:8080/api/jobs/delete/${id}`);
      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
      setFilteredJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
    } catch (err) {
      setError("Failed to delete job.");
    }
  };

  return (
    <div className="d-flex" style={{ height: '100vh' }}>
      {/* Sidebar */}
      <div className="bg-dark text-white p-4" style={{ width: '250px' }}>
        <h2 className="mb-4">Employer Dashboard</h2>
        <nav>
          <ul className="list-unstyled">
            <li className="mb-3">
              <Link to="/job/add" className="text-white d-flex align-items-center">
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
      <div className="container mt-4" style={{ flex: 1 }}>
        <h2>Job Listings</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search jobs..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        {isLoading ? (
          <p>Loading...</p>
        ) : filteredJobs.length === 0 ? (
          <p>No jobs found matching your search.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Location</th>
                <th>Type</th>
                <th>Salary Range</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.map((job) => (
                <tr key={job.id}>
                  <td>{job.title}</td>
                  <td>{job.location}</td>
                  <td>{job.employmentType}</td>
                  <td>{job.salaryRange || "Not specified"}</td>
                  <td>
                    <button
                      className="btn btn-info btn-sm"
                      onClick={() => (window.location.href = `/edit-job/${job.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm ml-2"
                      onClick={() => handleDelete(job.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default JobList;
