import './App.css';
import AppRouter from "./commonComponents/AppRouter/AppRouter";
import NavBar from "./commonComponents/NavBar/NavBar";
import {UserContext} from "./index";
import {observer} from "mobx-react-lite";
import React, {useContext, useEffect} from "react";
import {BrowserRouter} from "react-router-dom";
import Admin from "./models/Admin";

const App = observer(() => {
    const adminStore = useContext(UserContext);

    useEffect(() => {
        let token = localStorage.getItem('token')
        if (token)
            adminStore.login(Admin.init(null))
    }, []);

    return (
        <BrowserRouter>
            <div className="app">
                <div className="app__main">
                    <AppRouter/>
                    <NavBar/>
                </div>
            </div>
        </BrowserRouter>
    );
})

export default App;
