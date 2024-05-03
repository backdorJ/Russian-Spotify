import React, {FC, useState} from 'react';
import {IFavouriteMusic} from "./Interfaces/IFavouriteMusic";
import "./styles/FavouriteMusic.css"
import {useNavigate, useParams} from "react-router-dom";
import SongCard from "../SongCard/SongCard";
import routeNames from "../../utils/routeNames";

/** Компонент для превью треков
 * @param favoriteSongs - SongCard[] треки*/
const FavouriteMusic: FC<IFavouriteMusic> = ({Playlist}) => {
    const params = useParams();
    const navigate = useNavigate();

    const link = params.authorName ? routeNames.AUTHOR_SONGS_ROUTE + params.authorName : routeNames.FAVORITE_SONGS;

    const [songs] = useState(Playlist.songs);

    return (
        <>
            <div className="music-container">
                <div className="music-container-wrapper">
                    {songs.map((song, index) => <SongCard song={song} order_number={index + 1}
                                                          current_playlist={Playlist}/>)}
                </div>
                <button onClick={() => navigate(link)} className="show-all-music-button">Показать все</button>
            </div>
        </>
    );
};

export default FavouriteMusic;