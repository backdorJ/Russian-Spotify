import React from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AppRouter from "./commonComponents/AppRouter/AppRouter";
import NavBar from "./commonComponents/NavBar/NavBar";

function App() {
    return (
        <BrowserRouter>
            <NavBar/>
            <AppRouter/>
        </BrowserRouter>
    );
}

export default App;
