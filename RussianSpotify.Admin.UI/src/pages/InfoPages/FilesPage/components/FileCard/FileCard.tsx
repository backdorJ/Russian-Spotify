import React, {FC} from "react";
import '../../../styles/Card/Card.css'
import {deleteFile, } from "../../../../../http/fileApi";
import File from "../../../../../models/File";
import {getImage} from "../../../../../http/imageApi";

interface IFileCard {
    file: File
    reloadTrigger: () => void
}

const FileCard: FC<IFileCard> = ({file, reloadTrigger}) => {
    const handleDeleteClick = () => {
        if (!window.confirm("Вы уверены, что хотите удалить файл?"))
            return

        deleteFile(file.id).then(response => {
            alert(response.message)
            reloadTrigger()
        })
    }

    return (
        <div className="card">
            <div className="card-info">
                {file.contentType.includes('image/') && <div className="avatar">
                    <img src={getImage(file.id)} alt="Playlist Avatar"/>
                </div>}
                <div className="details">
                    <p><strong>ID:</strong> {file.id}</p>
                    <p><strong>Name:</strong> {file.name}</p>
                    <p><strong>Size:</strong> {file.size}</p>
                    <p><strong>Address:</strong> {file.address}</p>
                    <p><strong>contentType:</strong> {file.contentType}</p>
                    <p><strong>songId:</strong> {file.songId}</p>
                    <p><strong>userId:</strong> {file.userId}</p>
                </div>
            </div>
            <div className="action-buttons">
                <div className="delete-button" onClick={handleDeleteClick}>
                    <p className="delete-button-text">Удалить</p>
                </div>
            </div>
        </div>
    );
}

export default FileCard;