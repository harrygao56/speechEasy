import React from 'react';
import './CSS/TotalTime.css';
const TotalTime = () => {
    return (
        <div className="totalTimeBox">
          <label htmlFor="totalTimeBox">Total Time:</label>
          <p className="totalTimeBoxText" id="totalTimeBox">0:00</p>
        </div>
    );
};

export default TotalTime;