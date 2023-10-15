import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { PointsContextProvider } from "./pointscontext";
// index.js
// Index for webapp

ReactDOM.render(
  <React.StrictMode>
    <script src="https://www.WebRTC-Experiment.com/RecordRTC.js"></script>
    <BrowserRouter>
      <PointsContextProvider>
        <App />
      </PointsContextProvider>
    </BrowserRouter>
  </React.StrictMode>,


  document.getElementById("root")
);