// Import statements
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './CurrentWeather.css'; 
import ReactCountryFlag from 'react-country-flag';
import {Link} from "react-router-dom"

// React component to display the current weather
const CurrentWeather = ({ locationData }) => {
    const [weatherData, setWeatherData] = useState(null);

    // API call to fetch the current weather data
    const fetchData1 = useCallback(async () => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${locationData.lat}&lon=${locationData.lon}&appid=9f2be07e7b4011eaa62f386162fd0236&units=metric`
            );
            setWeatherData(response.data);
        } catch (error) {
            console.error(error);
        }
    }, [locationData]);

    //Use Effect to fetch the data
    useEffect(() => {
        fetchData1(); 
    }, [locationData, fetchData1]);

    //If weather data is null then fetch data
    useEffect(() => {
        if (!weatherData) {
            fetchData1(); 
        }
    }, [weatherData, locationData, fetchData1]);

    if (!weatherData) {
        return <div>Loading weather data...</div>;
    }

    // HTML to be displayed
    return (
        <div className="current-weather">
            <div className='data'>
                <Link to="../detailedWeather" className='textLink'>
                    <h2>{locationData.name}</h2> 
                    <p1>{locationData.country}</p1><br></br>
                    <p2>{Math.round(weatherData.main.temp)}&deg;</p2> 
                </Link>
            </div>
            <Link to="../detailedWeather"><div className='gradient'></div></Link>
            <div>  
                <ReactCountryFlag countryCode={locationData.country} svg className="flag"/> 
            </div>
        </div>
    );
}

export default CurrentWeather;