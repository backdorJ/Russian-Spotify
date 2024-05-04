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
import {editPlaylist, getPlaylistsByFilter} from "../../http/playlistApi";
import {playlistFilters} from "../../http/filters/playlistFilters";
import Playlist from "../../models/Playlist";
import {getUserId} from "../../functions/getUserId";
import {getAuthor} from "../../http/authorApi";
import {getUser} from "../../http/authApi";

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

    const [isPlaylistsListOpened, setIsPlaylistsListOpened] = useState(false);
    const [userPlaylists, setUserPlaylists] = useState<Playlist[]>([]);
    const [isAddingSong, setAddingSong] = useState(true);

    const handleOpenPlaylistsListClick = (option: string) => {
        setIsPlaylistsListOpened(true)
    };

    const handleActionWithSong = (choosenPlaylist: Playlist) => {
        if (isAddingSong) {
            AddToPlaylist(choosenPlaylist)
        } else {
            DeleteFromPlaylist(choosenPlaylist)
        }
    }

    const AddToPlaylist = (choosenPlaylist: Playlist) => {
        choosenPlaylist?.songs.push(song)
        editPlaylist(choosenPlaylist.playlistId, choosenPlaylist.playlistName, song.songId, choosenPlaylist.songs.map(x => x.songId)).then(response => {
            if (response.status === 200)
                console.log("Песня добавлена успешно")

        }).catch(err => console.log(err));
    }
    const DeleteFromPlaylist = (choosenPlaylist: Playlist) => {
        editPlaylist(choosenPlaylist.playlistId, choosenPlaylist.playlistName, song.songId, choosenPlaylist.songs.map(x => x.songId).filter(x => x !== song.songId)).then(response => {
            if (response.status === 200)
                console.log("Песня удалена успешно")

        }).catch(err => console.log(err));
    };

    const handlePlay = () => {
        playerStore.Player = getSong(song, userStore.user, playlist);
    }

    const handleOpenPlaylistsMouseEnter = (option: string) => {
        clearTimeout(timeoutId);
        if (option === "add") {
            setAddingSong(true)
            getAuthor(userStore.user.username, 1, 5, 1, 3)
                .then(p => setUserPlaylists(p.authorPlaylists.filter(x => !x.songs.map(s => s.songId).includes(song.songId))));
        } else {
            setAddingSong(false)
            getAuthor(userStore.user.username, 1, 5, 1, 3)
                .then(p => setUserPlaylists(p.authorPlaylists.filter(x => x.songs.map(s => s.songId).includes(song.songId))));
        }
        
        setIsPlaylistsListOpened(true);
    };

    const handleClosePlaylistsMouseEnter = () => {
        timeoutId = setTimeout(() => {
            setIsPlaylistsListOpened(false);
        }, 100);
    };

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
                        <button onMouseEnter={() => handleOpenPlaylistsMouseEnter("add")}
                                onMouseLeave={() => handleClosePlaylistsMouseEnter()}>Добавить в плейлист</button>
                        <button onMouseEnter={() => handleOpenPlaylistsMouseEnter("delete")}
                                onMouseLeave={() => handleClosePlaylistsMouseEnter()}>Удалить из плейлиста</button>
                        {isPlaylistsListOpened && <div className="playlist-page__songs__list__song-card__playlists">
                            {userPlaylists.map((userPlaylist) => (
                                <div className="playlist-page__songs__list__song-card__playlists__playlist">
                                    <div className="playlist-container"
                                         onClick={() => handleActionWithSong(userPlaylist)}>
                                        <div className="playlist-wrapper">
                                            <div className="playlist-image-container">
                                                <img src={getImage(userPlaylist.imageId)}
                                                     alt="Фотка альбома"
                                                     onError={handleImageNotLoaded}/>
                                            </div>
                                            <div className="playlist-name-container">
                                                <p className="playlist-name">{userPlaylist.playlistName}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>}
                    </div>
                )}
            </div>
        </div>
    )
}

export default SongCard