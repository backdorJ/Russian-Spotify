import React, {FC, useState} from 'react';
import {IFavoriteMusic} from "./interfaces/IFavoriteMusic";
import "./styles/FavoriteMusic.css"
import {useNavigate, useParams} from "react-router-dom";
import SongCard from "../../PlaylistPage/components/SongCard";

/** Компонент для превью треков
 * @param favoriteSongs - Song[] треки*/
const FavoriteMusic: FC<IFavoriteMusic> = ({favoriteSongs}) => {
    const params = useParams();
    const navigate = useNavigate();

    const link = params.authorName ? `/playlist/author-${params.authorName}` : "/playlist/favorite-songs";

    const [songs, setSongs] = useState(favoriteSongs);

    return (
        <>
            <div className="music-container">
                <div className="music-container-wrapper">
                    {songs.map((song, index) => (
                        <SongCard song={song} order_number={index + 1} onModalOpen={undefined}/>
                    ))}
                </div>
                <button onClick={() => navigate(link)} className="show-all-music-button">Показать все</button>
            </div>
        </>
    );
};

export default FavoriteMusic;