import {IFavouritePlaylist} from "./interfaces/IFavouritePlaylist";
import {FC, useState} from "react";
import '../styles/AccountPage.css'
import Playlist from "../../../commonComponents/Playlist/Playlist";

const FavouritePlaylist: FC<IFavouritePlaylist> = ({favouritePlaylists}) => {
    const [currentStartPlaylistIndex, setCurrentStartPlaylistIndex] = useState(0);
    const visibleFavouritePlaylists = favouritePlaylists.slice(currentStartPlaylistIndex, currentStartPlaylistIndex + 3);

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
            <div className="cards-container">
                <button className="arrow-button arrow-button-left"
                        onClick={() => scroll(setCurrentStartPlaylistIndex, currentStartPlaylistIndex, -3, favouritePlaylists)}
                        disabled={!canScroll(currentStartPlaylistIndex, -3, favouritePlaylists)}>&lt;</button>
                <div className="home-page__latest-albums__cards ">
                    {
                        visibleFavouritePlaylists.map(playlist => (
                            <div className="card">
                                <Playlist playlist={playlist}/>
                            </div>
                        ))
                    }
                </div>
                <button className="arrow-button arrow-button-right"
                        onClick={() => scroll(setCurrentStartPlaylistIndex, currentStartPlaylistIndex, 3, favouritePlaylists)}
                        disabled={!canScroll(currentStartPlaylistIndex, 3, favouritePlaylists)}>&gt;</button>
            </div>
        </>
    )
}

export default FavouritePlaylist;