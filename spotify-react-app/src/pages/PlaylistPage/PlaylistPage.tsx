import "./styles/PlaylistPage.css"
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
import {useNavigate, useParams} from "react-router-dom";
import {getPlaylistInfo} from "../../http/playlistApi";
import Playlist from "../../models/Playlist";
import {getImage} from "../../http/fileApi";
import {getSong, getSongsByFilter} from "../../http/songApi";
import Song from "../../models/Song";
import {formatDuration} from "../../functions/formatDuration";
import {songFilters} from "../../http/filters/songFilters";

const PlaylistPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const sidebarWidth = 280
    const userStore = useContext(UserContext);
    const playerStore = useContext(PlayerContext);
    const [backgroundWidth, setBackgroundWidth] = useState(0)
    const [windowWidth, setWindowWidth] = useState(document.body.clientWidth)
    const [isHover, setIsHover] = useState(false)
    const [playlistInfo, setPlaylistInfo] = useState(new Playlist())
    const [songs, setSongs] = useState<Song[]>([]);
    let stop = false;
    const [getting, setGetting] = useState(false);
    const [page, setPage] = useState(1)

    useEffect(() => {
        getPlaylistInfo(id).then(r => setPlaylistInfo(r));
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const result: Song[] =
                await getSongsByFilter(songFilters.songsInPlaylistFilter, id!, page, 50);

            setPage(page+1);

            if(result.length === 0)
                stop = true;

            if(songs.length > 0)
                songs[songs.length - 1].nextSong = result[0];

            setSongs([...songs, ...result]);
            setGetting(false);
            console.log(page);
        };

        if (!getting) {
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
        playerStore.Player = getSong(song, userStore.user);
    }

    useEffect(() => {
        document.addEventListener("scroll", scrollHandler);

        return function () {
            document.removeEventListener("scroll", scrollHandler);
        };
    }, []);

    const scrollHandler = (event:any) => {
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

    const authorsMapped = allAuthorsTogetherUnique.map((author, index) => {
        if (index < allAuthorsTogetherUnique.length - 1)
            return (<Fragment><span onClick={() => navigate(`/author/${author}`)}>{author}</span>, </Fragment>)
        return (<Fragment><span onClick={() => navigate(`/author/${author}`)}>{author}</span></Fragment>)
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
                            Made by <span onClick={() => navigate(`/author/${playlistInfo.authorName}`)}>{playlistInfo.authorName}</span> ◦ {songs.length} songs, {formatDuration(songs.reduce((sum, current) => sum + current.duration, 0))}
                        </p>
                    </div>
                </div>
                <div className="playlist-page__songs">
                    <div className="playlist-page__songs__header">
                        <div className="playlist-page__songs__header__buttons">
                            <div className="playlist-page__songs__header__buttons__play">
                                <img onClick={() => handlePlay(songs[0])} src={play_icon} alt="Play"/>
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
                                songs.map((song, index) => {
                                    return <SongCard
                                        song={song}
                                        handlePlay={handlePlay}
                                        id={index + 1}
                                        name={song.songName}
                                        album={playlistInfo.playlistName}
                                        artists={song.authors}
                                        length={formatDuration(song.duration)}
                                        isLiked={song.isInFavorite}
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