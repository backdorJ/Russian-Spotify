import React, {FC, useContext, useState} from 'react';
import PlayIcon from "../../assets/mock/common/PlayIcon";
import {getImage} from "../../http/fileApi";
import LikeIcon from "../../assets/mock/common/LikeIcon";
import {ISong} from "./interfaces/ISong";
import "./styles/Song.css"
import {PlayerContext, UserContext} from "../../index";

/**Компонент для песни
 * @param song - Song песня*/
const Song : FC<ISong> = ({song}) => {
    const playerStore = useContext(PlayerContext);
    const userStore = useContext(UserContext);

    const [menuOpen, setMenuOpen] = useState(false);
    let timeoutId: NodeJS.Timeout;

    const handleMouseEnter = () => {
        clearTimeout(timeoutId);
        setMenuOpen(true);
    };

    const handleMouseLeave = () => {
        timeoutId = setTimeout(() => {
            setMenuOpen(false);
        }, 100);
    };

    // TODO: Связать песню(её кнопки) с состоянием песни
    return (
        <div key={song.songId} className="music-card-button">
            <div className="play-icon-container">
                <PlayIcon song={song}/>
            </div>
            <div className="music-image-container">
                <img className="music-image" alt="music-image"
                     src={getImage(song.imageId)}/>
            </div>
            <div className="music-name-authors">
                <span>{song.songName}</span>
                <span>{song.authors.map((author, index) => <a
                    href={'artist/' + author}
                    className="artist-link">{author}{index < song.authors.length - 1 ? ', ' : ''}</a>)}</span>
            </div>
            <div className="music-duration">
                <span>{Math.floor(song.duration / 60)}:{(song.duration % 60).toString().padStart(2, '0')}</span>
            </div>
            <div className="like-icon-container">
                <LikeIcon/>
            </div>
            <button className="music-more-button" onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}>⋮
            </button>
            {menuOpen && (
                <div className="music-menu" onMouseEnter={handleMouseEnter}
                     onMouseLeave={handleMouseLeave}>
                    <button>Воспроизвести следующей</button>
                    <button>Удалить из плейлиста</button>
                </div>
            )}
        </div>
    );
};

export default Song;