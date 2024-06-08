import React from 'react';
import logo from './logo.svg';
import './App.scss';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/home/Home";
import Map from "./pages/map/Map";
import ResponsiveNavbar from "./components/responsive-navbar/ResponsiveNavbar";

function App() {
    return (
        <div className="App">
            <ResponsiveNavbar/>
            <BrowserRouter>
                <Routes>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/" element={<Map/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
