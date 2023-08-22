import React, { useState, useEffect } from 'react';

function StudentList() {
  const [students, setStudents] = useState([]);
  const [newStudentName, setNewStudentName] = useState('');

  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:3001/students'); // Replace with your server URL
      const fetchedStudents = await response.json();
      setStudents(fetchedStudents);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleCreateStudent = async () => {
    if (newStudentName) {
      try {
        await fetch('http://localhost:3001/students', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: newStudentName }),
        });
        setNewStudentName('');
        // Refresh the student list
        fetchStudents();
      } catch (error) {
        console.error('Error creating student:', error);
      }
    }
  };

  const handleDeleteStudent = async (studentId) => {
    try {
      await fetch(`http://localhost:3001/students/${studentId}`, {
        method: 'DELETE',
      });
      // Refresh the student list
      fetchStudents();
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="App">
      {/* Form to create a student */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCreateStudent();
        }}
      >
        <input
          type="text"
          value={newStudentName}
          onChange={(e) => setNewStudentName(e.target.value)}
          placeholder="Enter student name"
        />
        <button type="submit">Create Student</button>
      </form>

      {/* List of students with delete buttons */}
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            {student.name}
            <button onClick={() => handleDeleteStudent(student.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentList;

