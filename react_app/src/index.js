// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import ClassList from './ClassList';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//     <ClassList></ClassList>
//   </React.StrictMode>
// );
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ClassList from './ClassList';
import reportWebVitals from './reportWebVitals';

const modes = {
  APP: 'app',
  CLASS_LIST: 'classList',
};

function AppWrapper() {
  const [currentMode, setCurrentMode] = useState(modes.APP);

  const handleTabClick = (mode) => {
    setCurrentMode(mode);
  };

  return (
    <div>
      <div className="tabs">
        <button
          className={currentMode === modes.APP ? 'active' : ''}
          onClick={() => handleTabClick(modes.APP)}
        >
          App
        </button>
        <button
          className={currentMode === modes.CLASS_LIST ? 'active' : ''}
          onClick={() => handleTabClick(modes.CLASS_LIST)}
        >
          Class List
        </button>
      </div>
      <div className="content">
        {currentMode === modes.APP && <App />}
        {currentMode === modes.CLASS_LIST && <ClassList />}
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
