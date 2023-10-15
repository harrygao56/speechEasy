import React from 'react';
import { useState, useEffect } from 'react';
import { useMyPointsContext } from '../pointscontext';


const Review = () => {
    const [points, setPoints] = useMyPointsContext();
    const [speechReview, setSpeechReview] = useEffect("");
    var concated = points.join(" ");

    async function review() {
        const formData = new FormData();
        formData.append('transcript', concated);
        const response = await fetch("http://127.0.0.1:5000/review", {
        method: "POST",
        body: formData,
      });
      const output = await response.json();
      setSpeechReview(output);
    }
    
    review();

    return (
        <div>
            <p>{speechReview}</p>
            <p>{concated}</p>
        </div>
    )
}

export default Review;