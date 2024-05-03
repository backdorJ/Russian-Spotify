import "./styles/PlaylistPage.css"
// @ts-ignore
import play_icon from "../../assets/mock/playlistpage/player_triangle.png"
// @ts-ignore
import options_icon from "../../assets/mock/playlistpage/options_icon.png"
// @ts-ignore
import favoriteSongsPlaylistImage from "../../assets/playlist/favorite-songs-playlist-image.png"
import React, {useContext, useEffect, useState} from "react";
import {PlayerContext, UserContext} from "../../index";
import {useNavigate, useParams} from "react-router-dom";
import {getPlaylistInfo, tryAddPlaylistToFavorites, tryRemovePlaylistFromFavorites} from "../../http/playlistApi";
import Playlist from "../../models/Playlist";
import {getSong} from "../../http/songApi";
import Song from "../../models/Song";
import {formatDuration} from "../../functions/formatDuration";
import {PlaylistType} from "./enums/playlistTypes";
import {$authHost} from "../../http";
import {getImage} from "../../http/fileApi";
import CreateOrEditPlaylistModal
    from "../../commonComponents/SideBar/components/CreatePlaylistModal/CreateOrEditPlaylistModal";
import handleImageNotLoaded from "../../functions/handleImageNotLoaded";
import SongCard from "../../commonComponents/SongCard/SongCard";
import LikeIcon from "../../commonComponents/Player/components/LikeIcon";

