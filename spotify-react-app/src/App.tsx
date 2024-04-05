import React, {useContext, useEffect, useState} from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./commonComponents/AppRouter/AppRouter";
import NavBar from "./commonComponents/NavBar/NavBar";
import {PlayerContext, UserContext} from "./index";
import User from "./models/User";
import {observer} from "mobx-react-lite";
import MakeSubscriptionModal from "./commonComponents/NavBar/components/makeSubscriptionModal/makeSubscriptionModal";
import {getSubscription} from "./http/subApi";
import loadUser from "./functions/loadUser";
import Player from "./commonComponents/Player/Player";

const App = observer(() => {
    const userStore = useContext(UserContext);
    const playerStore = useContext(PlayerContext);

    const [showModal, setShowModal] = useState(false)

    if (showModal)
        document.getElementById("body")!.style.overflowY = 'hidden';
    else
        document.getElementById("body")!.style.overflowY = 'visible';

    useEffect(() => {
        loadUser()
            .then(user => userStore.login(user))
    }, []);

    console.log(playerStore.Player.currentSongUrl);

    return (
        <BrowserRouter>
            <div className="app">
                {
                    userStore.isAuth &&
                    <div style={{minWidth: "280px", height: "1080px", backgroundColor: "gray", position: "relative"}}></div>
                }
                <div className="app__main">
                    <NavBar setShowSubModal={setShowModal} />
                    <AppRouter/>
                </div>
                <MakeSubscriptionModal show={showModal} onHide={() => setShowModal(false)}/>
            </div>
            {
                playerStore.Player.currentSong !== null && <Player />
            }
        </BrowserRouter>
    );
})

export default App;
