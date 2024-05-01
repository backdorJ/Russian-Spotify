import React, {FC, useState} from 'react';
import {IMusic} from "./Interfaces/IMusic";
import "./styles/Music.css"
import {useNavigate, useParams} from "react-router-dom";
import SongCard from "../SongCard/SongCard";

/** Компонент для превью треков
 * @param favoriteSongs - SongCard[] треки*/
const Music: FC<IMusic> = ({Songs}) => {
    const params = useParams();
    const navigate = useNavigate();

    const link = params.authorName ? `/playlist/author-${params.authorName}` : "/playlist/favorite-songs";

    const [songs, setSongs] = useState(Songs);

    return (
        <>
            <div className="music-container">
                <div className="music-container-wrapper">
                    {songs.map((song, index) => <SongCard song={song} order_number={index + 1} current_playlist={songs}/>)}
                </div>
                <button onClick={() => navigate(link)} className="show-all-music-button">Показать все</button>
            </div>
        </>
    );
};

export default Music;