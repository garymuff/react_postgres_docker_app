// ClassList.js
import React, { useState, useEffect } from 'react';

function ClassList() {
  const [classes, setClasses] = useState([]);
  const [newClassName, setNewClassName] = useState('');

  const fetchClasses = async () => {
    try {
      const response = await fetch('http://localhost:3001/classes');
      const fetchedClasses = await response.json();
      setClasses(fetchedClasses);
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  const handleCreateClass = async () => {
    if (newClassName) {
      try {
        await fetch('http://localhost:3001/classes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: newClassName }),
        });
        setNewClassName('');
        // Refresh the class list
        fetchClasses();
      } catch (error) {
        console.error('Error creating class:', error);
      }
    }
  };

  const handleDeleteClass = async (classId) => {
    try {
      await fetch(`http://localhost:3001/classes/${classId}`, {
        method: 'DELETE',
      });
      // Refresh the class list
      fetchClasses();
    } catch (error) {
      console.error('Error deleting class:', error);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  return (
    <div className="ClassList">
      <h2>Classes:</h2>
      {/* Form to create a class */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCreateClass();
        }}
      >
        <input
          type="text"
          value={newClassName}
          onChange={(e) => setNewClassName(e.target.value)}
          placeholder="Enter class name"
        />
        <button type="submit">Create Class</button>
      </form>

      {/* List of classes with delete buttons */}
      <ul>
        {classes.map((classItem) => (
          <li key={classItem.id}>
            {classItem.name}
            <button onClick={() => handleDeleteClass(classItem.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClassList;
