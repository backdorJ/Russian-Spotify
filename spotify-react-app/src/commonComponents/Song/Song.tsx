import React, {FC, useState} from 'react';
import PlayIcon from "../../assets/mock/common/PlayIcon";
import {getImage} from "../../http/fileApi";
import LikeIcon from "../../assets/mock/common/LikeIcon";
import {ISong} from "./interfaces/ISong";
import "./styles/Song.css"
import {useNavigate} from "react-router-dom";
import {tryAddSongToFavorites, tryRemoveSongFromFavorites} from "../../http/songApi";


/**Компонент для песни
 * @param song - Song песня*/
const Song : FC<ISong> = ({song}) => {
    const navigate = useNavigate()
    const [isLiked, setIsLiked] = useState(song.isInFavorite);

    /** Находится ли песня в процессе добавления в понравившееся */
    let isInLikeProcess = false;

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

    const handleLikeClick = () => {
        if(!isInLikeProcess) {
            isInLikeProcess = true;
            if (!song.isInFavorite) {
                tryAddSongToFavorites(song.songId)
                    .then(isSuccessful => {
                        if(isSuccessful) {
                            setIsLiked(true);
                            isInLikeProcess = false;
                            song.isInFavorite = true;
                        }
                    });
            } else {
                tryRemoveSongFromFavorites(song.songId)
                    .then(isSuccessful => {
                        if(isSuccessful){
                            setIsLiked(false);
                            isInLikeProcess = false;
                            song.isInFavorite = false;
                        }
                    });
            }
        }
    }

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
                <span>{song.authors.map((author, index) => <span
                    onClick={() => navigate(`/author/${author}`)}
                    className="artist-link">{author}{index < song.authors.length - 1 ? ', ' : ''}</span>)}</span>
            </div>
            <div className="music-duration">
                <span>{Math.floor(song.duration / 60)}:{(song.duration % 60).toString().padStart(2, '0')}</span>
            </div>
            <div className="like-icon-container">
                <LikeIcon onClick = {handleLikeClick} isLiked={isLiked} />
            </div>
            <button className="music-more-button" onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}>⋮
            </button>
            {menuOpen && (
                <div className="music-menu" onMouseEnter={handleMouseEnter}
                     onMouseLeave={handleMouseLeave}>
                    <button>Воспроизвести следующей</button>
                    <button>Добавить в плейлист</button>
                </div>
            )}
        </div>
    );
};

export default Song;