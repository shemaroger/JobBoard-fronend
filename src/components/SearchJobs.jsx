import React, { useState } from 'react';
import { searchJobs } from '../services/jobService'; // Use named import

function SearchJobs() {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    searchJobs(keyword) // Call the function directly
      .then((response) => setResults(response.data))
      .catch(console.error);
  };

  return (
    <div className="container mt-4">
      <h2>Search Jobs</h2>
      <input
        type="text"
        placeholder="Enter keyword"
        className="form-control"
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button className="btn btn-primary mt-2" onClick={handleSearch}>Search</button>
      <ul className="list-group mt-3">
        {results.map((job) => (
          <li key={job.id} className="list-group-item">
            {job.title} - {job.location}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchJobs;