const PlaylistPage = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const sidebarWidth = 280
    const userStore = useContext(UserContext);
    const playerStore = useContext(PlayerContext);
    const [reloadTrigger, setReloadTrigger] = useState(false)
    const [backgroundWidth, setBackgroundWidth] = useState(0)
    const [windowWidth, setWindowWidth] = useState(document.body.clientWidth)
    const [currentPlaylist, setCurrentPlaylist] = useState(new Playlist())
    const [songs, setSongs] = useState<Song[]>([]);
    let stop = false;
    const [getting, setGetting] = useState(false);
    const [page, setPage] = useState(1)
    const [isLikedPlaylist, setIsLikedPlaylist] = useState(currentPlaylist.isInFavorite);
    /** Находится ли песня в процессе добавления в понравившееся */
    let isInLikeProcess = false;
    const [showEditModal, setShowEditModal] = useState(false)

    useEffect(() => {
        if (id === 'favorite-songs') {
            setCurrentPlaylist(Playlist.init("",
                "Favorite Songs",
                "",
                "",
                new Date(),
                false,
                true));
            currentPlaylist.setPlaylistType(PlaylistType.FavoriteSongs);
            setIsLikedPlaylist(true);
        } else if (id?.includes('author-')) {
            let authorName = id.split("author-")[1];
            $authHost.get(`api/Author/Author?Name=${authorName}`)
                .then(x => {
                    setCurrentPlaylist(Playlist.init("",
                        `Songs by ${x.data.name}`,
                        x.data.authorPhotoId,
                        x.data.name,
                        new Date(),
                        false,
                        false));
                })
            currentPlaylist.setPlaylistType(PlaylistType.ArtistSongs);
        } else {
            currentPlaylist.setPlaylistType(PlaylistType.Playlist);
            getPlaylistInfo(id).then(r => {
                setCurrentPlaylist(r);
                setIsLikedPlaylist(r.isInFavorite);
            });
        }

        currentPlaylist.getSongs(page).then(x => setSongs(x));
    }, [reloadTrigger])

    useEffect(() => {
        const fetchData = async () => {
            await currentPlaylist.getMoreSongs(page + 1).then(x => setSongs(x))

            setPage(page + 1)

            if (currentPlaylist.songs.length === 0)
                stop = true;

            if (songs.length > 0)
                songs[songs.length - 1].nextSong = currentPlaylist.songs[0];

            setSongs([...songs, ...currentPlaylist.songs]);
            setGetting(false);
        };

        if (!getting && currentPlaylist.playlistType != null) {
            fetchData().then(_ => console.log("fetched"));
        }
    }, [getting]);

    const updateWindowWidth = () => {
        setWindowWidth(document.body.clientWidth)
    }

    useEffect(() => {
        updateWindowWidth()
    }, []);

    useEffect(() => {
        window.onresize = updateWindowWidth
        return function () {
            window.onresize = null
        }
    }, []);

    useEffect(() => {
        setBackgroundWidth(windowWidth - sidebarWidth)
    }, [windowWidth]);

    /** Обновление плеера(текущей песни) */
    const handlePlay = (song: Song) => {
        playerStore.Player = getSong(song, userStore.user, currentPlaylist);
    }

    useEffect(() => {
        document.addEventListener("scroll", scrollHandler);

        return function () {
            document.removeEventListener("scroll", scrollHandler);
        };
    }, []);

    const scrollHandler = (event: any) => {
        if ((event.target.documentElement.scrollHeight - (event.target.documentElement.scrollTop + window.innerHeight) < 100)
            && !stop && !getting) {
            setGetting(true);
        }
    }

    const allAuthorsTogetherUnique = new Array<string>()
    songs.forEach(i => {
        i.authors.forEach(e => {
            if (allAuthorsTogetherUnique.includes(e))
                return
            allAuthorsTogetherUnique.push(e)
        })
    })

    const handleLikeClick = () => {
        if (!isInLikeProcess) {
            isInLikeProcess = true;
            if (!currentPlaylist.isInFavorite) {
                tryAddPlaylistToFavorites(currentPlaylist.playlistId)
                    .then(isSuccessful => {
                        if (isSuccessful) {
                            setIsLikedPlaylist(true);
                            isInLikeProcess = false;
                            currentPlaylist.isInFavorite = true;
                        }
                    });
            } else {
                tryRemovePlaylistFromFavorites(currentPlaylist.playlistId)
                    .then(isSuccessful => {
                        if (isSuccessful) {
                            setIsLikedPlaylist(false);
                            isInLikeProcess = false;
                            currentPlaylist.isInFavorite = false;
                        }
                    });
            }
        }
    }

    return (
        <div className="playlist-page-wrapper">
            <div style={{width: backgroundWidth + 'px'}} className="playlist-page-background"></div>
            <div className="playlist-page">
                <div className="playlist-page__main">
                    <div className="playlist-page__main__img-wrapper">
                        {PlaylistType.FavoriteSongs !== currentPlaylist.playlistType &&
                            <img src={getImage(currentPlaylist.imageId)} alt="" className="playlist-page__main__img"
                                 onError={handleImageNotLoaded}/>}
                        {PlaylistType.FavoriteSongs === currentPlaylist.playlistType &&
                            <img src={favoriteSongsPlaylistImage} alt="" className="playlist-page__main__img"
                                 onError={handleImageNotLoaded}/>}
                    </div>
                    <div className="playlist-page__main__info">
                        <h1 className="playlist-page__main__info__name">
                            {currentPlaylist.playlistName}
                        </h1>
                        <p className="playlist-page__main__info__additional">
                            Made by <span
                            onClick={() => navigate(`/author/${currentPlaylist.authorName}`)}>{currentPlaylist.authorName}</span> ◦ {songs.length} songs, {formatDuration(songs.reduce((sum, current) => sum + current.duration, 0))}
                        </p>
                    </div>
                </div>
                <div className="playlist-page__songs">
                    <div className="playlist-page__songs__header">
                        <div className="playlist-page__songs__header__buttons">
                            <div className="playlist-page__songs__header__buttons__play"
                                 onClick={() => handlePlay(songs[0])}>
                                <img src={play_icon} alt="Play"/>
                            </div>
                            {currentPlaylist.playlistType === PlaylistType.Playlist &&
                                <div className="playlist-page__songs__header__buttons__like-wrapper">
                                    <LikeIcon onClick={handleLikeClick} isLiked={isLikedPlaylist}
                                              classname="like-icon"/>
                                </div>
                            }
                            <img
                                onClick={() => setShowEditModal(true)}
                                className="playlist-page__songs__header__buttons__options"
                                src={options_icon}
                                alt="Options"/>
                        </div>
                    </div>
                    <div className="playlist-page__songs__list">
                        <div className="playlist-page__songs__list__header">
                            <div className="playlist-page__songs__list__header__id">
                                <p>#</p>
                            </div>
                            <div className="playlist-page__songs__list__header__title">
                                <p>TITLE</p>
                            </div>
                            <div className="playlist-page__songs__list__header__album">
                                <p>ALBUM</p>
                            </div>
                            <div className="">
                                <p>LENGTH</p>
                            </div>
                        </div>
                        <div className="playlist-page__songs__list__divider"></div>
                        <div className="playlist-page__songs__list__main">
                            {
                                songs.map((song, index) => {
                                    return <SongCard
                                        song={song}
                                        order_number={index + 1}
                                        playlist={currentPlaylist}
                                    />
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
            <CreateOrEditPlaylistModal
                show={showEditModal}
                onHide={() => setShowEditModal(false)}
                playlist={currentPlaylist}
                songsIds={songs.map(i => i.songId)}
                reloadTrigger={() => setReloadTrigger(prev => !prev)}/>
        </div>
    )
}

export default PlaylistPage