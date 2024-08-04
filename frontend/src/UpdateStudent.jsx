// src/UpdateStudent.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const courseOptions = [
  'Computer',
  'Electronics',
  'Mechanical'
];

const UpdateStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    first_name: '',
    last_name: '',
    email: '',
    date_of_birth: '',
    course: 'Computer',
  });

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`/api/students/${id}/`);
        setStudent(response.data);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchStudent();
  }, [id]);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/api/students/${id}/`, student);
      navigate('/students'); 
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  return (
    <div className="modal">
      <h2>Update Student</h2>
      <label>
        First Name:
        <input
          type="text"
          name="first_name"
          value={student.first_name}
          onChange={handleChange}
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          name="last_name"
          value={student.last_name}
          onChange={handleChange}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={student.email}
          onChange={handleChange}
        />
      </label>
      <label>
        Date of Birth:
        <input
          type="date"
          name="date_of_birth"
          value={student.date_of_birth}
          onChange={handleChange}
        />
      </label>
      <label>
        Course:
        <select
          name="course"
          value={student.course}
          onChange={handleChange}
        >
          {courseOptions.map((course, index) => (
            <option key={index} value={course}>
              {course}
            </option>
          ))}
        </select>
      </label>
      <button onClick={handleUpdate}>Save</button>
      <button onClick={() => navigate('/students')}>Cancel</button>
    </div>
  );
};

export default UpdateStudent;
