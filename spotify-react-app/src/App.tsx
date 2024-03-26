import React, {useContext, useEffect, useState} from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./commonComponents/AppRouter/AppRouter";
import NavBar from "./commonComponents/NavBar/NavBar";
import {SpotifyContext} from "./index";
import User from "./models/User";
import {observer} from "mobx-react-lite";

const App = observer(() => {
    const userStore = useContext(SpotifyContext)

    useEffect(() => {
        if (localStorage.getItem('token'))
            userStore.login(new User())
    }, []);

    return (
        <BrowserRouter>
            <div className="app">
                {
                    userStore.isAuth &&
                    <div style={{minWidth: "280px", height: "1080px", backgroundColor: "gray"}}></div>
                }
                <div className="app__main">
                    <NavBar/>
                    <AppRouter/>
                </div>
            </div>
        </BrowserRouter>
    );
})

export default App;
