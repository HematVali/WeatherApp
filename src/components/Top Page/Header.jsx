// Import statements
import React from 'react';
import './Header.css';
import Searchbar from './SearchBar';
import Toggle from 'react-toggle';
import "react-toggle/style.css"; 

// React component to display the header and header components
const Header = ({ city, handleInputChange, handleSubmit, toggleDarkMode, isDarkMode }) => {
  return (
    <div className="header">
        <div className="title-section">
            <h1 className="dateTitle" id="Title">Weather Forecast</h1>
            <div className="dateTitle" id="Date">{new Date().toDateString()}</div>
        </div>
        <div className="controls">
            <div className="dark-mode-label">
                <label htmlFor="dark-mode-toggle">Dark Mode</label>
            </div>
            {/* toggles between darkmode and light mode by using these variables */}
            <Toggle
                id="dark-mode-toggle" 
                className="dark-mode-toggle"
                checked={isDarkMode}
                onChange={toggleDarkMode}
                icons={false} 
            />
            {/* calls the Searchbar to handle the input */}
            <Searchbar city={city} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
        </div>
    </div>
  );
}

export default Header;