import React from 'react';
import logo from './logo.svg';
import './App.scss';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/home/Home";
import Map from "./pages/map/Map";
import ResponsiveNavbar from "./components/responsive-navbar/ResponsiveNavbar";
import {ThemeProvider} from "@mui/material";
import theme from "./themes/theme";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <ResponsiveNavbar/>
                <BrowserRouter>
                    <Routes>
                        <Route path="/home" element={<Home/>}/>
                        <Route path="/" element={<Map/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
        </ThemeProvider>
    );
}

export default App;
