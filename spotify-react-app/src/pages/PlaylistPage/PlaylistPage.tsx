import "./styles/PlaylistPage.css"
// @ts-ignore
import mainImg from "../../assets/mock/playlistpage/playlist_page_placeholder.png"
// @ts-ignore
import play_icon from "../../assets/mock/playlistpage/player_triangle.png"
// @ts-ignore
import like_icon from "../../assets/mock/playlistpage/like.png"
// @ts-ignore
import options_icon from "../../assets/mock/playlistpage/options_icon.png"
import {useContext, useEffect, useState} from "react";
import {SpotifyContext} from "../../index";
import SongCard from "./components/SongCard";

const PlaylistPage = () => {
    const sidebarWidth = 280
    const userStore = useContext(SpotifyContext)
    const [backgroundWidth, setBackgroundWidth] = useState(0)
    const [windowWidth, setWindowWidth] = useState(document.body.clientWidth)
    const playlistName = "Chill Mix"
    const singer1 = "Julia Wong"
    const singer2 = "ayokay"
    const singer3 = "Khalid"
    const songCount = 34
    const madeBy = userStore.user.username
    const playlistTime = "2hr 01min"

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

    return (
        <div className="playlist-page-wrapper">
            <div style={{width: backgroundWidth + 'px'}} className="playlist-page-background"></div>
            <div className="playlist-page">
                <div className="playlist-page__main">
                    <div className="playlist-page__main__img-wrapper">
                        <img src={mainImg} alt="" className="playlist-page__main__img"/>
                    </div>
                    <div className="playlist-page__main__info">
                        <h1 className="playlist-page__main__info__name">
                            {playlistName}
                        </h1>
                        <p className="playlist-page__main__info__singers">
                            <span>{singer1}</span>, <span>{singer2}</span>, <span>{singer3}</span> and more
                        </p>
                        <p className="playlist-page__main__info__additional">
                            Made by <span>{madeBy}</span> ◦ {songCount} songs, {playlistTime}
                        </p>
                    </div>
                </div>
                <div className="playlist-page__songs">
                    <div className="playlist-page__songs__header">
                        <div className="playlist-page__songs__header__buttons">
                            <div className="playlist-page__songs__header__buttons__play">
                                <img src={play_icon} alt="Play"/>
                            </div>
                            <img className="playlist-page__songs__header__buttons__like" src={like_icon} alt="Like"/>
                            <img className="playlist-page__songs__header__buttons__options" src={options_icon}
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
                            <SongCard
                                id="1"
                                name="Slow Grenade"
                                artists={['Ellie Goulding', 'Lauv']}
                                album="Brightest Blue"
                                length="3:37"/>
                            <SongCard
                                id="1"
                                name="Slow Grenade"
                                artists={['Ellie Goulding', 'Lauv']}
                                album="Brightest Blue"
                                length="3:37"/>
                            <SongCard
                                id="1"
                                name="Slow Grenade"
                                artists={['Ellie Goulding', 'Lauv']}
                                album="Brightest Blue"
                                length="3:37"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlaylistPage