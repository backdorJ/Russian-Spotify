import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import routes from "./utils/routes";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/*{routes.map(route => (*/}
                {/*    <Route key={route.path} path={route.path} element={route.element}/>*/}
                {/*))}*/}
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
