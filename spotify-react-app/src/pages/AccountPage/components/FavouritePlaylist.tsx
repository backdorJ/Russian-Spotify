import {IFavouritePlaylist} from "./interfaces/IFavouritePlaylist";
import {FC, useState} from "react";
import playlistsNormal from "../../../utils/mocks/homepage/playlistsNormal";
import '../styles/AccountPage.css'
import Playlist from "../../../commonComponents/Playlist/Playlist";
import {Link} from "react-router-dom";

const FavouritePlaylist : FC<IFavouritePlaylist> = ({favouritePlaylists}) => {
    const [currentStartPlaylistIndex, setCurrentStartPlaylistIndex] = useState(0);
    const [playlistsNormalLoaded, setPlaylistsNormalLoaded] = useState(playlistsNormal)

    const canScroll = (index: number, step: number, loadedList: any[]) => {
        const newIndex = index + step;
        return loadedList.length > 0 && newIndex < loadedList.length && newIndex >= 0;
    };
    const scroll = (setter: any, index: number, step: number, loadedList: any[]) => {
        if (canScroll(index, step, loadedList)) {
            setter(index + step);
        }
    };

    return (
        <>
            <h3>Любимые альбомы & плейлисты</h3>
            <div className="cards-container">
                <button className="arrow-button arrow-button-left"
                        onClick={() => scroll(setCurrentStartPlaylistIndex, currentStartPlaylistIndex, -3, playlistsNormalLoaded)}
                        disabled={!canScroll(currentStartPlaylistIndex, -3, playlistsNormalLoaded)}>&lt;</button>
                    <div className="home-page__latest-albums__cards ">
                        {
                            favouritePlaylists.map(playlist => (
                                <Link to={`/playlist/${playlist.playlistId}`}>
                                    <div className="card">
                                        <Playlist playlist={playlist}/>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                <button className="arrow-button arrow-button-right"
                        onClick={() => scroll(setCurrentStartPlaylistIndex, currentStartPlaylistIndex, 3, playlistsNormalLoaded)}
                        disabled={!canScroll(currentStartPlaylistIndex, 3, playlistsNormalLoaded)}>&gt;</button>
            </div>
        </>
    )
}

export default FavouritePlaylist;