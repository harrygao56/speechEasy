import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CSS/Countdown.css';

const Countdown = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5); 

  useEffect(() => {
    const timer = setInterval(() => {
      if (countdown > 0) {
        setCountdown(prevCountdown => prevCountdown - 1);
      }
      else{
        navigate('/Presentation');
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  return (
    <div>
      <div class="brand">
                <p class="brandText">speechEasy</p>
      </div>
      <div class="time">
        <h1>Begin presentation in:</h1>
        {countdown === 0 ? (
          <p>Time's up!</p>
        ) : (
          <p>{countdown}</p>
        )}
      </div>
    </div>
  );
};

export default Countdown;
