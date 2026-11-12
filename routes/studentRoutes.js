const express = require('express');
const {
  getAllStudents,
  getStudentById,
  addStudent,
  updateStudent,
  deleteStudent
} = require('../data/students');

const router = express.Router();

const parseStudentId = (value) => {
  const id = Number(value);
  return Number.isSafeInteger(id) && id > 0 ? id : null;
};

const validateStudent = (body) => {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return 'Request body must be a JSON object';
  }

  if (typeof body.name !== 'string' || !body.name.trim()) {
    return 'Name is required and must be a non-empty string';
  }

  if (typeof body.course !== 'string' || !body.course.trim()) {
    return 'Course is required and must be a non-empty string';
  }

  return null;
};

router.get('/', (req, res) => {
  const students = getAllStudents();

  return res.status(200).json({
    success: true,
    count: students.length,
    data: students
  });
});

router.get('/:id', (req, res) => {
  const id = parseStudentId(req.params.id);

  if (id === null) {
    return res.status(400).json({
      success: false,
      message: 'Student ID must be a positive integer'
    });
  }

  const student = getStudentById(id);

  if (!student) {
    return res.status(404).json({
      success: false,
      message: 'Student not found'
    });
  }

  return res.status(200).json({
    success: true,
    data: student
  });
});

router.post('/', (req, res) => {
  const validationError = validateStudent(req.body);

  if (validationError) {
    return res.status(400).json({
      success: false,
      message: validationError
    });
  }

  const student = addStudent({
    name: req.body.name.trim(),
    course: req.body.course.trim()
  });

  return res.status(201).json({
    success: true,
    message: 'Student created successfully',
    data: student
  });
});

router.put('/:id', (req, res) => {
  const id = parseStudentId(req.params.id);

  if (id === null) {
    return res.status(400).json({
      success: false,
      message: 'Student ID must be a positive integer'
    });
  }

  const validationError = validateStudent(req.body);

  if (validationError) {
    return res.status(400).json({
      success: false,
      message: validationError
    });
  }

  const student = updateStudent(id, {
    name: req.body.name.trim(),
    course: req.body.course.trim()
  });

  if (!student) {
    return res.status(404).json({
      success: false,
      message: 'Student not found'
    });
  }

  return res.status(200).json({
    success: true,
    message: 'Student updated successfully',
    data: student
  });
});

router.delete('/:id', (req, res) => {
  const id = parseStudentId(req.params.id);

  if (id === null) {
    return res.status(400).json({
      success: false,
      message: 'Student ID must be a positive integer'
    });
  }

  const student = deleteStudent(id);

  if (!student) {
    return res.status(404).json({
      success: false,
      message: 'Student not found'
    });
  }

  return res.status(200).json({
    success: true,
    message: 'Student deleted successfully',
    data: student
  });
});

module.exports = router;
