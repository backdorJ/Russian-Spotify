import './styles/HomePage.css'
import {useContext, useEffect, useState} from "react";
import playlistsLittle from "../../utils/mocks/homepage/playlistsLittle";
import PlaylistLittle from "./components/PlaylistLittle";
import DiscoveryCard from "./components/DiscoveryCard";
import PlaylistNormal from "./components/PlaylistNormal";
import {UserContext} from "../../index";
import {observer} from "mobx-react-lite";
import Playlist from "../../models/Playlist";
import Author from "../../models/Author";
import {getAuthorsByFilter} from "../../http/authorApi";
// @ts-ignore
import {authorFilters} from "../../http/filters/authorFilters";
import {getPlaylistsByFilter} from "../../http/playlistApi";
import {playlistFilters} from "../../http/filters/playlistFilters";


const HomePage = observer((props: any) => {
    const userStore = useContext(UserContext);
    const [isLoadedTrigger, setIsLoadedTrigger] = useState(false)
    const [playlistsNormal, setPlaylistsNormal] = useState(new Array<Playlist>())
    const [discoveryCards, setDiscoveryCards] = useState(new Array<Author>())
    const [playlistsLittleShow, setPlaylistsLittleShow] = useState(playlistsLittle)
    const [discoveryCardsShow, setDiscoveryCardsShow] = useState(new Array<Author>())
    const [playlistsNormalShow, setPlaylistsNormalShow] = useState(new Array<Playlist>())
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [currentTimeMode, setCurrentTimeMode] = useState('good day')
    let sidebarWidth = 280
    let username = userStore.user.username;
    let currentTime = new Date()

    useEffect(() => {
        getAuthorsByFilter(authorFilters.authorShuffledFilter, "smth", 2, 1, 10)
            .then(response => setDiscoveryCards(response))
            .then(() => {
                getPlaylistsByFilter(playlistFilters.albumShuffledFilter, "smth", 6, 1)
                    .then(response => setPlaylistsNormal([...response]))
                    .then(() => setIsLoadedTrigger(true))
            })
        let currentHours = currentTime.getHours()
        if (currentHours >= 23 && currentHours < 4)
            setCurrentTimeMode('good night time')
        if (currentHours >= 4 && currentHours < 11)
            setCurrentTimeMode('good morning')
        if (currentHours >= 11 && currentHours < 16)
            setCurrentTimeMode('good afternoon')
        if (currentHours >= 16 && currentHours < 23)
            setCurrentTimeMode('good evening')


        window.onresize = updateWindowWidth
        return function () {
            window.onresize = null
        }
    }, []);

    useEffect(() => {
        let availableWidth = windowWidth - sidebarWidth - 80
        let playlistsLittleMaxCount = 0
        let discoveryCardsMaxCount = 0
        let playlistsNormalMaxCount = 0

        let plWidthCounted = 0
        while (plWidthCounted < availableWidth) {
            if (plWidthCounted > 0) {
                playlistsLittleMaxCount++
                plWidthCounted += 20
            }

            plWidthCounted += 360
        }
        playlistsLittleMaxCount = Math.max(1, playlistsLittleMaxCount)

        let dcWidthCounted = 0
        while (dcWidthCounted < availableWidth) {
            if (dcWidthCounted > 0) {
                discoveryCardsMaxCount++
                dcWidthCounted += 20
            }

            dcWidthCounted += 232
        }
        discoveryCardsMaxCount = Math.max(1, discoveryCardsMaxCount)

        let pnWidthCounted = 0
        while (pnWidthCounted < availableWidth) {
            if (pnWidthCounted > 0) {
                playlistsNormalMaxCount++
                pnWidthCounted += 20
            }

            pnWidthCounted += 232
        }
        playlistsNormalMaxCount = Math.max(1, playlistsNormalMaxCount)

        setPlaylistsLittleShow(playlistsLittle.slice(0, playlistsLittleMaxCount))
        setDiscoveryCardsShow(discoveryCards.slice(0, discoveryCardsMaxCount))
        setPlaylistsNormalShow(playlistsNormal.slice(0, playlistsNormalMaxCount))
    }, [windowWidth, isLoadedTrigger]);

    const updateWindowWidth = () => {
        setWindowWidth(window.innerWidth)
    }

    return (
        <div style={{display: "flex"}}>
            <div className="home-page">
                <div className="home-page__header">
                    <h2>{currentTimeMode}, {username}</h2>
                </div>
                <div className="home-page__user-playlists">
                    {
                        playlistsLittleShow.map(i => (
                            <PlaylistLittle
                                imageUrl={i.imageUrl}
                                name={i.name}
                                playlistId={i.playlistId}
                                key={i.playlistId}/>
                        ))
                    }
                </div>
                <div className="home-page__discovery">
                    <h3>Discovery Picks for you</h3>
                    <div className="home-page__discovery__cards">
                        {
                            discoveryCardsShow.map(i => (
                                <DiscoveryCard
                                    author={i}/>
                            ))
                        }
                    </div>
                </div>
                <div className="home-page__latest-albums">
                    <h3>Recommended albums</h3>
                    <div className="home-page__latest-albums__cards">
                        {
                            playlistsNormalShow.map(i => (
                                <PlaylistNormal playlist={i}/>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
})

export default HomePage