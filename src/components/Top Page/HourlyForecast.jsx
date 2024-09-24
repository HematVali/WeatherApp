// Import statements
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './HourlyForecast.css'; 

// React component to display the hourly weather forecast
const HourlyForecast = ({ locationData }) => {
    const [weatherData, setWeatherData] = useState(null);

    // API call to fetch current weather data
    const fetchData1 = useCallback(async () => {
        try {
            const response = await axios.get(
                `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${locationData.lat}&lon=${locationData.lon}&appid=9f2be07e7b4011eaa62f386162fd0236&units=metric&cnt=25`
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

    //If weatherData is null then data is fetched
    useEffect(() => {
        if (!weatherData) {
            fetchData1(); 
        }
    }, [weatherData, locationData, fetchData1]);

    if (!weatherData) {
        return <div>Loading Hourly Weather data...</div>;
    }

    //converts text to hour
    function getHour(dt_txt) {
        const date = new Date(dt_txt);
        const hour = date.getHours();
        return hour;
    }

    // Format and return hourly forecast
    const returnHourlyForecast = () => {
        const cells = [];
        // creating a for loop to loop for hours in a day and adding each entry to the cell to return at the end
        for (let i = 0; i < 25; i++) {
          cells.push(
            <td className="hourly-forecast-td">
                <div className="hourly-data">{getHour(weatherData.list[i].dt_txt)}</div>
                <div className="hourly-data">
                        <img className="image-hourly" src={`https://openweathermap.org/img/wn/${weatherData.list[i].weather[0].icon}@2x.png`}/>
                    </div>
                <div className="hourly-data">{Math.round(weatherData.list[i].main.temp)}&deg;</div>
            </td>
          );
        }
        return cells;};

    // HTML to be displayed
    return (
        <div className="hourly-forecast">
            <div className="scrolling-container">
                <div className="table-wrapper">
                    <table>
                        <tbody>
                            <tr>{returnHourlyForecast()}</tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default HourlyForecast;