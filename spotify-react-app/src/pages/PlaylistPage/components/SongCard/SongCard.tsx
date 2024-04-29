// @ts-ignore
import not_liked_icon from "../../../../assets/mock/playlistpage/like.png"
// @ts-ignore
import liked_icon from "../../../../assets/mock/playlistpage/songs/liked.png"
import React, {FC, Fragment, useContext, useState} from "react";
import {getImage} from "../../../../http/fileApi";
import {useNavigate} from "react-router-dom";
import {getSong, tryAddSongToFavorites, tryRemoveSongFromFavorites} from "../../../../http/songApi";
import {ISong} from "../../../../commonComponents/Song/interfaces/ISong";
import {PlayerContext, UserContext} from "../../../../index";
import handleImageNotLoaded from "../../../../functions/handleImageNotLoaded";
import "./styles/SongCard.css"

const SongCard: FC<ISong> = ({song, order_number}) => {
    const userStore = useContext(UserContext)
    const playerStore = useContext(PlayerContext)
    const navigate = useNavigate();
    const [isLikedSong, setIsLikedSong] = useState(song.isInFavorite)
    let isInLikeProcess = false;
    let artistCount = song.authors.length
    let artistsMapped = song.authors.map((artist, index) => {
        if (index < artistCount - 1)
            return (<Fragment><span onClick={() => navigate(`/author/${artist}`)}>{artist}</span>, </Fragment>)
        return (<Fragment><span onClick={() => navigate(`/author/${artist}`)}>{artist}</span></Fragment>)
    })

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

    const handlePlay = () => {
        playerStore.Player = getSong(song, userStore.user);
    }

    return (
        <div
            className="playlist-page__songs__list__main__song-card">
            <div
                onClick={handlePlay}
                className="playlist-page__songs__list__main__song-card__id">
                <p>{order_number}</p>
            </div>
            <div
                onClick={handlePlay}
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
                {
                    isLikedSong
                        ? <img src={liked_icon} alt="Dislike"/>
                        : <img src={not_liked_icon} alt="Like"/>
                }
            </div>
            <div className="playlist-page__songs__list__main__song-card__length">
                <p>{Math.floor(song.duration / 60)}:{(song.duration % 60).toString().padStart(2, '0')}</p>
            </div>
            <div className="music-more-button" onMouseEnter={handleMouseEnter}
                 onMouseLeave={handleMouseLeave}>
                <span>⋮</span>
                {menuOpen && (
                    <div className="music-menu" onMouseEnter={handleMouseEnter}
                         onMouseLeave={handleMouseLeave}>
                        <button>Воспроизвести следующей</button>
                        <button>Добавить в плейлист</button>
                        <button>Удалить из плейлиста</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SongCard