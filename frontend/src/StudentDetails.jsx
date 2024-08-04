// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const StudentDetails = () => {
//   const { id } = useParams();
//   const [student, setStudent] = useState(null);

//   useEffect(() => {
//     const fetchStudent = async () => {
//       try {
//         const response = await axios.get(`/api/students/${id}/`);
//         setStudent(response.data);
//       } catch (error) {
//         console.error('Error fetching student details:', error);
//       }
//     };

//     fetchStudent();
//   }, [id]);

//   if (!student) return <div>Loading...</div>;

//   return (
//     <div>
//       <h1>Student Details</h1>
//       <p><strong>First Name:</strong> {student.first_name}</p>
//       <p><strong>Last Name:</strong> {student.last_name}</p>
//       <p><strong>Email:</strong> {student.email}</p>
//       <p><strong>Date of Birth:</strong> {new Date(student.date_of_birth).toLocaleDateString()}</p>
//       <p><strong>Course:</strong> {student.course}</p>
//       <p><strong>Age:</strong> {student.age}</p>
//     </div>
//   );
// };

// export default StudentDetails;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './StudentDetails.css'; // Import custom styles

const StudentDetails = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`/api/students/${id}/`);
        setStudent(response.data);
      } catch (error) {
        console.error('Error fetching student details:', error);
      }
    };

    fetchStudent();
  }, [id]);

  if (!student) return <div>Loading...</div>;

  return (
    <div className="student-details-container">
      <h1>Student Details</h1>
      <div className="student-details-box">
        <p><strong>First Name:</strong> {student.first_name}</p>
        <p><strong>Last Name:</strong> {student.last_name}</p>
        <p><strong>Email:</strong> {student.email}</p>
        <p><strong>Date of Birth:</strong> {new Date(student.date_of_birth).toLocaleDateString()}</p>
        <p><strong>Course:</strong> {student.course}</p>
        <p><strong>Age:</strong> {student.age}</p>
      </div>
    </div>
  );
};

export default StudentDetails;
