const express = require('express');
const router = express.Router();

// Import controller functions
const {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} = require('../controllers/studentController');

// Routes for /api/students
router
  .route('/')
  .get(getAllStudents)   // GET all students
  .post(createStudent);  // POST create a student

// Routes for /api/students/:id
router
  .route('/:id')
  .get(getStudentById)   // GET single student by ID
  .put(updateStudent)    // PUT update student by ID
  .patch(updateStudent)  // PATCH update student by ID
  .delete(deleteStudent);// DELETE student by ID

module.exports = router;
