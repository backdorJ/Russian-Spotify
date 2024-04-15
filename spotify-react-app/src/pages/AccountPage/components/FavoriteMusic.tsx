import React, {FC} from 'react';
import {IFavoriteMusic} from "./interfaces/IFavoriteMusic";
import Song from "../../../commonComponents/Song/Song";
import "./styles/FavoriteMusic.css"

/** Компонент для любимых треков в AccountPage
 * @param favoriteSongs - Song[] любимые треки*/

const FavoriteMusic : FC<IFavoriteMusic> = ( {favoriteSongs}) => {
    return (
        <>
            <div className="music-container">
                <div className="music-container-wrapper">
                    {favoriteSongs.map((song) => <Song song={song} />)}
                </div>
                <button className="show-all-music-button">Показать все</button>
            </div>
        </>
    );
};

export default FavoriteMusic;