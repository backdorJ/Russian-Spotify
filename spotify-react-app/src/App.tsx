import React from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AppRouter from "./commonComponents/AppRouter/AppRouter";

function App() {
    return (
        <BrowserRouter>
            <AppRouter/>
        </BrowserRouter>
    );
}

export default App;
