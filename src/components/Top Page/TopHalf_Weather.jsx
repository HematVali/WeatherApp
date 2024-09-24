// Import statements
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './TopHalf_Weather.css';
import Header from './Header';
import CurrentWeather from './CurrentWeather';
import HourlyForecast from './HourlyForecast';
import DailyForecast from './DailyForecast';

// React component to display the standard weather information (top half)
const TopHalf_Weather = ({ LocationData, setLocationData, isDarkMode, toggleDarkMode }) => {
    const [location, setLocation] = useState('London');

    // API call to fetch current weather data
    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get(
                `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=9f2be07e7b4011eaa62f386162fd0236`
            );
            setLocationData(response.data[0]);
        } catch (error) {
            console.error(error);
        }
    }, [location]); 

    //Use Effect to get the weather data
    useEffect(() => {
        if (!LocationData) {
            fetchData();
        }
    }, [location, fetchData]);

    //This will update the Location based on given input
    const handleInputChange = (e) => {
        setLocation(e.target.value);
    };

    //It will fetch new weather data when the form is submitted
    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetchData();
    };

    // HTML to be displayed
    return (
        <div className={`weather ${isDarkMode ? 'dark-mode' : ''}`}>
            <Header 
              location={location}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              isDarkMode={isDarkMode} 
              toggleDarkMode={toggleDarkMode}
            />
            {LocationData && <div className="main-content">
                <CurrentWeather locationData={LocationData}/>
                <HourlyForecast locationData={LocationData}/>
                <DailyForecast locationData={LocationData}/>
            </div>}
        </div>
    )
}

export default TopHalf_Weather;