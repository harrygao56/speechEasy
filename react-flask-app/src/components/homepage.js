
import React from 'react';
import './CSS/homepage.css';
import {useState} from 'react';
import { useMyPointsContext } from '../pointscontext';
import { Link } from 'react-router-dom';

function HomePage () {
    const [ points, setPoints ] = useMyPointsContext();
    const [totalTime, setTotalTime] = useState('0:00');
    
    const handlePointChange = (index, value) => {
        const updatedPoints = [...points];
        updatedPoints[index] = value;
        setPoints(updatedPoints);
    };

    const handleAddPoint = () => {
        setPoints([...points, '']);
    };
    const handleTimeChange = (index, newTime) => {
        const newPoints = [...points];
        newPoints[index] = newTime;
        setPoints(newPoints);
    
        // Calculate the total time
        const totalTimeInSeconds = newPoints.reduce((acc, time) => {
          // Convert input to seconds
          const seconds = parseInt(time, 10);
          return acc + (isNaN(seconds) ? 0 : seconds);
        }, 0);
    
        const hours = Math.floor(totalTimeInSeconds / 3600);
        const minutes = Math.floor((totalTimeInSeconds % 3600) / 60);
        const seconds = totalTimeInSeconds % 60;
        setTotalTime(`${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
      };
    const handleButtonClick = () => {
        const textarea = document.getElementById('point1');
        alert(points[0]);
        if (textarea) {
          const value = textarea.value;
        }
    };
    return (
        <div class="homepage">
            <div class="brand">
                <p class="brandText">speechEasy</p>
            </div>

            
            <div class="totalTime">
                <label for="totalTime">Total Time:</label>
                <p class="totalTimeBoxText" id="totalTimeBox">{totalTime}</p>
            </div>


            <div class="go">
                <button class="goButton" id="goButton" onClick={handleButtonClick}><Link class="goLink" to= "/countdown">Begin!</Link></button>
            </div>


            <div>
                <h1>Talking Points</h1>
                
                {points.map((point, index) => (
                    
                    <div key={`point${index + 1}`}>
                        {/* <input
                        type="text"
                        id = {`value${index + 1}`}
                        placeholder={`topic_title${index + 1}`}
                        style={{ width: '50%' }}
                    /> */}
                        <textarea class="point"
                            id = {`point${index + 1}`}
                            onChange={(e) => handlePointChange(index, e.target.value)}
                            placeholder={`Point ${index + 1}`}
                            style={{ width: '50%', minHeight: '50px' }}
                        />
                        <input class="pointTime"
                            type="text"
                            id = {`time${index + 1}`}
                            placeholder={`Time duration for Point ${index + 1}`}
                            style={{ width: '50%' }}
                            onChange={(e) => handleTimeChange(index, e.target.value)}
                        />
                        <br/>
                    <br/>
                    </div>
                ))}
                <br/>
                <button class="addPoint" onClick={handleAddPoint}>Add Point</button>
            </div>
        </div>
    )
}

export default HomePage;