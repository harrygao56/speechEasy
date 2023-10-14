import logo from './logo.svg';
import './App.css';
import { Route, Routes } from "react-router-dom";

import HomePage from "./components/homepage.js";


const App = () => {
  return (
    <div>
       <Routes>
         <Route exact path="/" element={<HomePage />}/>
       </Routes>
    </div>
  );
 };
  
 export default App;