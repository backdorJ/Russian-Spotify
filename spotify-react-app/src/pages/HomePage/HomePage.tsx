import './styles/HomePage.css'
import {FC} from "react";
import playlistsLittle from "../../utils/mocks/homepage/playlistsLittle";
import PlaylistsLittle from "../../utils/mocks/homepage/playlistsLittle";
import PlaylistLittle from "./components/PlaylistLittle";
import discoveryCards from "../../utils/mocks/homepage/discoveryCards";
import DiscoveryCard from "./components/DiscoveryCard";
import playlistsNormal from "../../utils/mocks/homepage/playlistsNormal";
import PlaylistNormal from "./components/PlaylistNormal";

const HomePage: FC<{}> = () => {


    return (
        <div className="home-page">
            <div className="home-page__header">
                <h2>Good Evening</h2>
            </div>
            <div className="home-page__user-playlists">
                {
                    playlistsLittle.map(i => (
                        <PlaylistLittle
                            imageUrl={i.imageUrl}
                            name={i.name}
                            playlistId={i.playlistId}/>
                    ))
                }
            </div>
            <div className="home-page__discovery">
                <h3>Discovery Picks for you</h3>
                <div className="home-page__discovery__cards">
                    {
                        discoveryCards.map(i => (
                            <DiscoveryCard
                                imageUrl={i.imageUrl}
                                name={i.name}
                                artistId={i.artistId}/>
                        ))
                    }
                </div>
            </div>
            <div className="home-page__latest-albums">
                <h3>Latest albums & playlists</h3>
                <div className="home-page__latest-albums__cards">
                    {
                        playlistsNormal.map(i => (
                            <PlaylistNormal
                                imageUrl={i.imageUrl}
                                title={i.title}
                                description={i.description}
                                playlistId={i.playlistId}/>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default HomePage