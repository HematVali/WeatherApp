// Import statements
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UpcomingEvents.css';

// React component to display upcoming stargazing and astronomy events
const UpcomingEvents = ({ LocationData }) => {
    const [eventsData, setEventsData] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const elevation = ('0'); 
    const time = ('12:00:00'); 

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    //2 constands to get current date up until desired data
    const fromDate = `${year}-${month}-${day}`;
    const toDate = `${year+1}-${month}-${day}`;

    // API call to retrieve data for the events
    const fectchEventsData = async () => {
        try {
            const response = await axios.get(
                `https://api.astronomyapi.com/api/v2/bodies/events/sun?latitude=${LocationData.lat}&longitude=${LocationData.lon}&elevation=${elevation}&from_date=${fromDate}&to_date=${toDate}&time=${time}`,
                { headers: { Authorization: 'Basic ' + btoa('f5b5affe-f455-4d57-bb43-def263c984b3:0c9da751568c0b0b52af602d08b0a45f20561cdfc419c14f36675fe9101e101971dc310a216e61412e9eb3b525d1b971f61a2d6f087268cf0987cdb11e761eb9a4e122280a68bc3fb3fb88208a9dee19c37ed40a66a8d4e58b5b0cbe2ebc3fbc7b87f33d1f8d9e3d50b2ef9f18deb705') } }
            );
            setEventsData(response.data);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    //use effect to fetch the data
    useEffect(() => {
        if (!LocationData) {
            return;
        }
        fectchEventsData();
    }, [LocationData]); 

    if (loading) {
        return <div>Loading weather data...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    // String formatting for different eclipse types
    function formatSolarEclipse(eclipseType) {
        switch (eclipseType) {
            case "total_solar_eclipse":
                return "Total Solar Eclipse";
            case "annular_solar_eclipse":
                return "Annular Solar Eclipse";
            case "partial_solar_eclipse":
                return "Partial Solar Eclipse";
            default:
                return "Invalid eclipse type";
        }
    }

    // Date formatting
    function convertTime(dateTimeString){
        const date = new Date(dateTimeString);
        const monthNumber = date.getMonth();
        const months = ["January", "February", "March", "April", "May", "June", "July","August", "September", "October", "November", "December"];
        const monthName = months[monthNumber];
        const currentDate = `${date.getDate()} ${monthName} ${date.getFullYear()}`;
        return currentDate;}

        // HTML to be displayed
        return (
            <div className="upcoming-events">
                {eventsData.data.table.rows[0] && (
                    <p>{convertTime(eventsData.data.table.rows[0].cells[0].eventHighlights.partialStart.date)} - {formatSolarEclipse(eventsData.data.table.rows[0].cells[0].type)}</p>
                )}
                <hr></hr>
                {eventsData.data.table.rows[1] && (
                    <p>({convertTime(eventsData.data.table.rows[1].cells[0].eventHighlights.partialStart.date)}) - {eventsData.data.table.rows[1].cells[0].type}</p>
                )}
            </div>
        );
}

export default UpcomingEvents;