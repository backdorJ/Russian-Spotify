import React, {FC, Fragment, useContext, useEffect, useState} from "react";
import {getImage} from "../../http/fileApi";
import {useNavigate} from "react-router-dom";
import {getSong, getSongsByFilter, tryAddSongToFavorites, tryRemoveSongFromFavorites} from "../../http/songApi";
import {ISongCard} from "./interfaces/ISongCard";
import {PlayerContext, UserContext} from "../../index";
import handleImageNotLoaded from "../../functions/handleImageNotLoaded";
import "./styles/SongCard.css"
import LikeIcon from "../Player/components/LikeIcon";
import {editPlaylist, getPlaylistsByFilter} from "../../http/playlistApi";
import {playlistFilters} from "../../http/filters/playlistFilters";
import Playlist from "../../models/Playlist";
import {songFilters} from "../../http/filters/songFilters";
import CreateOrEditSongModal from "../SideBar/components/CreateOrEditSongModal/CreateOrEditSongModal";
import EditSongAuthorModal from "../../pages/PlaylistPage/components/modals/EditSongAuthorModal/EditSongAuthorModal";
import StartIcon from "../Player/components/StartIcon";
import StopIcon from "../Player/components/StopIcon";
// @ts-ignore
import author_icon from '../../assets/song/author_icon.png'
import player from "../Player/Player";
import routeNames from "../../utils/routeNames";

