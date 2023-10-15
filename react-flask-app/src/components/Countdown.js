import React, { useState, useEffect } from 'react';

const Countdown = () => {
  const [countdown, setCountdown] = useState(3); 

  useEffect(() => {
    const timer = setInterval(() => {
      if (countdown > 0) {
        setCountdown(prevCountdown => prevCountdown - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  return (
    <div>
      <h1>Countdown Timer</h1>
      <div>
        {countdown === 0 ? (
          <p>Time's up!</p>
        ) : (
          <p>Time remaining: {countdown} seconds</p>
        )}
      </div>
    </div>
  );
};

export default Countdown;
