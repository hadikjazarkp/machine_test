
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from './DataTable';

const courseOptions = [
  'Computer',
  'Electronics',
  'Mechanical'
];

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [isAdding, setIsAdding] = useState(false); 
  const [isEditing, setIsEditing] = useState(false);
  const [isViewingDetails, setIsViewingDetails] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [newStudent, setNewStudent] = useState({
    first_name: '',
    last_name: '',
    email: '', 
    date_of_birth: '',
    course: 'Computer',
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('All');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('/api/students/');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleAddStudent = async () => {
    try {
      await axios.post('/api/students/', newStudent);
      setIsAdding(false);
      setNewStudent({
        first_name: '',
        last_name: '',
        email: '',
        date_of_birth: '',
        course: 'Computer',
      });
      fetchStudents();
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  const handleEditStudent = async () => {
    try {
      await axios.put(`/api/students/${selectedStudent.id}/`, selectedStudent);
      setIsEditing(false);
      setSelectedStudent(null);
      fetchStudents();
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  const handleDeleteStudent = async (id) => {
    try {
      await axios.delete(`/api/students/${id}/`);
      fetchStudents();
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const openEditModal = async (id) => {
    const student = students.find(s => s.id === id);
    setSelectedStudent(student);
    setIsEditing(true);
  };

  const openDetailsModal = async (id) => {
    const student = students.find(s => s.id === id);
    setSelectedStudent(student);
    setIsViewingDetails(true);
  };

  const filteredStudents = students.filter(student => {
    const matchesName = student.first_name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse = selectedCourse === 'All' || student.course === selectedCourse;
    return matchesName && matchesCourse;
  });

  return (
    <div className="student-list-container">
      <div className="form-container">
        {!isAdding && (
          <button onClick={() => setIsAdding(true)}>Add Student</button>
        )}
        {isAdding && (
          <div className="modal">
            <h2>Add New Student</h2>
            <label>
              First Name:
              <input
                type="text"
                value={newStudent.first_name}
                onChange={(e) => setNewStudent({ ...newStudent, first_name: e.target.value })}
              />
            </label>
            <label>
              Last Name:
              <input
                type="text"
                value={newStudent.last_name}
                onChange={(e) => setNewStudent({ ...newStudent, last_name: e.target.value })}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                value={newStudent.email}
                onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
              />
            </label>
            <label>
              Date of Birth:
              <input
                type="date"
                value={newStudent.date_of_birth}
                onChange={(e) => setNewStudent({ ...newStudent, date_of_birth: e.target.value })}
              />
            </label>
            <label>
              Course:
              <select
                value={newStudent.course}
                onChange={(e) => setNewStudent({ ...newStudent, course: e.target.value })}
              >
                {courseOptions.map((course, index) => (
                  <option key={index} value={course}>
                    {course}
                  </option>
                ))}
              </select>
            </label>
            <button onClick={handleAddStudent}>Submit</button>
            <button onClick={() => setIsAdding(false)}>Cancel</button>
          </div>
        )}
        {isEditing && selectedStudent && (
          <div className="modal">
            <h2>Edit Student</h2>
            <label>
              First Name:
              <input
                type="text"
                value={selectedStudent.first_name}
                onChange={(e) => setSelectedStudent({ ...selectedStudent, first_name: e.target.value })}
              />
            </label>
            <label>
              Last Name:
              <input
                type="text"
                value={selectedStudent.last_name}
                onChange={(e) => setSelectedStudent({ ...selectedStudent, last_name: e.target.value })}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                value={selectedStudent.email}
                onChange={(e) => setSelectedStudent({ ...selectedStudent, email: e.target.value })}
              />
            </label>
            <label>
              Date of Birth:
              <input
                type="date"
                value={selectedStudent.date_of_birth}
                onChange={(e) => setSelectedStudent({ ...selectedStudent, date_of_birth: e.target.value })}
              />
            </label>
            <label>
              Course:
              <select
                value={selectedStudent.course}
                onChange={(e) => setSelectedStudent({ ...selectedStudent, course: e.target.value })}
              >
                {courseOptions.map((course, index) => (
                  <option key={index} value={course}>
                    {course}
                  </option>
                ))}
              </select>
            </label>
            <button onClick={handleEditStudent}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        )}
        {isViewingDetails && selectedStudent && (
          <div className="modal">
            <h2>Student Details</h2>
            <p><strong>First Name:</strong> {selectedStudent.first_name}</p>
            <p><strong>Last Name:</strong> {selectedStudent.last_name}</p>
            <p><strong>Email:</strong> {selectedStudent.email}</p>
            <p><strong>Date of Birth:</strong> {new Date(selectedStudent.date_of_birth).toLocaleDateString()}</p>
            <p><strong>Course:</strong> {selectedStudent.course}</p>
            <p><strong>Age:</strong> {selectedStudent.age}</p>
            <button onClick={() => setIsViewingDetails(false)}>Close</button>
          </div>
        )}
      </div>

      <div className="list-container">
        <h1>Student List</h1>
        <div className="filters">
          <input
            type="text"
            placeholder="Search by First Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="All">All Courses</option>
            {courseOptions.map((course, index) => (
              <option key={index} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>
        <DataTable 
          data={filteredStudents} 
          onEdit={openEditModal} 
          onDelete={handleDeleteStudent} 
          onViewDetails={openDetailsModal} 
        />
      </div>
    </div>
  );
};

export default StudentList;
