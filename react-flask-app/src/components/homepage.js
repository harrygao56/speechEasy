import React from 'react';
import './CSS/homepage.css';
import {useState} from 'react';
import { useMyPointsContext } from '../pointscontext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function HomePage () {
    const [points,setPoints] = useMyPointsContext();
    const [totalTime, setTotalTime] = useState('0:00');
    const [time, setTimes] = useState([0,0,0]);
    
    const handlePointChange = (index, value) => {
        const updatedPoints = [...points];
        updatedPoints[index] = value;
        setPoints(updatedPoints);
    };

    const navigate = useNavigate();

    const handleAddPoint = () => {
        setPoints([...points, '']);
    };
    const handleTimeChange = (index, newTime) => {
        const times = [...time];
        times[index] = newTime;
        setTimes(times);
    
        // Calculate the total time
        const totalTimeInSeconds = times.reduce((acc, time) => {
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
        const temp = [];
        for (let i = 0; i < points.length; i++) {
            for (let j = 0; j<time[i]; j = j+10){
                temp.push(points[i]);
            }
        }
        setPoints(temp);
        const textarea = document.getElementById('point1');
        if (textarea) {
          const value = textarea.value;
        }
        navigate('/Countdown');
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
                <button class="goButton" id="goButton" onClick={handleButtonClick}>Begin!</button>
            </div>


            <div class="talkingPoints">
                <br/>
                <br/>
                <br/>
                <h1>Talking Points</h1>
                {points.map((point, index) => (
                    
                    <div class="wholePoint"key={`point${index + 1}`}>
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
                            placeholder={`Time duration for Point ${index + 1} (in seconds)`}
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