import React, {FC, useState} from 'react';
import '../../../styles/Modal/Modal.css'
import {createPlaylist} from "../../../../../http/playlistApi";

interface IPlaylistCreateModal {
    onClose: () => void;
}

const PlaylistCreateModal: FC<IPlaylistCreateModal> = ({onClose}) => {
    const [name, setName] = useState('');
    const [imageId, setImageId] = useState('');
    const [authorId, setAuthorId] = useState('');
    const [isAlbum, setAsAlbum] = useState(false);
    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        createPlaylist(name, imageId ? imageId : null, authorId, isAlbum).then(response => {
            alert(response.message)
            onClose()
        })
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Создание плейлиста</h2>
                <form>
                    <label>
                        Имя:
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                    </label>
                    <label>
                        ID картинки:
                        <input type="text" value={imageId} onChange={(e) => setImageId(e.target.value)}/>
                    </label>
                    <label>
                        ID автора:
                        <input type="text" value={authorId}
                               onChange={(e) => setAuthorId(e.target.value)}/>
                    </label>
                    <label>
                        Альбом:
                        <input type="checkbox" checked={isAlbum}
                               onChange={(e) => setAsAlbum(e.target.checked)}/>
                    </label>
                    <div className="modal-buttons">
                        <button type="submit" onClick={handleSubmit}>Сохранить</button>
                        <button type="button" onClick={onClose}>Закрыть</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PlaylistCreateModal;
