import React from 'react';
import { useEffect } from 'react';
import { useMyPointsContext } from '../pointscontext';
import './CSS/Review.css';


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

    useEffect(() => {
        review();
    }, []);

    return (
        <div class = "review-container">
            <p>{concated}</p>
            <p id="speech-review">Generating Speech Review...</p>
        </div>
    )

}

export default Review;




