import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams from react-router-dom

function ClassDetail() {
  const [classDetail, setClassDetail] = useState(null);
  const { classId } = useParams(); // Get the classId from the URL parameter

  const fetchClassDetail = async () => {
    try {
      const response = await fetch(`http://localhost:3001/classes/${classId}`);
      const fetchedClass = await response.json();
      setClassDetail(fetchedClass);
    } catch (error) {
      console.error('Error fetching class detail:', error);
    }
  };

  useEffect(() => {
    fetchClassDetail();
  }, [classId]); // Fetch class detail whenever classId changes

  return (
    <div className="ClassDetail">
      {classDetail && (
        <>
          <h2>Class Detail</h2>
          <p>Name: {classDetail.name}</p>
          <h3>Students Enrolled:</h3>
          <ul>
            {classDetail.students.map((student) => (
              <li key={student.id}>{student.name}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default ClassDetail;