const SongCard: FC<ISongCard> = ({song, order_number, onModalOpen, playlistReloadTrigger, playlist}) => {
    const userStore = useContext(UserContext)
    const playerStore = useContext(PlayerContext)
    const [isPlaying, setAsPlaying] = useState(false);
    const navigate = useNavigate();
    const [isLikedSong, setIsLikedSong] = useState(song.isInFavorite)
    const [isMouseOverPlay, setIsMouseOverPlay] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [showEditAuthorModal, setShowEditAuthorModal] = useState(false)
    let isInLikeProcess = false;
    let artistCount = song.authors.length
    let artistsMapped = song.authors.map((artist, index) => {
        if (index < artistCount - 1)
            return (
                <Fragment>
                    <span
                        onClick={() => navigate(routeNames.AUTHOR_PAGE_NAV + artist.authorName)}>{artist.authorName}</span>,<span> </span>
                </Fragment>
            )
        return (
            <Fragment>
                <span
                    onClick={() => navigate(routeNames.AUTHOR_PAGE_NAV + artist.authorName)}>{artist.authorName}</span>
            </Fragment>
        )
    })

    useEffect(() => {
        if (playerStore.Player.currentSong?.songId === song.songId)
            setAsPlaying(true);
        else
            setAsPlaying(false)
    }, [playerStore.Player.currentSong]);

    useEffect(() => {
        if (showEditModal || showEditAuthorModal)
            document.getElementById("body")!.style.overflowY = 'hidden';
        else
            document.getElementById("body")!.style.overflowY = 'visible';

        if (onModalOpen !== undefined)
            onModalOpen()
    }, [showEditModal, showEditAuthorModal]);
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

    const handleActionWithSong = (choosenPlaylist: Playlist) => {
        if (isAddingSong) {
            AddToPlaylist(choosenPlaylist)
        } else {
            DeleteFromPlaylist(choosenPlaylist)
        }
    }

    const AddToPlaylist = (choosenPlaylist: Playlist) => {
        choosenPlaylist?.songs.push(song)
        editPlaylist(choosenPlaylist.playlistId, choosenPlaylist.playlistName, undefined, choosenPlaylist.songs.map(x => x.songId)).then(response => {
            if (response.status === 200) {
                setUserPlaylists([])
                alert("Песня добавлена успешно")
            }

        }).catch(err => console.log(err));
    }
    const DeleteFromPlaylist = (choosenPlaylist: Playlist) => {
        editPlaylist(choosenPlaylist.playlistId, choosenPlaylist.playlistName, undefined, choosenPlaylist.songs.map(x => x.songId).filter(x => x !== song.songId)).then(response => {
            if (response.status === 200) {
                setUserPlaylists([])
                alert("Песня удалена успешно")
            }

        }).catch(err => console.log(err));
    };

    const getPlaylistsWithSong = async (songId: string) => {
        const playlists = await getPlaylistsByFilter(playlistFilters.userPlaylistsFilter, userStore.user.username, 1, 10);
        const playlistsWithSong = [];

        for (const playlist of playlists.value.playlists) {
            const songs = await getSongsByFilter(songFilters.songsInPlaylistFilter, playlist.playlistId, 1, 100);
            if (songs.songs.some(song => song.songId === songId)) {
                playlistsWithSong.push(playlist);
            }
        }

        return playlistsWithSong
    }

    const getPlaylistsWithoutSong = async (songId: string) => {
        const playlists = await getPlaylistsByFilter(playlistFilters.userPlaylistsFilter, userStore.user.username, 1, 10);
        const playlistsWithoutSong = [];

        for (const playlist of playlists.value.playlists) {
            const songs = await getSongsByFilter(songFilters.songsInPlaylistFilter, playlist.playlistId, 1, 100);
            if (!songs.songs.some(song => song.songId === songId)) {
                playlistsWithoutSong.push(playlist);
            }
        }

        return playlistsWithoutSong
    }

    const handleOpenPlaylistsMouseEnter = async (option: string) => {
        clearTimeout(timeoutId);
        if (option === "add") {
            setAddingSong(true)
            setUserPlaylists(await getPlaylistsWithoutSong(song.songId))
        } else {
            setAddingSong(false)
            setUserPlaylists(await getPlaylistsWithSong(song.songId))
        }

        console.log(userPlaylists)
        setIsPlaylistsListOpened(true);
    };

    const handleClosePlaylistsMouseEnter = () => {
        timeoutId = setTimeout(() => {
            setIsPlaylistsListOpened(false);
        }, 100);
    };

    const handleStartStopClick = () => {
        const audio: any = document.getElementById("audio-player");
        const image: any = document.querySelector(".player-music-image");
        console.log(audio)
        if (playerStore.Player.currentSong?.songId === song.songId) {
            setAsPlaying(prev => !prev);
            if (audio !== null) {
                if (audio?.paused) {
                    playerStore.IsPlaying = true;
                    audio.play();
                    image.style.animation = "3s linear 0s normal none infinite running rot";
                } else {
                    playerStore.IsPlaying = false;
                    audio.pause();
                    image.style.animation = "none";
                }
            }
        }
        else {
            console.log(song)
            playerStore.Player = getSong(song, userStore.user, playlist);
            setAsPlaying(true);
            playerStore.IsPlaying = true;
            audio.play();
            image.style.animation = "3s linear 0s normal none infinite running rot";
        }
        console.log(isPlaying)

        if (playlistReloadTrigger)
            playlistReloadTrigger()
    }

    return (
        <div
            onMouseEnter={() => setIsMouseOverPlay(false)}
            className="playlist-page__songs__list__main__song-card">
            <div
                onClick={handleStartStopClick}
                onMouseEnter={() => setIsMouseOverPlay(true)}
                onMouseLeave={() => setIsMouseOverPlay(false)}
                className="playlist-page__songs__list__main__song-card__id"
                style={{marginRight: isMouseOverPlay ? '17px' : '12px', marginLeft: isMouseOverPlay ? '-5px' : '0'}}>
                {
                    isMouseOverPlay
                        ?
                        isPlaying ?
                            <StartIcon/>
                            : <StopIcon/>
                        : <p>{order_number}</p>
                }
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
                        <p
                            onClick={() => {
                                if (song.authors.map(author => author.authorId).includes(userStore.user.id))
                                    setShowEditModal(true)
                                else
                                    handleStartStopClick()
                            }}>
                            {song.songName}
                        </p>
                        {
                            song.authors.map(author => author.authorId).includes(userStore.user.id) &&
                            <img
                                onClick={() => setShowEditAuthorModal(true)}
                                src={author_icon} alt="Edit authors"/>
                        }
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
                        <div className="music-menu-buttons">
                            <button onMouseEnter={() => handleOpenPlaylistsMouseEnter("add")}
                                    onMouseLeave={() => handleClosePlaylistsMouseEnter()}>Добавить в плейлист
                            </button>
                            <button onMouseEnter={() => handleOpenPlaylistsMouseEnter("delete")}
                                    onMouseLeave={() => handleClosePlaylistsMouseEnter()}>Удалить из плейлиста
                            </button>
                        </div>
                        {isPlaylistsListOpened && <div className="playlist-page__songs__list__song-card__playlists">
                            {userPlaylists.map((userPlaylist) => (
                                <div className="playlist-container"
                                     onClick={() => handleActionWithSong(userPlaylist)}
                                     onMouseEnter={handleMouseEnter}
                                     onMouseLeave={handleMouseLeave}
                                     key={userPlaylist.playlistId}>
                                    <div className="playlist-wrapper">
                                        <div className="playlist-image-container">
                                            <img src={getImage(userPlaylist.imageId)}
                                                 alt="Фотка альбома"
                                                 onError={handleImageNotLoaded}
                                                 className="playlist-image"/>
                                        </div>
                                        <div className="playlist-name-container">
                                            <p className="playlist-name">{userPlaylist.playlistName}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>}
                    </div>
                )}
            </div>
            <CreateOrEditSongModal
                show={showEditModal}
                onHide={() => setShowEditModal(false)}
                song={song}
                reloadTrigger={() => {
                    if (playlistReloadTrigger)
                        playlistReloadTrigger()
                }}/>
            <EditSongAuthorModal
                song={song}
                show={showEditAuthorModal}
                onHide={() => setShowEditAuthorModal(false)}
                reloadTrigger={() => {
                    if (playlistReloadTrigger)
                        playlistReloadTrigger()
                }}/>
        </div>
    )
}

export default SongCard