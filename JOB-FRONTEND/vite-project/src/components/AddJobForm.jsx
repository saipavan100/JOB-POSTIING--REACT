// src/components/AddJobForm.js
import React, { useState } from 'react';
import axios from 'axios';

const AddJobForm = ({ onJobAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/jobs/add', formData);
      if (response.status === 201) {
        alert('Job added successfully!');
        setFormData({ title: '', company: '', location: '', description: '' });
        onJobAdded(); // Refresh job list on success
      }
    } catch (error) {
      alert('Error adding job!');
    }
  };

  return (
    <div>
      <h2>Add Job Opening</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </label><br />

        <label>
          Company:
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
          />
        </label><br />

        <label>
          Location:
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </label><br />

        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </label><br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddJobForm;
