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
import CreatePlaylistModal from "./commonComponents/SideBar/components/CreatePlaylistModal/CreatePlaylistModal";

const App = observer(() => {
    const userStore = useContext(UserContext);
    const playerStore = useContext(PlayerContext);
    const [showSubscriptionModal, setShowSubscriptionModal] = useState(false)
    const [showCreatePlaylistModal, setShowCreatePlaylistModal] = useState(false)
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [canShowPlayer, setCanShowPlayer] = useState(false);

    // TODO: тут идет запрос на подписку в loadUser, и с юзера можешь брать подписку
    useEffect(() => {
        loadUser()
            .then(user => userStore.login(user))
    }, []);

    // TODO: чек useEffect выше
    useEffect(() => {
        getSubscription()
            .then(x => {
                setIsSubscribed(new Date(x.endDate) > new Date())
            });
    }, []);

    if (showSubscriptionModal)
        document.getElementById("body")!.style.overflowY = 'hidden';
    else
        document.getElementById("body")!.style.overflowY = 'visible';

    useEffect(() => {
        if(userStore.isAuth && localStorage.getItem('token') && isSubscribed && playerStore.Player.currentSong)
            setCanShowPlayer(true);
        else
            setCanShowPlayer(false);
    }, [userStore.user, userStore.isAuth, isSubscribed, playerStore.Player.currentSong]);

    return (
        <BrowserRouter>
            <div className="app">
                {
                    userStore.isAuth &&
                    <SideBar setCreatePlaylistModal={setShowCreatePlaylistModal}/>
                }
                <div className="app__main">
                    <NavBar setShowSubModal={setShowSubscriptionModal}/>
                    <AppRouter/>
                </div>
                <MakeSubscriptionModal show={showSubscriptionModal} onHide={() => setShowSubscriptionModal(false)}/>
                <CreatePlaylistModal show={showCreatePlaylistModal} onHide={() => setShowCreatePlaylistModal(false)}/>
            </div>
            {
                canShowPlayer && <Player/>
            }
        </BrowserRouter>
    );
})

export default App;
