// src/components/JobBoard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddJobForm from './AddJobForm';
import '../JobBoard.css' // Importing the CSS file

const JobBoard = () => {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({ company: '', location: '' });

  // Fetch jobs
  const fetchJobs = async () => {
    try {
      const query = new URLSearchParams(filters).toString();
      const response = await axios.get(`http://localhost:3000/jobs/filter?${query}`);
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Refresh jobs list after adding new job
  const handleJobAdded = () => {
    fetchJobs();
  };

  return (
    <div className="job-board-container">
      <h1>Job Board</h1>

      <div className="filters">
        <label>
          Filter by Company:
          <input
            type="text"
            name="company"
            value={filters.company}
            onChange={handleFilterChange}
          />
        </label>
        <label>
          Filter by Location:
          <input
            type="text"
            name="location"
            value={filters.location}
            onChange={handleFilterChange}
          />
        </label>
        <button onClick={fetchJobs}>Apply Filters</button>
      </div>

      <AddJobForm onJobAdded={handleJobAdded} />

      <h2>Job Listings</h2>
      <div className="job-listing">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div key={job._id} className="job-item">
              <h3>{job.title}</h3>
              <p><strong>Company:</strong> {job.company}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p>{job.description}</p>
            </div>
          ))
        ) : (
          <p>No jobs found.</p>
        )}
      </div>
    </div>
  );
};

export default JobBoard;
