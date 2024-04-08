import React, {useContext, useEffect, useState} from 'react';
import {PlayerContext, UserContext} from "../../index";
import "./styles/Player.css"
import {getImage} from "../../http/fileApi";
import PrevIcon from "./components/PrevIcon";
import NextIcon from "./components/NextIcon";
import StartStopIcon from "./components/StartStopIcon";
import LikeIcon from "../../assets/mock/common/LikeIcon";
import {getSong} from "../../http/songApi";

/** Музыкальный плеер снизу экрана */
const Player = () => {
    const playerStore = useContext(PlayerContext);
    const userStore = useContext(UserContext);
    const [currentPlayingSong, setCurrentPlayingSong] =
        useState(playerStore.Player.currentSong!);

    let isOnRepeat = false;

    const [currentProgressBarPercent, setCurrentProgressBarPercent] = useState(0);

    /** Проиграть следующий трек */
    const handleNextClick = () => {
        if(currentPlayingSong.nextSong !== null) {
            playerStore.Player = getSong(currentPlayingSong.nextSong, userStore.user);
            setCurrentPlayingSong(playerStore.Player.currentSong!);
        }
    }

    /** Смена текущего играющего трека */
    useEffect(() => {
        if(currentPlayingSong != playerStore.Player.currentSong)
            setCurrentPlayingSong(playerStore.Player.currentSong!);
    }, [playerStore.Player.currentSong]);

    /** Проиграть предыдыщий трек */
    const handlePrevClick = () => {
        if(currentPlayingSong.prevSong !== null) {
            playerStore.Player = getSong(currentPlayingSong.prevSong, userStore.user);
            setCurrentPlayingSong(playerStore.Player.currentSong!);
        }
    }

    /** Движение progress bar по мере проигрывания трека */
    useEffect(() => {
        const audio = document.getElementById("audio-player");
        const handleTimeUpdate = (e: any) => {
            const { duration, currentTime } = e.srcElement;
            setCurrentProgressBarPercent((currentTime / duration) * 100);
        };

        if (audio) {
            audio.addEventListener("timeupdate", handleTimeUpdate);
            return () => {
                audio.removeEventListener("timeupdate", handleTimeUpdate);
            };
        }
    }, []);

    /** Взаимодействие с progress bar прокрутка трека вперёд или назад */
    useEffect(() => {
        const progressBar = document.querySelector(".progress__container");
        const audio: any = document.getElementById("audio-player");
        const setProgress = (e: any) => {
            const progressBar = e.currentTarget;
            const clickCoordinate = e.clientX - progressBar.getBoundingClientRect().left;
            const width = progressBar.clientWidth;
            const duration = audio.duration;
            const newPosition = (clickCoordinate / width) * duration;
            audio.currentTime = newPosition;
            setCurrentProgressBarPercent((newPosition / duration) * 100);
        };

        if (progressBar) {
            progressBar.addEventListener("click", setProgress);
            return () => {
                progressBar.removeEventListener("click", setProgress);
            };
        }
    }, []);

    /** Обработка окончания трека */
    useEffect(() => {
        const audio: any = document.getElementById("audio-player");

        const onEndedPlayNext = () => {
            if(!isOnRepeat)
                handleNextClick();
        }

        if (audio) {
            audio.addEventListener("ended", onEndedPlayNext);
            return () => {
                audio.removeEventListener("ended", onEndedPlayNext);
            }
        }
    }, []);

    return (
        <>
            <div className="player-wrapper">
                <audio autoPlay={playerStore.IsPlaying} id="audio-player"
                       src={getSong(currentPlayingSong, userStore.user).currentSongUrl}/>
                <div className="player">
                    <div className="buttons">
                        <div className="btn prev"><PrevIcon handlePrev={handlePrevClick}/></div>
                        <div className="btn play"><StartStopIcon isPlaying={true}/></div>
                        <div className="btn next"><NextIcon handleNext={handleNextClick}/></div>
                    </div>
                    <div className="player-music-image-container">
                        <img className="player-music-image" src={getImage(currentPlayingSong.imageId!)}
                             alt="Song Image"/>
                    </div>
                    <div className="player-content">
                        <div className="song-name">{currentPlayingSong.songName}
                            <span> - {currentPlayingSong.authors.map((author, index) => <a
                                href={'artist/' + author}
                                className="player-artist-link">{author}{index < currentPlayingSong.authors.length - 1 ? ', ' : ''}</a>)}</span>
                        </div>
                        <div className="progress__container">
                            <div style={{width: currentProgressBarPercent + "%"}} className="progress"></div>
                        </div>
                    </div>
                    {/*TODO: повесить логику на LikeButton */}
                    <div className="like-button"><LikeIcon/></div>
                    <div className="actions"></div>
                </div>
            </div>
        </>
    );
};

export default Player;