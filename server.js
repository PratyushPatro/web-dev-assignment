// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const studentRoutes = require('./routes/studentRoutes');

// Initialize Express app
const app = express();

// Connect to MongoDB Atlas
connectDB();

// ------------------------------------------
// Built-in Middleware
// ------------------------------------------
// Allows Express to parse JSON bodies from incoming requests (req.body)
app.use(express.json());
// Allows Express to parse URL-encoded form data
app.use(express.urlencoded({ extended: false }));

// ------------------------------------------
// Root / Health Check Route
// ------------------------------------------
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the Student CRUD REST API!',
    status: 'Running',
    endpoints: {
      getAllStudents: 'GET /api/students',
      getStudentById: 'GET /api/students/:id',
      createStudent: 'POST /api/students',
      updateStudent: 'PUT /api/students/:id',
      deleteStudent: 'DELETE /api/students/:id',
    },
  });
});

// ------------------------------------------
// Database Connection Guard for API Routes
// ------------------------------------------
app.use('/api/students', (req, res, next) => {
  // readyState: 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      success: false,
      message: 'Database is not connected. Please add your MongoDB Atlas connection string in .env and make sure your cluster allows connections.',
    });
  }
  next();
});

// ------------------------------------------
// Mount API Routes
// ------------------------------------------
app.use('/api/students', studentRoutes);

// ------------------------------------------
// 404 Fallback Handler (Route Not Found)
// ------------------------------------------
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Cannot find route: ${req.method} ${req.originalUrl}`,
  });
});

// ------------------------------------------
// Global Error Handler Middleware
// ------------------------------------------
app.use((err, req, res, next) => {
  console.error('Unhandled Application Error:', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// ------------------------------------------
// Start Server
// ------------------------------------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
