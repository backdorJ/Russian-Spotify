import React, {FC, useState} from 'react';
import {IFavoriteMusic} from "./interfaces/IFavoriteMusic";
import Song from "../../../commonComponents/Song/Song";
import "./styles/FavoriteMusic.css"
import {useNavigate, useParams} from "react-router-dom";

/** Компонент для превью треков
 * @param favoriteSongs - Song[] треки*/
const FavoriteMusic : FC<IFavoriteMusic> = ( {favoriteSongs}) => {
    const params = useParams();
    const navigate = useNavigate();

    const link = params.authorName ? `/songs/${params.authorName}` : "/favorite-songs";

    const [songs, setSongs] = useState(favoriteSongs);


    return (
        <>
            <div className="music-container">
                <div className="music-container-wrapper">
                    {songs.map((song, index) => <Song song={song} />)}
                </div>
                <button onClick={() => navigate(link)} className="show-all-music-button">Показать все</button>
            </div>
        </>
    );
};

export default FavoriteMusic;