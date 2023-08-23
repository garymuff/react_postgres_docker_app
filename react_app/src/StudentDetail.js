import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams from react-router-dom

function StudentDetail() {
  const [student, setStudent] = useState(null);
  const { studentId } = useParams(); // Get the studentId from the URL parameter

  const fetchStudentDetail = async () => {
    try {
      const response = await fetch(`http://localhost:3001/students/${studentId}`);
      const fetchedStudent = await response.json();
      setStudent(fetchedStudent);
    } catch (error) {
      console.error('Error fetching student detail:', error);
    }
  };

  useEffect(() => {
    fetchStudentDetail();
  }, [studentId]); // Fetch student detail whenever studentId changes

  return (
    <div className="StudentDetail">
      {student && (
        <>
          <h2>Student Detail</h2>
          <p>Name: {student.name}</p>
          <h3>Classes Enrolled:</h3>
          <ul>
            {student.classes.map((classItem) => (
              <li key={classItem.id}>{classItem.name}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default StudentDetail;
