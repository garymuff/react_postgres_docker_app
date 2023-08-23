// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StudentList from './StudentList';
import ClassList from './ClassList';
import ClassDetail from './ClassDetail';
import StudentDetail from './StudentDetail';

const modes = {
  STUDENT_LIST: 'studentList',
  CLASS_LIST: 'classList',
};

function AppWrapper() {
    const [currentMode, setCurrentMode] = useState(modes.STUDENT_LIST);
  
    const handleTabClick = (mode) => {
      setCurrentMode(mode);
    };
  
    return (
      <div>
        <div className="tabs">
          <button
            className={currentMode === modes.STUDENT_LIST ? 'active' : ''}
            onClick={() => handleTabClick(modes.STUDENT_LIST)}
          >
            Student List
          </button>
          <button
            className={currentMode === modes.CLASS_LIST ? 'active' : ''}
            onClick={() => handleTabClick(modes.CLASS_LIST)}
          >
            Class List
          </button>
        </div>
        <div className="content">
          {currentMode === modes.STUDENT_LIST && <StudentList />}
          {currentMode === modes.CLASS_LIST && <ClassList />}
        </div>
      </div>
    );
  }

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppWrapper />} />
        <Route path="/view-classes/:studentId" element={<StudentDetail />} />
        <Route path="/view-students/:classId" element={<ClassDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
