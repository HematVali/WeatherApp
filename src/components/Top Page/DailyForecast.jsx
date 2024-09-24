// Import statements
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './DailyForecast.css';

// React component to display the daily weather forecast
const DailyForecast = ({ locationData }) => {
    const [weatherData, setWeatherData] = useState(null);

    // API call to fetch current weather data
    const fetchData1 = useCallback(async () => {
        try {
            const response = await axios.get(
                `http://api.openweathermap.org/data/2.5/forecast/daily?lat=${locationData.lat}&lon=${locationData.lon}&appid=9f2be07e7b4011eaa62f386162fd0236&units=metric&cnt=14`
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

    //Use Effect to fetch data if watherData is null
    useEffect(() => {
        if (!weatherData) {
            fetchData1(); 
        }
    }, [weatherData, locationData, fetchData1]);

    if (!weatherData) {
        return <div>Loading Daily weather data...</div>;
    }

    // Function to get the days of the week
    function getDayOfWeek(timestamp) {
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const date = new Date(timestamp * 1000);    
        return daysOfWeek[date.getDay()];
    }

    // Format and return daily forecast
    const returnDailyForecast = () => {
        const cells = [];
        // creating a for loop to loop for days in a week and adding each entry to the cell to return at the end
        for (let i = 1; i < 8; i++) {
          cells.push(
                <td className="daily-forecast-td">
                    <div className="day">
                        <div>
                            {getDayOfWeek(weatherData.list[i].dt)}
                            <div className="conditions">{weatherData.list[i].weather[0].description}</div>
                        </div>
                        <img className='image' src={`https://openweathermap.org/img/wn/${weatherData.list[i].weather[0].icon}@2x.png`} alt="Weather Icon"/>
                    </div>
                    <div className="daily-temperature">{Math.round(weatherData.list[i].temp.day)}&deg;</div>
                </td>);}
        return cells;};


    // HTML to be displayed
    return (
        <div className="daily-forecast">
            <div className="scrolling-container2">
                <div className="table-wrapper2">
                    <table className="daily-table">
                        <tbody>
                            <tr>
                                {returnDailyForecast()}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default DailyForecast;