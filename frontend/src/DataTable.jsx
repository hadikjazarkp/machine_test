// // // src/DataTable.js

// // Existing imports
// import React, { useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const DataTable = ({ data, onEdit, onDelete, onViewDetails }) => {
//   const tableRef = useRef();
//   const navigate = useNavigate();  

//   useEffect(() => {
//     const table = $(tableRef.current).DataTable({
//       destroy: true,
//       data: data,
//       columns: [
//         { title: "First Name", data: "first_name" },
//         { title: "Last Name", data: "last_name" },
//         { title: "Email", data: "email" },
//         { title: "DOB", data: "date_of_birth" },
//         { title: "Course", data: "course" },
//         {
//           title: "Actions",
//           data: null,
//           render: (data) => {
//             return `
//               <button class="edit-btn" data-id="${data.id}">Edit</button>
//               <button class="delete-btn" data-id="${data.id}">Delete</button>
//               <button class="details-btn" data-id="${data.id}">Details</button>
//             `;
//           }
//         }
//       ]
//     });

//     $(tableRef.current).on('click', '.edit-btn', function() {
//       const id = $(this).data('id');
//       navigate(`/students/${id}/edit`);
//     });

//     $(tableRef.current).on('click', '.delete-btn', async function() {
//       const id = $(this).data('id');
//       onDelete(id);
//     });

//     $(tableRef.current).on('click', '.details-btn', function() {
//       const id = $(this).data('id');
//       navigate(`/students/${id}`);
//     });

//     return () => {
//       table.destroy();
//     };
//   }, [data, onEdit, onDelete, onViewDetails, navigate]);

//   return (
//     <table ref={tableRef} className="display">
//       <thead>
//         <tr>
//           <th>First Name</th>
//           <th>Last Name</th>
//           <th>Email</th>
//           <th>DOB</th>
//           <th>Course</th>
//           <th>Actions</th>
//         </tr>
//       </thead>
//       <tbody />
//     </table>
//   );
// };

// export default DataTable;

// src/DataTable.js

import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DataTable = ({ data, onEdit, onDelete, onViewDetails }) => {
  const tableRef = useRef();
  const navigate = useNavigate();  

  useEffect(() => {
    const table = $(tableRef.current).DataTable({
      destroy: true,
      data: data,
      searching: false, // Disable the search box
      paging: true, // Enable pagination if needed
      info: false, // Disable table information (like "Showing 1 to 10 of 57 entries")
      columns: [
        { title: "First Name", data: "first_name" },
        { title: "Last Name", data: "last_name" },
        { title: "Email", data: "email" },
        { title: "DOB", data: "date_of_birth" },
        { title: "Course", data: "course" },
        {
          title: "Actions",
          data: null,
          render: (data) => {
            return `
              <button class="edit-btn" data-id="${data.id}">Edit</button>
              <button class="delete-btn" data-id="${data.id}">Delete</button>
              <button class="details-btn" data-id="${data.id}">Details</button>
            `;
          }
        }
      ]
    });

    $(tableRef.current).on('click', '.edit-btn', function() {
      const id = $(this).data('id');
      navigate(`/students/${id}/edit`);
    });

    $(tableRef.current).on('click', '.delete-btn', async function() {
      const id = $(this).data('id');
      onDelete(id);
    });

    $(tableRef.current).on('click', '.details-btn', function() {
      const id = $(this).data('id');
      navigate(`/students/${id}`);
    });

    return () => {
      table.destroy();
    };
  }, [data, onEdit, onDelete, onViewDetails, navigate]);

  return (
    <table ref={tableRef} className="display">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>DOB</th>
          <th>Course</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody />
    </table>
  );
};

export default DataTable;

