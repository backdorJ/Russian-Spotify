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
import CreateOrEditPlaylistModal
    from "./commonComponents/SideBar/components/CreateOrEditPlaylistModal/CreateOrEditPlaylistModal";
import CreateOrEditSongModal from "./commonComponents/SideBar/components/CreateOrEditSongModal/CreateOrEditSongModal";

const App = observer(() => {
    const userStore = useContext(UserContext);
    const playerStore = useContext(PlayerContext);
    const [showSubscriptionModal, setShowSubscriptionModal] = useState(false)
    const [showCreatePlaylistModal, setShowCreatePlaylistModal] = useState(false)
    const [showCreateSongModal, setShowCreateSongModal] = useState(false)
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [canShowPlayer, setCanShowPlayer] = useState(false);
    const [showPlayerExpanded, setShowPlayerExpanded] = useState(false);

    // TODO: тут идет запрос на подписку в loadUser, и с юзера можешь брать подписку
    useEffect(() => {
        loadUser()
            .then(user => {
                if (user !== undefined)
                    userStore.login(user)
            })
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
        if (userStore.isAuth && localStorage.getItem('token') && isSubscribed && playerStore.Player.currentSong)
            setCanShowPlayer(true);
        else
            setCanShowPlayer(false);
    }, [userStore.user, userStore.isAuth, isSubscribed, playerStore.Player.currentSong]);

    return (
        <BrowserRouter>
            <div
                onClick={() => setShowPlayerExpanded(false)}
                className="app">
                {
                    userStore.isAuth &&
                    <SideBar
                        setShowCreatePlaylistModal={setShowCreatePlaylistModal}
                        setShowCreateSongModal={setShowCreateSongModal}/>
                }
                <div className="app__main">
                    <NavBar setShowSubModal={setShowSubscriptionModal}/>
                    <AppRouter/>
                </div>
                <MakeSubscriptionModal show={showSubscriptionModal} onHide={() => setShowSubscriptionModal(false)}/>
                <CreateOrEditPlaylistModal
                    show={showCreatePlaylistModal}
                    onHide={() => setShowCreatePlaylistModal(false)}
                    playlist={undefined}
                    songsIds={[]}
                    reloadTrigger={() => {
                    }}/>
                <CreateOrEditSongModal
                    show={showCreateSongModal}
                    onHide={() => setShowCreateSongModal(false)}
                    song={undefined}
                    reloadTrigger={() => {
                    }}/>
            </div>
            {
                canShowPlayer && <Player showExpanded={showPlayerExpanded} setShowExpanded={setShowPlayerExpanded}/>
            }
        </BrowserRouter>
    );
})

export default App;
