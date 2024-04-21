import React, {useContext, useEffect, useState} from 'react';
import {PlayerContext, UserContext} from "../../index";
import Song from "../../models/Song";
import {getSong, getSongsByFilter} from "../../http/songApi";
// @ts-ignore
import play_song from "../../assets/mock/playlistpage/player_triangle.png";
import SongCard from "../PlaylistPage/components/SongCard";
import {useParams} from "react-router-dom";
import {formatDuration} from "../../functions/formatDuration";
import {songFilters} from "../../http/filters/songFilters";

const AuthorSongsPlaylist = () => {
    const sidebarWidth = 280
    const userStore = useContext(UserContext);
    const playerStore = useContext(PlayerContext);
    const [backgroundWidth, setBackgroundWidth] = useState(0)
    const [windowWidth, setWindowWidth] = useState(document.body.clientWidth)
    const [songs, setSongs] = useState<Song[]>([])
    let stop = false;
    const [getting, setGetting] = useState(false);
    const [page, setPage] = useState(1)

    const authorName = useParams().authorName!;

    useEffect(() => {
        const fetchData = async () => {
            const result: Song[] =
                await getSongsByFilter(songFilters.authorSongsFilter, authorName, page, 20);

            setPage(page+1);
            if(result.length === 0)
                stop = true;

            if(result.length === 0)
                stop = true;

            setSongs([...songs, ...result]);
            setGetting(false);
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

    return (
        <div className="playlist-page-wrapper">
            <div style={{width: backgroundWidth + 'px'}} className="playlist-page-background"></div>
            <div className="playlist-page">
                <div className="playlist-page__main">
                    <div className="playlist-page__main__info">
                        <h1 className="playlist-page__main__info__name">
                            Songs by {authorName}
                        </h1>
                    </div>
                </div>
                <div className="playlist-page__songs">
                    <div className="playlist-page__songs__header">
                        <div className="playlist-page__songs__header__buttons">
                            <div className="playlist-page__songs__header__buttons__play">
                                <img onClick={() => handlePlay(songs[0])} src={play_song} alt="Play"/>
                            </div>
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
                                <p></p>
                            </div>
                            <div className="playlist-page__songs__list__header__added">
                                <p></p>
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
                                    />
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default AuthorSongsPlaylist;