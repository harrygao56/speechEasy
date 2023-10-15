import logo from './logo.svg';
import './App.css';
import { Route, Routes } from "react-router-dom";

import HomePage from "./Components/homepage";
import Brand from "./Components/Brand";
import TranscriptTest from './Components/TranscriptTest';
import Countdown from './Components/Countdown';
import Presentation  from './Components/Presentation';
const App = () => {
  return (
    <div>
       <Routes>
         <Route exact path="/" element={<HomePage />}/>
         <Route exact path="/tt" element={<TranscriptTest />}/>
         <Route exact path="countdown" element = {<Countdown/>}/>
         <Route exact path="presentation" element = {<Presentation/>}/>
       </Routes>
    </div>
  );
 };
  
 export default App;