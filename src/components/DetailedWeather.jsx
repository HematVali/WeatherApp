// Import statements
import React, { useState, useEffect, useCallback } from 'react';
import './DetailedWeather.css';
import axios from 'axios';
import Header from './Top Page/Header'
import HourlyForecast from './Top Page/HourlyForecast';
import {useNavigate} from "react-router-dom";
import backButtonImage from '../back-button.svg';
import sunset from "./Bottom page/img/sunset.png";
import sunrise from "./Bottom page/img/sunrise.png";

// React component to display detailed weather information. This is a different page and is displayed upon clicking the currentweather component on the homepage
const DetailedWeather = ({ isDarkMode, toggleDarkMode }) => {
    const [location, setLocation] = useState('London');
    const [LocationData, setLocationData] = useState(null);
    const [weatherData, setWeatherData] = useState(null);
    const navigate = useNavigate();

    // API call to fetch current weather data
    const fetchData = useCallback(async () => {
        try {
            const locationResponse = await axios.get(
                `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=9f2be07e7b4011eaa62f386162fd0236`
            );
            const locationData = locationResponse.data[0];
            setLocationData(locationData);

            const weatherResponse = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${locationData.lat}&lon=${locationData.lon}&appid=9f2be07e7b4011eaa62f386162fd0236&units=metric`
            )
            setWeatherData(weatherResponse.data);
            console.log(weatherResponse.data)
        } catch (error) {
            console.error(error);
        }
    }, [location]); 

    //Use effect to fetch the data
    useEffect(() => {
        if (!LocationData || !weatherData) {
            fetchData();
        }
    }, [location, LocationData, weatherData, fetchData]);

    //This will update the Location based on given input
    const handleInputChange = (e) => {
        setLocation(e.target.value);
    };

    //It will fetch new weather data when the form is submitted
    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetchData();
    };

    // Function to determine whether or not the "feels like" temperature is close to the actual temperature
    function TemperatureDescription({ actualTemperature, feelLikeTemperature }) {   
        let description     
        if ((Math.abs(actualTemperature - feelLikeTemperature)) < 5) {
            description = "Close to actual temperature";
        } else {
            description = "Not close to actual temperature";
        }
        
        return (
            <p3 className="feels-like-description">{description}</p3>
        );
    }

    // Function to determine whether there is a high or low level of visibility
    function VisibilityDescription({ Visibility }) {       
        let description  
        if (Visibility > 9000) {
            description = "High Level of Visibility";
        } else if (Visibility < 1000) {
            description = "Low Visibility please be cautious outside";
        } else{
            description = "Average Visibility" 
            }
        
        return (
            <p3 class="visibility-description">{description}</p3>
        );
    }

    // Function to convert time for sunrise
    function ConvertTime({ time }) {
        var sunriseDate = new Date(time * 1000);
        var hours = sunriseDate.getHours();
        var minutes = sunriseDate.getMinutes();
        var seconds = sunriseDate.getSeconds();
    
        var timeStr = hours + ':' + minutes + ':' + seconds;
    
        return <span>{timeStr}</span>;
    }

    if (!weatherData || !LocationData) {
        return null;
    }

    // HTML to be returned, with React components called where applicable
    return (
        <div className={`detailed-weather ${isDarkMode ? 'dark-mode' : ''}`}>
            <div className="detailed-weather-main">
                <button onClick={() => navigate(-1)} className="back-button">
                    <img src={backButtonImage} className="back-button-image" />
                </button>
                {/* below is the header that has the searchbar and darkmode buttom */}
                <Header 
                location={location}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                isDarkMode={isDarkMode} 
                toggleDarkMode={toggleDarkMode}
                />
                
                {/* weatherdata on the top of the screen */}
                <div className="detailed-weather-body">
                    <div className='weather-overview-container'>
                        <h2>{LocationData.name}</h2>
                        <p1>{LocationData.country}</p1>
                        <p2>{Math.round(weatherData.main.temp)}&deg;</p2>
                    </div>

                    {/* shows hourly forecast calling the react component */}
                    <div className="hourly-forecast-component">
                        <HourlyForecast locationData={LocationData} className="hourly-weather-container" />
                    </div>

                    {/* shows atmospheric pressure */}
                    <div className="atmospheric-pressure-container">
                        <h1>Atmospheric pressure:</h1>
                        <div className="atmospheric-pressure-grid">
                            <div className="atmospheric-pressure-data">
                                <h2>{weatherData.main.pressure} hPa</h2>
                                <h4 id="atmospheric-pressure-descriptor"></h4>
                            </div>
                            <div className="atmospheric-pressure-info">
                                <p3>This is the  Atmospheric pressure at sea level. Mesured in hPa</p3>
                            </div>
                        </div>
                    </div>

                    {/* div to show data about sunrise and sunset using the fetched weatherData */}
                    <div className="sun-container">
                        <h2>Sun Rise/Set:</h2>
                        <div className="sun-flex">
                            <div className='sun-mini'>
                                <h2><ConvertTime time={weatherData.sys.sunrise}/></h2>
                                <img className='sun-img' src={sunset}/>
                            </div>
                            <div className='sun-mini'>
                                <h2><ConvertTime time={weatherData.sys.sunset}/></h2>
                                <img className='sun-img' src={sunset}/>
                            </div>
                        </div>
                    </div>

                    {/* shows the wind speed and direction using fetched weatherData */}
                    <div className="wind-container">
                        <h1>Wind:</h1>
                        <div className="wind-speed-container">
                                <h2 className="wind-speed-data">{weatherData.wind.speed}</h2>
                                <p1 className="wind-speed-units">MPS</p1>
                                <p1 className="wind-speed-label">Wind</p1>
                        </div>
                        <hr/>
                        <div className="gust-speed-container">
                                <h2 className="gust-speed-data">{weatherData.wind.deg}</h2>
                                <p1 className="gust-speed-units">&deg;</p1>
                                <p1 className="gust-speed-label">Wind Direction</p1>
                        </div>
                    </div>

                    {/* shows min/max temprature of the day using weatherdata */}
                    <div className="mm-index-container">
                        <h1>Max-Min temprature:</h1>
                        <p1 className="mm-fontsize">{weatherData.main.temp_max} - {weatherData.main.temp_min}</p1>
                        <p3 class="mm-index-description">Here you can see the max and min temprature of today</p3>
                    </div>

                    {/* shows the fell like temprature using weatherData */}
                    <div className="feels-like-container">
                        <h1>Feels Like:</h1>
                                <h2>{weatherData.main.feels_like}&deg;</h2>
                                <TemperatureDescription actualTemperature={weatherData.main.temp} feelLikeTemperature={weatherData.main.feels_like} />
                    </div>

                    {/* shows the visibility using weatherData */}
                    <div className="visibility-container">
                        <h1>Visibility:</h1>
                            <h2>{weatherData.visibility}m</h2>
                            <VisibilityDescription Visibility={weatherData.visibility}/>
                    </div>

                    {/* shows the humidity using weatherData */}
                    <div className="humidity-container">
                        <h1>Humidity:</h1>
                            <h2>{weatherData.main.humidity}%</h2>
                        <p3 className="humidity-description">The dew point is 8째 right now</p3>
                    </div>

                </div>
            </div>
        </div>

    )
}

export default DetailedWeather;