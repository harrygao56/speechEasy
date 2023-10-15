import React, { useState, useEffect } from 'react';
import './CSS/Presentation.css';
import { useMyPointsContext } from '../pointscontext';

const Presentation = () => { 
    const [ points, setPoints ] = useMyPointsContext();
    const [seconds, setSeconds] = useState(0);
    const size = points.length;
    const interval = 15;
    useEffect(() => {
      const interval = setInterval(() => {
        // Code to be executed every second
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
  
      return () => {
        // Clean up the interval on component unmount
        clearInterval(interval);
      };
    }, []);


    const setMsgPoints = (time) =>{
      // const prompt = document.getElementById("pointPrompt");
      const pointprompttoshow = points[Math.floor(time/interval)];
      // prompt.innerHTML=pointprompttoshow;
      return pointprompttoshow;
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };
    return (
        <div class="presentation">
          <div class="timer">
            <h1>Timer:</h1>
            <div class="timerTime">{formatTime(seconds)}</div>
          </div>

          <div class="pointPrompt" id = "pointPrompt">
            <div class="timerTime">{setMsgPoints(seconds)}</div>
          </div>

          <div class="userPrompt">
            <div class="promptBox"></div>
          </div>
        </div>
      );
}

export default Presentation;