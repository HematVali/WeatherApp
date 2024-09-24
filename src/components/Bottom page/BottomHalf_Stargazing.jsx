// Import statements
import React from 'react';
import './BottomHalf_Stargazing.css';
import UpcomingEvents from './UpcomingEvents';
import StargazingConditions from './StargazingConditions';
import MoonPhaseMap from './MoonPhaseMap';
import BodyPositions from './BodyPositions';

// React Component for the stargazing section of the homepage (bottom half)
const BottomHalf_Stargazing = ({LocationData}) => {
    return (
        <div className="stargazing-container">
            <div className="upcoming-events-title">
                <h2 className="upcoming-events-h2">Upcoming Events: </h2>
            </div>
            {/* Calling relevant react components to be displayed in the stargazing section passing in locationData */}
            <UpcomingEvents LocationData={LocationData}/>
            <StargazingConditions LocationData={LocationData}/>
            <MoonPhaseMap LocationData={LocationData}/>
            <BodyPositions LocationData={LocationData}/>
        </div>
    );
}

export default BottomHalf_Stargazing;