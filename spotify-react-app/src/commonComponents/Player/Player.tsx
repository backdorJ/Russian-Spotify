import React, {useContext} from 'react';
import {PlayerContext} from "../../index";
import ReactPlayer from "react-player";

/** Музыкальный плеер снизу экрана */
const Player = () => {
    const playerStore = useContext(PlayerContext);

    // TODO: Стилизовать, настроить controls
    return (
        <>
            <ReactPlayer url={playerStore.Player.currentSongUrl} controls={true}/>
        </>
    );
};

export default Player;