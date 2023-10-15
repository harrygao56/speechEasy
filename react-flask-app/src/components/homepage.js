
import React from 'react';
import Brand from './Brand';
import TotalTime from './TotalTime';
import Go from './Go';

function HomePage () {
    return (
        <div class="brand">
            <Brand/>
            <div class="totalTime"><TotalTime/></div>
            <div class="go"><Go/></div>
        </div>
    )
}

export default HomePage;