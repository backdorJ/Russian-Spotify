import React, {FC, useState} from "react";
import '../../../styles/Card/Card.css'
import Song from "../../../../../models/Song";
import {deleteSong} from "../../../../../http/songApi";
import SongUpdateModal from "../SongUpdateModal/SongUpdateModal";
import {formatDuration} from "../../../../../functions/formatDuration";
import handleImageNotLoaded from "../../../../../functions/handleImageNotLoaded";
import {getImage} from "../../../../../http/imageApi";

interface ISongCard {
    song: Song
    reloadTrigger: () => void
}

const SongCard: FC<ISongCard> = ({song, reloadTrigger}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalClose = () => {
        setIsModalOpen(false);
        reloadTrigger()
    }

    const handleUpdateClick = () => {
        setIsModalOpen(true);
    }

    const handleDeleteClick = () => {
        if (!window.confirm("Вы уверены, что хотите удалить песню?"))
            return

        deleteSong(song.id).then(response => {
            alert(response.message)
            reloadTrigger()
        })
    }
    
    return (
        <div className="card">
            <div className="card-info">
                <div className="avatar">
                    <img src={song.imageId ? getImage(song.imageId) : ''} alt="Song Avatar" onError={handleImageNotLoaded}/>
                </div>
                <div className="details">
                    <p><strong>ID:</strong> {song.id}</p>
                    <p><strong>Name:</strong> {song.name}</p>
                    <p><strong>Author Names:</strong></p>
                    <ul>
                        {song.authorNames.map((authorName, index) => (
                            <li key={index}>{authorName}</li>
                        ))}
                    </ul>
                    <p><strong>Author Ids:</strong></p>
                    <ul>
                        {song.authorIds.map((authorId, index) => (
                            <li key={index}>{authorId}</li>
                        ))}
                    </ul>
                    <p><strong>Image ID:</strong> {song.imageId}</p>
                    <p><strong>Duration :</strong> {song.duration}s</p>
                    <p><strong>Duration in min and sec:</strong> {formatDuration(song.duration)}</p>
                    <p><strong>Plays Number:</strong> {song.playsNumber}</p>
                    <p><strong>Category Id:</strong> {song.categoryId}</p>
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
            {isModalOpen && <SongUpdateModal song={song} onClose={handleModalClose}/>}
        </div>
    );
}

export default SongCard;