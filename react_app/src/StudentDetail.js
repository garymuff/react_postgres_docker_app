import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function StudentDetail() {
  const [student, setStudent] = useState(null);
  const [availableClasses, setAvailableClasses] = useState([]); // New state for available classes
  const [selectedClass, setSelectedClass] = useState(''); // Selected class for enrollment
  const { studentId } = useParams();

  const fetchStudentDetail = async () => {
    try {
      const response = await fetch(`http://localhost:3001/students/${studentId}`);
      const fetchedStudent = await response.json();
      setStudent(fetchedStudent);
    } catch (error) {
      console.error('Error fetching student detail:', error);
    }
  };

  const fetchAvailableClasses = async () => {
    try {
      const response = await fetch('http://localhost:3001/classes');
      const fetchedClasses = await response.json();
      setAvailableClasses(fetchedClasses);
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  useEffect(() => {
    fetchStudentDetail();
    fetchAvailableClasses(); // Fetch available classes
  }, [studentId]);

  const handleEnroll = async () => {
    if (selectedClass) {
      try {
        await fetch(`http://localhost:3001/students/${studentId}/enroll`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ classId: selectedClass }),
        });

        // Refresh student detail and available classes
        fetchStudentDetail();
        fetchAvailableClasses();
      } catch (error) {
        console.error('Error enrolling student:', error);
      }
    }
  };

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

          {/* Dropdown for available classes */}
          <h3>Enroll in a Class:</h3>
          <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
            <option value="">Select a class</option>
            {availableClasses.map((classItem) => (
              <option key={classItem.id} value={classItem.id}>
                {classItem.name}
              </option>
            ))}
          </select>
          <button onClick={handleEnroll}>Enroll</button>
        </>
      )}
    </div>
  );
}

export default StudentDetail;
