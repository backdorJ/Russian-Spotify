import React, {FC, useState} from 'react';
import {IFavouriteMusic} from "./Interfaces/IFavouriteMusic";
import "./styles/FavouriteMusic.css"
import {useNavigate, useParams} from "react-router-dom";
import SongCard from "../SongCard/SongCard";
import routeNames from "../../utils/routeNames";
import Song from "../../models/Song";
import Playlist from "../../models/Playlist";

/** Компонент для превью треков
 * @param favoriteSongs - SongCard[] треки*/
const FavouriteMusic: FC<IFavouriteMusic> = ({favouriteSongs, playlistReloadTrigger}) => {
    const params = useParams();
    const navigate = useNavigate();

    const link = params.authorName ? routeNames.AUTHOR_SONGS_ROUTE + params.authorName : routeNames.FAVORITE_SONGS;

    const [songs] = useState(favouriteSongs);
    const [playlist] = useState(new Playlist())
    playlist.songs = favouriteSongs

    return (
        <>
            <div className="music-container">
                <div className="music-container-wrapper">
                    {songs.map((song: Song, index: number) => <SongCard song={song} order_number={index + 1}
                                                                        onModalOpen={undefined}
                                                                        playlistReloadTrigger={playlistReloadTrigger}
                                                                        playlist={playlist}/>)}
                </div>
                <button onClick={() => navigate(link)} className="show-all-music-button">Показать все</button>
            </div>
        </>
    );
};

export default FavouriteMusic;