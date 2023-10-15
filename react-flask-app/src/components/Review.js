import React from 'react';
import { useEffect } from 'react';
import { useMyPointsContext } from '../pointscontext';
import './CSS/Review.css';
import { useNavigate } from 'react-router-dom';

const Review = () => {
    const [points, setPoints] = useMyPointsContext();
    
    var concated = points.join(" ");

    async function review() {
        const formData = new FormData();
        formData.append('transcript', concated);
        const response = await fetch("http://127.0.0.1:5000/review", {
        method: "POST",
        body: formData,
      });
      let speechReview = await response.json();
      document.getElementById("speech-review").innerText = speechReview;
    }
    const navigate = useNavigate();
    const handleButtonClick = () => {
    
        navigate('/');
    };
    useEffect(() => {
        review();
    }, []);

    return (
        <div>
            <div class="brand">
                <p class="brandText">speechEasy</p>
            </div>
            
            <div class = "review-container">
                <p>{concated}</p>
                <p class="speech-review">Generating Speech Review...</p>
                <button class="homeButton" id="goButton" onClick={handleButtonClick}>HomePage</button>
            </div>
        </div>
    )

}

export default Review;




