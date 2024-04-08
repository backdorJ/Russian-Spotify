import React, {useContext, useEffect, useState} from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./commonComponents/AppRouter/AppRouter";
import NavBar from "./commonComponents/NavBar/NavBar";
import {PlayerContext, UserContext} from "./index";
import {observer} from "mobx-react-lite";
import MakeSubscriptionModal from "./commonComponents/NavBar/components/makeSubscriptionModal/makeSubscriptionModal";
import {getSubscription} from "./http/subApi";
import loadUser from "./functions/loadUser";
import Player from "./commonComponents/Player/Player";
import SideBar from "./commonComponents/SideBar/SideBar";

const App = observer(() => {
    const userStore = useContext(UserContext);
    const playerStore = useContext(PlayerContext);

    const [isSubscribed, setIsSubscribed] = useState(false);

    useEffect(() => {
        getSubscription()
            .then(x => {
                setIsSubscribed(new Date(x.endDate) > new Date())
            });
    }, []);

    const [showModal, setShowModal] = useState(false)

    if (showModal)
        document.getElementById("body")!.style.overflowY = 'hidden';
    else
        document.getElementById("body")!.style.overflowY = 'visible';

    useEffect(() => {
        loadUser()
            .then(user => userStore.login(user))
    }, []);


    return (
        <BrowserRouter>
            <div className="app">
                {
                    userStore.isAuth &&
                    <SideBar/>
                }
                <div className="app__main">
                    <NavBar setShowSubModal={setShowModal}/>
                    <AppRouter/>
                </div>
                <MakeSubscriptionModal show={showModal} onHide={() => setShowModal(false)}/>
            </div>
            {
                userStore.isAuth && isSubscribed && playerStore.Player.currentSong !== null && <Player/>
            }
        </BrowserRouter>
    );
})

export default App;
