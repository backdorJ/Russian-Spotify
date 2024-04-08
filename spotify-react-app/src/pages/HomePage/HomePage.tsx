import './styles/HomePage.css'
import {useContext, useEffect, useState} from "react";
import playlistsLittle from "../../utils/mocks/homepage/playlistsLittle";
import PlaylistLittle from "./components/PlaylistLittle";
import discoveryCards from "../../utils/mocks/homepage/discoveryCards";
import DiscoveryCard from "./components/DiscoveryCard";
import playlistsNormal from "../../utils/mocks/homepage/playlistsNormal";
import PlaylistNormal from "./components/PlaylistNormal";
import {UserContext} from "../../index";
import {observer} from "mobx-react-lite";


const HomePage = observer((props: any) => {
    const userStore = useContext(UserContext);
    const [playlistsLittleLoaded, setPlaylistsLittleLoaded] = useState(playlistsLittle)
    const [discoveryCardsLoaded, setDiscoveryCardsLoaded] = useState(discoveryCards)
    const [playlistsNormalLoaded, setPlaylistsNormalLoaded] = useState(playlistsNormal)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [currentTimeMode, setCurrentTimeMode] = useState('good day')
    let sidebarWidth = 280
    let username = userStore.user.username;
    let currentTime = new Date()

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

        setPlaylistsLittleLoaded(playlistsLittle.slice(0, playlistsLittleMaxCount))
        setDiscoveryCardsLoaded(discoveryCards.slice(0, discoveryCardsMaxCount))
        setPlaylistsNormalLoaded(playlistsNormal.slice(0, playlistsNormalMaxCount))
    }, [windowWidth]);

    useEffect(() => {
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
                        playlistsLittleLoaded.map(i => (
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
                            discoveryCardsLoaded.map(i => (
                                <DiscoveryCard
                                    imageUrl={i.imageUrl}
                                    name={i.name}
                                    artistId={i.artistId}
                                    key={i.artistId}/>
                            ))
                        }
                    </div>
                </div>
                <div className="home-page__latest-albums">
                    <h3>Latest albums & playlists</h3>
                    <div className="home-page__latest-albums__cards">
                        {
                            playlistsNormalLoaded.map(i => (
                                <PlaylistNormal
                                    imageUrl={i.imageUrl}
                                    title={i.title}
                                    description={i.description}
                                    playlistId={i.playlistId}
                                    key={i.playlistId}/>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
})

export default HomePage