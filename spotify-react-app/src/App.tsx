import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import routes from "./utils/routes";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {routes.map(route => (
                    <Route key={route.path} path={route.path} element={route.element}/>
                ))}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
