import React, {useState} from 'react';
import './CSS/Go.css';
const Go = () => {
  const [textareaValue, setTextareaValue] = useState('');


    return (
        <div className="goButton">
           <button className="goButton" id="goButton" onClick={handleButtonClick}>Begin!</button>
        </div>
    );
};

export default Go;