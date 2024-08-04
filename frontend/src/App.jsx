
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import StudentList from './StudentList';
import StudentDetails from './StudentDetails';
import UpdateStudent from './UpdateStudent'; 

const App = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/students" />} />
    <Route path="/students" element={<StudentList />} />
    <Route path="/students/:id" element={<StudentDetails />} />
    <Route path="/students/:id/edit" element={<UpdateStudent />} /> {}
  </Routes>
);

export default App;
