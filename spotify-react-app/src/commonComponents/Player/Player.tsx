import React, {useContext, useEffect, useState} from 'react';
import {PlayerContext, UserContext} from "../../index";
import "./styles/Player.css"
import {getImage} from "../../http/fileApi";
import PrevIcon from "./components/PrevIcon";
import NextIcon from "./components/NextIcon";
import StartIcon from "./components/StartIcon";
import LikeIcon from "./components/LikeIcon";
import {getSong, tryAddSongToFavorites, tryRemoveSongFromFavorites} from "../../http/songApi";
import VolumeIcon from "./components/VolumeIcon";
import {useNavigate} from "react-router-dom";
import CloseExpandedPlayer from "./components/CloseExpandedPlayer";
import StopIcon from "./components/StopIcon";
import {CurrentPlaylistIcon} from "./components/CurrentPlaylistIcon";
import SongCard from "../SongCard/SongCard";

/** Музыкальный плеер снизу экрана */
const Player = (props: any) => {
    const {showExpanded, setShowExpanded} = props
    const playerStore = useContext(PlayerContext);
    const userStore = useContext(UserContext);
    const [currentPlayingSong, setCurrentPlayingSong] =
        useState(playerStore.Player.currentSong!);
    const [currentPlaylist] = useState(playerStore.Player.currentPlaylist);
    const [volume, setVolume] = useState(playerStore.Volume);
    const [volumeVisibility, setVolumeVisibility] = useState("none");
    const navigate = useNavigate();
    const [isLiked, setIsLiked] = useState(playerStore.Player.currentSong!.isInFavorite);
    /** Находится ли песня в процессе добавления в понравившееся */
    let isInLikeProcess = false;
    let isOnRepeat = false;

    const [currentProgressBarPercent, setCurrentProgressBarPercent] = useState(0);

    /** Проиграть следующий трек */
    const handleNextClick = () => {
        if (currentPlayingSong.nextSong !== null) {
            playerStore.Player = getSong(currentPlayingSong.nextSong, userStore.user, currentPlaylist);
            setCurrentPlayingSong(playerStore.Player.currentSong!);
        }
    }

    /** Смена текущего играющего трека */
    useEffect(() => {
        if (currentPlayingSong !== playerStore.Player.currentSong)
            setCurrentPlayingSong(playerStore.Player.currentSong!);
    }, [playerStore.Player.currentSong]);

    /** Проиграть предыдыщий трек */
    const handlePrevClick = () => {
        if (currentPlayingSong.prevSong !== null) {
            playerStore.Player = getSong(currentPlayingSong.prevSong, userStore.user, currentPlaylist);
            setCurrentPlayingSong(playerStore.Player.currentSong!);
        }
    }

    /** Движение progress bar по мере проигрывания трека */
    useEffect(() => {
        const audio = document.getElementById("audio-player");

        const handleTimeUpdate = (e: any) => {
            const {duration, currentTime} = e.srcElement;
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
            if (!isOnRepeat)
                handleNextClick();
        }

        if (audio) {
            audio.addEventListener("ended", onEndedPlayNext);
            return () => {
                audio.removeEventListener("ended", onEndedPlayNext);
            }
        }
    }, [currentPlayingSong]);

    const handleVolumeChange = (e: any) => {
        let audio: any = document.getElementById("audio-player");
        audio.volume = e.target.value;
        playerStore.Volume = e.target.value;
        setVolume(playerStore.Volume);
    }

    const handleShowExpanded = () => setShowExpanded(!showExpanded);
    const closeExpanded = () => setShowExpanded(false);

    const handleLikeClick = () => {
        if (!isInLikeProcess) {
            isInLikeProcess = true;
            if (!playerStore.Player.currentSong!.isInFavorite) {
                tryAddSongToFavorites(playerStore.Player.currentSong!.songId)
                    .then(isSuccessful => {
                        if (isSuccessful) {
                            setIsLiked(true);
                            isInLikeProcess = false;
                            playerStore.Player.currentSong!.isInFavorite = true;
                        }
                    });
            } else {
                tryRemoveSongFromFavorites(playerStore.Player.currentSong!.songId)
                    .then(isSuccessful => {
                        if (isSuccessful) {
                            setIsLiked(false);
                            isInLikeProcess = false;
                            playerStore.Player.currentSong!.isInFavorite = false;
                        }
                    });
            }
        }
    }

    const playerContext = useContext(PlayerContext);
    const [isPlaying, setIsPlaying] = useState(true);

    const handleStartStopClick = () => {
        const audio: any = document.getElementById("audio-player");
        const image: any = document.querySelector(".player-music-image");

        if (audio !== null) {
            if (audio?.paused) {
                playerContext.IsPlaying = true;
                setIsPlaying(true);
                audio.play();
                image.style.animation = "3s linear 0s normal none infinite running rot";
            } else {
                playerContext.IsPlaying = false;
                setIsPlaying(false);
                audio.pause();
                image.style.animation = "none";
            }
        }
    }

    const [isCurrentPlaylistOpened, setCurrentPlaylistOpened] = useState(false);
    const handleCurrentPlaylistIconClick = () => {
        setCurrentPlaylistOpened(!isCurrentPlaylistOpened);
    }

    return (
        <>
            <div
                className={`player-wrapper ${showExpanded ? "expanded" : ""} ${isCurrentPlaylistOpened ? "shadow" : ""}`}>
                <audio autoPlay={playerStore.IsPlaying} id="audio-player"
                       src={getSong(currentPlayingSong, userStore.user, currentPlaylist).currentSongUrl}/>
                <div className={`player${showExpanded ? " expanded" : ""}`}>
                    <div onClick={handleShowExpanded}
                         className={`player-music-image-container${showExpanded ? " expanded" : ""}`}>
                        <img className={`player-music-image ${showExpanded ? " expanded" : ""}`}
                             src={getImage(currentPlayingSong.imageId!)}
                             alt="SongCard Image"/>
                    </div>
                    {showExpanded &&
                        <div className="close-expanded"><CloseExpandedPlayer onClick={closeExpanded}/></div>}
                    <div className={`player-content${showExpanded ? " expanded" : ""}`}>
                        <div onClick={() => setShowExpanded(false)}
                             className={`song-name${showExpanded ? " expanded" : ""}`}>{currentPlayingSong.songName}
                            <span>-</span>
                            <span>
                                 {currentPlayingSong.authors.map((author, index) => <span
                                     onClick={() => navigate(`/author/${author}`)}
                                     className={`player-artist-link${showExpanded ? " expanded" : ""}`}>{author}{index < currentPlayingSong.authors.length - 1 ? ', ' : ''}</span>)}</span>
                        </div>
                        <div className={`progress__container${showExpanded ? " expanded" : ""}`}>
                            <div style={{width: currentProgressBarPercent + "%"}}
                                 className={`progress${showExpanded ? " expanded" : ""}`}></div>
                        </div>
                    </div>
                    <div className={`actions${showExpanded ? " expanded" : ""}`}>
                        <div className={`like-button${showExpanded ? " expanded" : ""}`}><LikeIcon
                            onClick={handleLikeClick} isLiked={isLiked}/></div>
                        <div className={`buttons${showExpanded ? " expanded" : ""}`}>
                            <div className={`btn prev${showExpanded ? " expanded" : ""}`} onClick={handlePrevClick}>
                                <PrevIcon/></div>
                            {isPlaying ?
                                <div className={`btn play${showExpanded ? " expanded" : ""}`}
                                     onClick={handleStartStopClick}><StartIcon/></div>
                                : <div className={`btn play${showExpanded ? " expanded" : ""}`}
                                       onClick={handleStartStopClick}><StopIcon/></div>}
                            <div className={`btn next${showExpanded ? " expanded" : ""}`} onClick={handleNextClick}>
                                <NextIcon/></div>
                        </div>
                        <div onMouseEnter={() => setVolumeVisibility("block")}
                             onMouseLeave={() => setVolumeVisibility("none")}
                             className={`volume ${showExpanded ? "expanded" : ""}`}>
                            <VolumeIcon/>
                            <input style={{display: volumeVisibility}}
                                   className={`volume-slider${showExpanded ? " expanded" : ""}`}
                                   onInput={handleVolumeChange} type="range" id="volume-slider" min="0" max="1"
                                   step="0.01"
                                   value={volume}/>
                        </div>
                    </div>
                    <div className={`current-playlist-div${showExpanded ? " expanded" : ""}`}>
                        <div className={`current-playlist-icon-container${showExpanded ? " expanded" : ""}`}>
                            <CurrentPlaylistIcon onClick={handleCurrentPlaylistIconClick}/>
                        </div>
                        <div className={`current-playlist-container${isCurrentPlaylistOpened ? " opened" : "closed"}`}>
                            {isCurrentPlaylistOpened &&
                                <div className="music-menu">
                                    <div className="music-container">
                                        <div className="music-container-wrapper">
                                            {currentPlaylist && currentPlaylist.songs.map((song, index) => <SongCard song={song}
                                                                                                  order_number={index + 1} playlist={currentPlaylist}/>)}
                                        </div>
                                    </div>
                                </div>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Player;