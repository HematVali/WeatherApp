//Import statements
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BodyPositions.css'; 

//React Component to display position of celestial bodies
const BodyPositions = ({ LocationData }) => {
    const [bodyPositions, setBodyPositions] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const elevation = ('0'); 
    const time = ('12:00:00'); 

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const nextmonth = String(currentDate.getMonth() + 2).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    const formattedCurrentDate = `${year}-${month}-${day}`;
    const toDate = `${year}-${nextmonth}-${day}`;

    //Function to output the relevant information recieved from API
    const renderBodyPositions = (bodyPositions) => {
        return (
            <div className="body-positions-container">
                <div>
                    <h2>Body Positions</h2>
                </div>
                <p>Body , Constellation , RightAscension , Declination , Horizonal</p>
                
                {/* Map loop used to show the desired information */}
                {bodyPositions.data.table.rows.map((row, index) => (
                    <p key={index}>
                        {row.entry.name} , {row.cells[0].position.constellation.name} , {row.cells[0].position.equatorial.rightAscension.string} , {row.cells[0].position.equatorial.declination.degrees} , {row.cells[0].position.horizonal.altitude.degrees}
                    </p>
                ))}
            </div>
        );
    };

    //API call to fetch position of celestial bodies
    const FetchBodyPositions = async () => {
        try {
            const response = await axios.get(
                `https://api.astronomyapi.com/api/v2/bodies/positions?latitude=${LocationData.lat}&longitude=${LocationData.lon}&elevation=${elevation}&from_date=${formattedCurrentDate}&to_date=${toDate}&time=${time}`,
                { headers: { Authorization: 'Basic ' + btoa('f5b5affe-f455-4d57-bb43-def263c984b3:0c9da751568c0b0b52af602d08b0a45f20561cdfc419c14f36675fe9101e101971dc310a216e61412e9eb3b525d1b971f61a2d6f087268cf0987cdb11e761eb9a4e122280a68bc3fb3fb88208a9dee19c37ed40a66a8d4e58b5b0cbe2ebc3fbc7b87f33d1f8d9e3d50b2ef9f18deb705') } }    
            );
    
            setBodyPositions(response.data);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    //use effect to call the initial Data
    useEffect(() => {
        if (!LocationData) {
            return;
        }
        FetchBodyPositions();
    }, [LocationData]); 

    if (loading) {
        return <div>Loading weather data...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (renderBodyPositions(bodyPositions));
};
export default BodyPositions;