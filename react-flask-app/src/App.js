import logo from './logo.svg';
import './App.css';
import { Route, Routes } from "react-router-dom";

import HomePage from "./Components/homepage";
import Brand from "./Components/Brand";
import TranscriptTest from './Components/TranscriptTest';
import Countdown from './Components/Countdown';
import Presentation  from './Components/Presentation';
import Review from './Components/Review'

const App = () => {
  return (
    <div>
      <script src="https://www.WebRTC-Experiment.com/RecordRTC.js"></script>
       <Routes>
         <Route exact path="/" element={<HomePage />}/>
         <Route exact path="/tt" element={<TranscriptTest />}/>
         <Route exact path="/countdown" element = {<Countdown/>}/>
         <Route exact path="/presentation" element = {<Presentation/>}/>
         <Route exact path="/review" element = {<Review/>}/>
       </Routes>
    </div>
  );
 };
  
 export default App;