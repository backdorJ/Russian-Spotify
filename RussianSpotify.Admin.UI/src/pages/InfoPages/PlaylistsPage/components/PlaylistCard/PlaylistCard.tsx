import React, {FC, useState} from "react";
import '../../../styles/Card/Card.css'
import PlaylistUpdateModal from "../PlaylistUpdateModal/PlaylistUpdateModal";
import {deletePlaylist} from "../../../../../http/playlistApi";
import Playlist from "../../../../../models/Playlist";
import handleImageNotLoaded from "../../../../../functions/handleImageNotLoaded";
import {getImage} from "../../../../../http/imageApi";

interface IPlaylistCard {
    playlist: Playlist
    reloadTrigger: () => void
}

const PlaylistCard: FC<IPlaylistCard> = ({playlist, reloadTrigger}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalClose = () => {
        setIsModalOpen(false);
        reloadTrigger()
    }

    const handleUpdateClick = () => {
        setIsModalOpen(true);
    }

    const handleDeleteClick = () => {
        if (!window.confirm("Вы уверены, что хотите удалить плейлист?"))
            return

        deletePlaylist(playlist.id).then(response => {
            alert(response.message)
            reloadTrigger()
        })
    }

    return (
        <div className="card">
            <div className="card-info">
                <div className="avatar">
                    <img src={playlist.imageId ? getImage(playlist.imageId) : ''} alt="Playlist Avatar" onError={handleImageNotLoaded}/>
                </div>
                <div className="details">
                    <p><strong>ID:</strong> {playlist.id}</p>
                    <p><strong>Name:</strong> {playlist.name}</p>
                    <p><strong>Author Name:</strong> {playlist.authorName}</p>
                    <p><strong>Author ID:</strong> {playlist.authorId}</p>
                    <p><strong>Image ID:</strong> {playlist.imageId}</p>
                    <p><strong>Is Album:</strong> {playlist.isAlbum ? 'Yes' : 'No'}</p>
                    <p><strong>Release Date:</strong> {playlist.releaseDate}</p>
                </div>
            </div>
            <div className="action-buttons">
                <div className="update-button" onClick={handleUpdateClick}>
                    <p className="update-button-text">Изменить</p>
                </div>
                <div className="delete-button" onClick={handleDeleteClick}>
                    <p className="delete-button-text">Удалить</p>
                </div>
            </div>
            {isModalOpen && <PlaylistUpdateModal playlist={playlist} onClose={handleModalClose}/>}
        </div>
    );
}

export default PlaylistCard;