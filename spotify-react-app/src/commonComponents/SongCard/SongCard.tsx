import React, {FC, Fragment, useContext, useState} from "react";
import {getImage} from "../../http/fileApi";
import {useNavigate} from "react-router-dom";
import {getSong, tryAddSongToFavorites, tryRemoveSongFromFavorites} from "../../http/songApi";
import {ISongCard} from "./interfaces/ISongCard";
import {PlayerContext, UserContext} from "../../index";
import handleImageNotLoaded from "../../functions/handleImageNotLoaded";
import "./styles/SongCard.css"
import LikeIcon from "../Player/components/LikeIcon";
import routeNames from "../../utils/routeNames";

const SongCard: FC<ISongCard> = ({song, order_number, playlist}) => {
    const userStore = useContext(UserContext)
    const playerStore = useContext(PlayerContext)
    const navigate = useNavigate();
    const [isLikedSong, setIsLikedSong] = useState(song.isInFavorite)
    let isInLikeProcess = false;
    let artistCount = song.authors.length
    let artistsMapped = song.authors.map((artist, index) => {
        if (index < artistCount - 1)
            return (<Fragment><span onClick={(e) => handleNavigateToAuthor(e, artist)}>{artist}</span>, </Fragment>)
        return (<Fragment><span onClick={(e) => handleNavigateToAuthor(e, artist)}>{artist}</span></Fragment>)
    })

    const handleNavigateToAuthor = (e: React.MouseEvent<HTMLElement>, artist: string) => {
        e.stopPropagation()
        navigate(routeNames.AUTHOR_PAGE_NAV + artist)
    }

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    let timeoutId: NodeJS.Timeout;

    const handleMouseEnter = () => {
        clearTimeout(timeoutId);
        setIsMenuOpen(true);
    };

    const handleMouseLeave = () => {
        timeoutId = setTimeout(() => {
            setIsMenuOpen(false);
        }, 100);
    };

    const handleLikeClick = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation()
        if (!isInLikeProcess) {
            isInLikeProcess = true;
            if (!isLikedSong) {
                tryAddSongToFavorites(song.songId)
                    .then(isSuccessful => {
                        if (isSuccessful) {
                            setIsLikedSong(true);
                            isInLikeProcess = false;
                        }
                    });
            } else {
                tryRemoveSongFromFavorites(song.songId)
                    .then(isSuccessful => {
                        if (isSuccessful) {
                            setIsLikedSong(false);
                            isInLikeProcess = false;
                        }
                    });
            }
        }
    }

    const handleOpenMenuClick = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation()
        setIsMenuOpen(!isMenuOpen)
    };

    const handleAddToPlaylistClick = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation()
        // editPlaylist()
    };

    const handlePlay = () => {
        playerStore.Player = getSong(song, userStore.user, playlist);
    }

    return (
        <div
            className="playlist-page__songs__list__main__song-card" onClick={handlePlay}>
            <div
                className="playlist-page__songs__list__main__song-card__id">
                <p>{order_number}</p>
            </div>
            <div
                className="playlist-page__songs__list__main__song-card__title">
                <img
                    src={getImage(song.imageId)}
                    alt={song.songName}
                    onError={handleImageNotLoaded}
                    className="playlist-page__songs__list__main__song-card__title__img"/>
                <div className="playlist-page__songs__list__main__song-card__title__info">
                    <div className="playlist-page__songs__list__main__song-card__title__info__song-name">
                        <p>{song.songName}</p>
                    </div>
                    <div className="playlist-page__songs__list__main__song-card__title__info__artist-names">
                        <p>{artistsMapped}</p>
                    </div>
                </div>
            </div>
            <div className="playlist-page__songs__list__main__song-card__album">
                <p>Some album</p>
            </div>
            <div className="playlist-page__songs__list__main__song-card__added">
                <p></p>
            </div>
            <div onClick={handleLikeClick} className="playlist-page__songs__list__main__song-card__liked">
                <LikeIcon isLiked={isLikedSong} classname="like-icon"/>
            </div>
            <div className="playlist-page__songs__list__main__song-card__length">
                <p>{Math.floor(song.duration / 60)}:{(song.duration % 60).toString().padStart(2, '0')}</p>
            </div>
            <div className="music-more-button" onMouseEnter={handleMouseEnter}
                 onMouseLeave={handleMouseLeave}
                 onClick={handleOpenMenuClick}>
                <span>⋮</span>
                {isMenuOpen && (
                    <div className="music-menu" onMouseEnter={handleMouseEnter}
                         onMouseLeave={handleMouseLeave}>
                        <button onClick={handleAddToPlaylistClick}>Добавить в плейлист</button>
                        <button>Удалить из плейлиста</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SongCard