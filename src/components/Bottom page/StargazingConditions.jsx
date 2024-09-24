// Import statements
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './StargazingConditions.css';
import PoorCondition from "./img/PoorCondition.png"
import ExcellentCondition from "./img/ExcellentCondition.png"
import GoodConditionCondition from "./img/GoodCondition.png"
import FairCondition from "./img/FairCondition.png"

// React component to display the current stargazing conditions
const StargazingConditions = ({ LocationData }) => {
    const [weatherData, setWeatherData] = useState(null);

    // API call to retrieve current weather data
    const fetchWeatherData = useCallback(async () => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${LocationData.lat}&lon=${LocationData.lon}&appid=9f2be07e7b4011eaa62f386162fd0236&units=metric`
            );
            setWeatherData(response.data);
        } catch (error) {
            console.error(error);
        }
    }, [LocationData]);

    //Use Effect to get the weatherData
    useEffect(() => {
        if (!LocationData) {
            return;
        }
        fetchWeatherData(); 
    }, [LocationData, fetchWeatherData]);

    //If weather data at any point is null then fetch weatherData
    useEffect(() => {
        if (!weatherData) {
            fetchWeatherData(); 
        }
    }, [weatherData, LocationData, fetchWeatherData]);

    if (!weatherData) {
        return <div>Loading weather data...</div>;
    }

    // Function to determine the current conditions for stargazing, calculated by cloud coverage
    function getStargazingCondition(cloudPercentage) {
        if (cloudPercentage >= 0 && cloudPercentage <= 25) {
            return (  
                <div className="stargazing-conditions-content">
                    <img className="condition-img" src={ExcellentCondition}></img>           
                    <div className="stargazing-conditions-text">
                        <p>Excellent Conditions: The cloud cover is {cloudPercentage}. The night sky will be fully visable</p>
                    </div>
                </div>);

        } else if (cloudPercentage > 25 && cloudPercentage <= 50) {
            return (  
                <div className="stargazing-conditions-content">
                    <img className="condition-img" src={GoodConditionCondition}></img>           
                    <div className="stargazing-conditions-text">
                        <p>Good Condition: The cloud cover is {cloudPercentage}. The night sky is mostly visable</p>
                    </div>
                </div>);
        } else if (cloudPercentage > 50 && cloudPercentage <= 75) {
            return (  
                <div className="stargazing-conditions-content">
                    <img className="condition-img" src={FairCondition}></img>        
                    <div className="stargazing-conditions-text">
                        <p>Fair Condition: The cloud cover is {cloudPercentage}. The night sky not fully be visable</p>
                    </div>
                </div>);
        } else if (cloudPercentage > 75 && cloudPercentage <= 100) {
            return (  
                <div className="stargazing-conditions-content">
                    <img className="condition-img" src={PoorCondition}></img>            
                    <div className="stargazing-conditions-text">
                        <p>Poor Condition: The cloud cover is {cloudPercentage}. The night sky will not be fully visable</p>
                    </div>
                </div>);
        } else {
            return "Unknown";
        }
    }

    // HTML to be displayed
    return (
        <div className="stargazing-conditions">
            <h3>Stargazing Conditions:</h3>
            {getStargazingCondition(weatherData.clouds.all)}
        </div>
    );
}

export default StargazingConditions;