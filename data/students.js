const students = [
  { id: 1, name: 'Rahul', course: 'BCA' },
  { id: 2, name: 'Priya', course: 'BTech' },
  { id: 3, name: 'Amit', course: 'BCA' }
];

let nextId = students.reduce((highestId, student) => Math.max(highestId, student.id), 0) + 1;

const getAllStudents = () => students;

const getStudentById = (id) => students.find((student) => student.id === id);

const addStudent = ({ name, course }) => {
  const student = { id: nextId++, name, course };
  students.push(student);
  return student;
};

const updateStudent = (id, { name, course }) => {
  const student = getStudentById(id);

  if (!student) {
    return null;
  }

  student.name = name;
  student.course = course;
  return student;
};

const deleteStudent = (id) => {
  const index = students.findIndex((student) => student.id === id);

  if (index === -1) {
    return null;
  }

  return students.splice(index, 1)[0];
};

module.exports = {
  getAllStudents,
  getStudentById,
  addStudent,
  updateStudent,
  deleteStudent
};
