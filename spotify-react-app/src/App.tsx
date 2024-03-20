import React from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./commonComponents/AppRouter/AppRouter";
import NavBar from "./commonComponents/NavBar/NavBar";

function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <div style={{minWidth: "280px", height: "1080px", backgroundColor: "gray"}}></div>
                <div className="app__main">
                    <NavBar/>
                    <AppRouter/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
