const mongoose = require('mongoose');

// Define the Schema for the Student collection
const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide the student name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide the student email'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email address',
      ],
    },
    course: {
      type: String,
      required: [true, 'Please provide the enrolled course'],
      trim: true,
    },
    age: {
      type: Number,
      required: [true, 'Please provide the student age'],
      min: [1, 'Age must be a positive number'],
    },
  },
  {
    // Automatically creates `createdAt` and `updatedAt` fields
    timestamps: true,
  }
);

// Create and export the Student model
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
