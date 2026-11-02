const mongoose = require('mongoose');
const Student = require('../models/Student');

// ==========================================
// 1. CREATE: Add a new student
// @route   POST /api/students
// @desc    Create a new student record
// @access  Public
// ==========================================
const createStudent = async (req, res) => {
  try {
    const { name, email, course, age } = req.body;

    // Check if required fields exist in request body
    if (!name || !email || !course || !age) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, email, course, and age',
      });
    }

    // Check if a student with the same email already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: 'A student with this email already exists',
      });
    }

    // Create the student in MongoDB
    const student = await Student.create({
      name,
      email,
      course,
      age,
    });

    // Return 201 Created status code with the newly created student object
    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      data: student,
    });
  } catch (error) {
    // Handle duplicate key error (e.g. unique email constraint)
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'A student with this email already exists',
      });
    }

    // Handle validation errors from Mongoose
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', '),
      });
    }

    // Handle generic server errors
    res.status(500).json({
      success: false,
      message: 'Server Error: Unable to create student',
      error: error.message,
    });
  }
};

// ==========================================
// 2. READ: Get all students
// @route   GET /api/students
// @desc    Retrieve all student records
// @access  Public
// ==========================================
const getAllStudents = async (req, res) => {
  try {
    // Fetch all students sorted by most recently created
    const students = await Student.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: students.length,
      data: students,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error: Unable to fetch students',
      error: error.message,
    });
  }
};

// ==========================================
// 3. READ: Get a single student by ID
// @route   GET /api/students/:id
// @desc    Retrieve a student by MongoDB _id
// @access  Public
// ==========================================
const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate if the ID matches standard MongoDB ObjectId format (24 hex chars)
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: `Invalid ID format: '${id}'. Must be a 24-character hexadecimal ID.`,
      });
    }

    const student = await Student.findById(id);

    // If no student exists with this ID, return 404 Not Found
    if (!student) {
      return res.status(404).json({
        success: false,
        message: `No student found with ID: ${id}`,
      });
    }

    res.status(200).json({
      success: true,
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error: Unable to fetch student',
      error: error.message,
    });
  }
};

// ==========================================
// 4. UPDATE: Update student details by ID
// @route   PUT /api/students/:id
// @desc    Update an existing student record
// @access  Public
// ==========================================
const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: `Invalid ID format: '${id}'. Must be a 24-character hexadecimal ID.`,
      });
    }

    // Check if the update contains an email that belongs to another student
    if (req.body.email) {
      const existingStudent = await Student.findOne({
        email: req.body.email,
        _id: { $ne: id },
      });
      if (existingStudent) {
        return res.status(400).json({
          success: false,
          message: 'Another student already uses this email address',
        });
      }
    }

    // Options:
    // - new: true (returns updated document instead of original)
    // - runValidators: true (ensures schema rules still apply on updates)
    const updatedStudent = await Student.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedStudent) {
      return res.status(404).json({
        success: false,
        message: `No student found with ID: ${id}`,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Student updated successfully',
      data: updatedStudent,
    });
  } catch (error) {
    // Handle duplicate key error (e.g. updating to an already taken email)
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Another student already uses this email address',
      });
    }

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', '),
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server Error: Unable to update student',
      error: error.message,
    });
  }
};

// ==========================================
// 5. DELETE: Delete a student by ID
// @route   DELETE /api/students/:id
// @desc    Remove a student record from the database
// @access  Public
// ==========================================
const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: `Invalid ID format: '${id}'. Must be a 24-character hexadecimal ID.`,
      });
    }

    const student = await Student.findByIdAndDelete(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: `No student found with ID: ${id}`,
      });
    }

    res.status(200).json({
      success: true,
      message: `Student '${student.name}' with ID ${id} was deleted successfully`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error: Unable to delete student',
      error: error.message,
    });
  }
};

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
