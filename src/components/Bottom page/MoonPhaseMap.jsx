// Import Statements
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MoonPhaseMap.css'; 

// React Component to display the current phase of the moon
const MoonPhaseMap = ({ LocationData }) => {
    const [moonPhase, setMoonPhase] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    const stringDate = `${year}-${month}-${day}`;

    // Function for the API call to retrieve current phase of the moon
    const fetchMoonPhase = async () => {
        try {
            const requestBody = {
                format: "png",
                style: {
                    "moonStyle": "sketch",
                    "backgroundStyle": "stars",
                    "backgroundColor": "white",
                    "headingColor": "white",
                    "textColor": "red"
                },
                observer: {
                    latitude: LocationData.lat,
                    longitude: LocationData.lon,
                    date: stringDate
                },
                view: {
                    type: "landscape-simple",
                    orientation: "south-up"
                }
            };
    
            const response = await axios.post(
                'https://api.astronomyapi.com/api/v2/studio/moon-phase',
                requestBody,
                { headers: { Authorization: 'Basic ' + btoa('f5b5affe-f455-4d57-bb43-def263c984b3:0c9da751568c0b0b52af602d08b0a45f20561cdfc419c14f36675fe9101e101971dc310a216e61412e9eb3b525d1b971f61a2d6f087268cf0987cdb11e761eb9a4e122280a68bc3fb3fb88208a9dee19c37ed40a66a8d4e58b5b0cbe2ebc3fbc7b87f33d1f8d9e3d50b2ef9f18deb705') } }    
            );
    
            setMoonPhase(response.data);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            console.log(error.message)
            setLoading(false);
        }
    };

    //Use Effect to call the techMoonPhase to get the data
    useEffect(() => {
        if (!LocationData) {
            return;
        }
        fetchMoonPhase();
    }, [LocationData]); 

    if (loading) {
        return <div>Loading weather data...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    // HTML to be displayed
    return (
        <div className="moon-phase-img-container">
            <div className="moon-phase-img-alert-container">
                <div className="moon-phase-img-alert-title-container">
                    <h3>Moon Phase Image:</h3>
                </div>
                <div className="moon-phase-img-alert-text">
                    <p>You are able to see the Moon Phase including: rise and set times. This image is generated with the Graphite style</p>
                </div>
            </div>
            {/* gets the generated data from the URL*/}
            <img className="moonPhase" src={moonPhase.data.imageUrl} alt="Moon Phase" />
            <div className="moon-phase-img-alert-container">
                <div className="moon-phase-img-alert-title-container">
                    <h3>Location Details:</h3>
                </div>
                {/* printing out current location data */}
                <div className="moon-phase-img-alert-text">
                    <p>
                        Name: {LocationData.name}<br/>
                        Longitude: {LocationData.lon}<br/>
                        Latitude: {LocationData.lat}<br/>
                    </p>
                </div>
            </div>
        
  </div>
    );
};

export default MoonPhaseMap;