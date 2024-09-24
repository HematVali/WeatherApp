// Import statements
import React, { useState} from 'react';
import './HomePage.css';
import TopHalf_Weather from './Top Page/TopHalf_Weather';
import BottomHalf_Stargazing from './Bottom page/BottomHalf_Stargazing';

// React component to display the Homepage
const HomePage = ({ isDarkMode, toggleDarkMode }) => {
 const [LocationData, setLocationData] = useState(null); 
  

  // HTML to be displayed
  return (
    <div className={`mainbody ${isDarkMode ? 'dark-mode' : ''}`}>
      {/* Calling the top and bottom react components, which form the web page */}
      <TopHalf_Weather LocationData={LocationData} setLocationData={setLocationData} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <BottomHalf_Stargazing LocationData={LocationData} setLocationData={setLocationData} />
    </div>
  );
}

export default HomePage;