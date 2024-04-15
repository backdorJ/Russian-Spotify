import "./styles/PlaylistPage.css"
// @ts-ignore
import mainImg from "../../assets/mock/playlistpage/playlist_page_placeholder.png"
// @ts-ignore
import play_icon from "../../assets/mock/playlistpage/player_triangle.png"
// @ts-ignore
import like_icon from "../../assets/mock/playlistpage/like.png"
// @ts-ignore
import like_icon_hover from "../../assets/mock/playlistpage/songs/liked_icon_svg.svg"
// @ts-ignore
import options_icon from "../../assets/mock/playlistpage/options_icon.png"
import {Fragment, useContext, useEffect, useState} from "react";
import {PlayerContext, UserContext} from "../../index";
import SongCard from "./components/SongCard";
import {useParams} from "react-router-dom";
import {getPlaylistInfo} from "../../http/playlistApi";
import Playlist from "../../models/Playlist";
import {getImage} from "../../http/fileApi";
import {getSong} from "../../http/songApi";
import Song from "../../models/Song";

const PlaylistPage = () => {
    const { id } = useParams();
    const sidebarWidth = 280
    const userStore = useContext(UserContext);
    const playerStore = useContext(PlayerContext);
    const [backgroundWidth, setBackgroundWidth] = useState(0)
    const [windowWidth, setWindowWidth] = useState(document.body.clientWidth)
    const [isHover, setIsHover] = useState(false)
    const [playlistInfo, setPlaylistInfo] = useState(new Playlist())

    useEffect(() => {
        getPlaylistInfo(id).then(r => setPlaylistInfo(r));
    }, [])

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

    const formatDuration = (totalSeconds: number) => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        return `${minutes}m ${seconds}s`;
    };

    /** Обновление плеера(текущей песни) */
    const handlePlay = (song: Song) => {
        playerStore.Player = getSong(song, userStore.user);
    }

    const allAuthorsTogetherUnique = new Array<string>()
    playlistInfo.songs.forEach(i => {
        i.authors.forEach(e => {
            if (allAuthorsTogetherUnique.includes(e))
                return
            allAuthorsTogetherUnique.push(e)
        })
    })

    const authorsMapped = allAuthorsTogetherUnique.map((author, index) => {
        if (index < allAuthorsTogetherUnique.length - 1)
            return (<Fragment><span>{author}</span>, </Fragment>)
        return (<Fragment><span>{author}</span></Fragment>)
    })

    return (
        <div className="playlist-page-wrapper">
            <div style={{width: backgroundWidth + 'px'}} className="playlist-page-background"></div>
            <div className="playlist-page">
                <div className="playlist-page__main">
                    <div className="playlist-page__main__img-wrapper">
                        <img src={getImage(playlistInfo.imageId)} alt="" className="playlist-page__main__img"/>
                    </div>
                    <div className="playlist-page__main__info">
                        <h1 className="playlist-page__main__info__name">
                            {playlistInfo.playlistName}
                        </h1>
                        <p className="playlist-page__main__info__singers">
                            <span>{authorsMapped}</span>
                        </p>
                        <p className="playlist-page__main__info__additional">
                            Made by <span>{playlistInfo.authorName}</span> ◦ {playlistInfo.songs.length} songs, {formatDuration(playlistInfo.songs.reduce((sum, current) => sum + current.duration, 0))}
                        </p>
                    </div>
                </div>
                <div className="playlist-page__songs">
                    <div className="playlist-page__songs__header">
                        <div className="playlist-page__songs__header__buttons">
                            <div className="playlist-page__songs__header__buttons__play">
                                <img onClick={() => handlePlay(playlistInfo.songs[0])} src={play_icon} alt="Play"/>
                            </div>
                            <div className="playlist-page__songs__header__buttons__like-wrapper">
                                <img
                                    onMouseEnter={() => setIsHover(true)}
                                    className={`playlist-page__songs__header__buttons__like ${isHover ? "img-hidden" : "img-not-hidden"}`}
                                    src={like_icon}
                                    alt="Like"/>
                                <img
                                    onMouseEnter={() => setIsHover(true)}
                                    onMouseLeave={() => setIsHover(false)}
                                    className={`playlist-page__songs__header__buttons__like ${isHover ? "img-not-hidden" : "img-hidden"}`}
                                    src={like_icon_hover}
                                    alt="Like"/>
                            </div>
                            <img
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
                            <div className="playlist-page__songs__list__header__added">
                                <p>DATE ADDED</p>
                            </div>
                            <div className="">
                                <p>LENGTH</p>
                            </div>
                        </div>
                        <div className="playlist-page__songs__list__divider"></div>
                        <div className="playlist-page__songs__list__main">
                            {
                                playlistInfo.songs.map((song, index) => {
                                    return <SongCard
                                        song={song}
                                        handlePlay={handlePlay}
                                        id={index + 1}
                                        name={song.songName}
                                        album={playlistInfo.playlistName}
                                        artists={song.authors}
                                        length={formatDuration(song.duration)}
                                        isLiked={song.isHave}
                                        imageId={song.imageId}
                                    />
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlaylistPage