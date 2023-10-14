import logo from './logo.svg';
import './App.css';
import { Route, Routes } from "react-router-dom";

import HomePage from "./Components/homepage";
import Brand from "./Components/Brand";


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