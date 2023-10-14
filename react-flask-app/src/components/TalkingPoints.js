import React, { useState } from 'react';

const TalkingPoints = () => {
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
  );
};

export default TalkingPoints;
