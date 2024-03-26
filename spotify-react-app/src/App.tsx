import React, {useContext, useEffect, useState} from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./commonComponents/AppRouter/AppRouter";
import NavBar from "./commonComponents/NavBar/NavBar";
import {SpotifyContext} from "./index";
import User from "./models/User";
import {observer} from "mobx-react-lite";
import MakeSubscriptionModal from "./commonComponents/NavBar/components/makeSubscriptionModal/makeSubscriptionModal";
import {getSubscription} from "./http/subApi";
import loadUser from "./hooks/loadUser";

const App = observer(() => {
    const userStore = useContext(SpotifyContext)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        loadUser()
            .then(user => userStore.login(user))
    }, []);

    return (
        <BrowserRouter>
            <div className="app">
                {
                    userStore.isAuth &&
                    <div style={{minWidth: "280px", height: "1080px", backgroundColor: "gray"}}></div>
                }
                <div className="app__main">
                    <NavBar setShowSubModal={setShowModal} />
                    <AppRouter/>
                </div>
                <MakeSubscriptionModal show={showModal} onHide={() => setShowModal(false)}/>
            </div>
        </BrowserRouter>
    );
})

export default App;
