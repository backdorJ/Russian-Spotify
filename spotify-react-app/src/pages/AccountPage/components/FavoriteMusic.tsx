import React, {FC, useState} from 'react';
import {IFavoriteMusic} from "./interfaces/IFavoriteMusic";
import Song from "../../../commonComponents/Song/Song";
import SongModel from "../../../models/Song"
import "./styles/FavoriteMusic.css"
import {useNavigate, useParams} from "react-router-dom";
import {getFavouriteSongs} from "../../../http/songApi";

/** Компонент для любимых треков в AccountPage
 * @param favoriteSongs - Song[] любимые треки*/

const FavoriteMusic : FC<IFavoriteMusic> = ( {favoriteSongs}) => {
    const params = useParams();
    const navigate = useNavigate();

    const link = params.authorName ? `/songs/${params.authorName}` : "/favorite-songs";

    return (
        <>
            <div className="music-container">
                <div className="music-container-wrapper">
                    {favoriteSongs.map((song) => <Song song={song} />)}
                </div>
                <button onClick={() => navigate(link)} className="show-all-music-button">Показать все</button>
            </div>
        </>
    );
};

export default FavoriteMusic;