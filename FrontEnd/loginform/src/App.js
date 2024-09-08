import React from "react";
import CanvasComponent from "./Background"; 
import Login from "./Login"; 
import Register from "./Register";
import Profile from "./Profile"
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import "./App.css"

export default function App() {
  return (

    <Router>

      <Routes>
        <Route path="/" element={<div style={{ position: "relative" }}>
        <CanvasComponent />
          <div style={{ position: "relative", zIndex: 1 }}>
            <Login />
         </div>
        </div>}/>

        <Route path="/login" element={<div style={{ position: "relative" }}>
      <CanvasComponent />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Login />
      </div>
    </div>}/>

    <Route path="/register" element={<div style={{ position: "relative" }}>
      <CanvasComponent />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Register />
      </div>
    </div>}/>

    <Route path="/profile" element={<div style={{ position: "relative" }}>
      <CanvasComponent />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Profile />
      </div>
    </div>}/>

      </Routes>


    </Router>
    
  );
}
