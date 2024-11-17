// routes/jobs.js
const express = require('express');
const router = express.Router();
const Job = require('../models/job');

// Add a new job
router.post('/add', async (req, res) => {
  try {
    const { title, company, location, description } = req.body;
    const job = new Job({ title, company, location, description });
    await job.save();
    res.status(201).send({ message: 'Job added successfully!', job });
  } catch (error) {
    res.status(500).send({ error: 'Error adding job.' });
  }
});

// Get all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).send({ error: 'Error fetching jobs.' });
  }
});

// Get jobs by company or location
router.get('/filter', async (req, res) => {
  try {
    const { company, location } = req.query;
    const filter = {};
    if (company) filter.company = company;
    if (location) filter.location = location;

    const jobs = await Job.find(filter);
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).send({ error: 'Error filtering jobs.' });
  }
});

module.exports = router;
