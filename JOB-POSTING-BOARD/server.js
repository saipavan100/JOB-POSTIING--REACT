// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const jobRoutes = require('./routes/jobs');

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/jobBoard', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.use('/jobs', jobRoutes);

// Start Server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
