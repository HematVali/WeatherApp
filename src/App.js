// Import statements
import React, { useState } from 'react';
import './App.css';
import DetailedWeather from './components/DetailedWeather';
import HomePage from './components/HomePage';
import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom';

// The react app
const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  // HTML to be displayed. This uses the react-router-dom library in order to handle different pages
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />} />
          <Route path="/detailedWeather" element={<DetailedWeather isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />} />
        </Routes>
      </div>
    </Router>
  );
};


export default App;