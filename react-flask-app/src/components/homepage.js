
import React from 'react';
import './CSS/homepage.css';
import {useState} from 'react';

function HomePage () {
    const [points, setPoints] = useState(['']);

    const handlePointChange = (index, value) => {
        const updatedPoints = [...points];
        updatedPoints[index] = value;
        setPoints(updatedPoints);
    };

    const handleAddPoint = () => {
        setPoints([...points, '']);
    };

    return (
        <div class="homepage">
            <div class="brand">
                <p class="brandText">speechEasy</p>
            </div>

            
            <div class="totalTime">
                <label for="totalTime">Total Time:</label>
                <p class="totalTimeBoxText" id="totalTimeBox">0:00</p>
            </div>


            <div class="go">
                <button class="goButton" id="goButton">Begin!</button>
            </div>


            <div>
                <h1>Talking Points</h1>
                {points.map((point, index) => (
                <div key={index} style={{ marginBottom: '10px' }}>
                    <textarea
                        value={point}
                        onChange={(e) => handlePointChange(index, e.target.value)}
                        placeholder={`Point ${index + 1}`}
                        style={{ width: '50%', minHeight: '50px' }}
                    />
                </div>
                ))}
                <button onClick={handleAddPoint}>Add Point</button>
            </div>
        </div>
    )
}

export default HomePage;