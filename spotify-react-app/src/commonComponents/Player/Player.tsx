import React, {useContext} from 'react';
import {PlayerContext} from "../../index";
import "./styles/Player.css"

/** Музыкальный плеер снизу экрана */
const Player = () => {
    const playerStore = useContext(PlayerContext);

    const handleNextTrack = () => {
        // Ваша логика для переключения на следующий трек
    };

    const handlePreviousTrack = () => {
        // Ваша логика для переключения на предыдущий трек
    };

    // TODO: Стилизовать, настроить controls
    return (
        <>
            <div className="audio-player-container">
                <audio controls={true} className="audio-player">
                    <source src={playerStore.Player.currentSongUrl}/>
                </audio>
                <div className="audio-controls">
                    <button onClick={handlePreviousTrack}>Previous</button>
                    <button onClick={handleNextTrack}>Next</button>
                </div>
            </div>
        </>
    );
};

export default Player;