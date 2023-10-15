import logo from './logo.svg';
import './App.css';
import { Route, Routes } from "react-router-dom";

import HomePage from "./Components/homepage";
import Brand from "./Components/Brand";
import TranscriptTest from './Components/TranscriptTest';


const App = () => {
  return (
    <div>
       <Routes>
         <Route exact path="/" element={<HomePage />}/>
         <Route exact path="/tt" element={<TranscriptTest />}/>
       </Routes>
    </div>
  );
 };
  
 export default App;