import React, {FC, useState} from 'react';
import '../../../styles/Modal/Modal.css'
import {updateSong} from "../../../../../http/songApi";
import Song from "../../../../../models/Song";

interface ISongUpdateModalProps {
    song: Song;
    onClose: () => void;
}

const SongUpdateModal: FC<ISongUpdateModalProps> = ({song, onClose}) => {
    const [name, setName] = useState(song.name);
    const [imageId, setImageId] = useState(song.imageId);
    const [duration, setDuration] = useState(song.duration)
    const [addAuthorsIds, setAddAuthorsIds] = useState<string[]>([]);
    const [removeAuthorsIds, setRemoveAuthorsIds] = useState<string[]>([])
    const [fileId, setFileId] = useState('')
    const [playsNumber, setPlaysNumber] = useState(song.playsNumber);
    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        updateSong(song.id, name, imageId, duration, addAuthorsIds, removeAuthorsIds, null, playsNumber).then(response => {
            alert(response.message)
            onClose()
        })
    }

    const [newAuthorId, setNewAuthorId] = useState('');

    const handleAddAuthor = () => {
        if (!newAuthorId || addAuthorsIds.includes(newAuthorId))
            return
        setAddAuthorsIds(prevState => [...prevState, newAuthorId]);
        song.authorIds.push(newAuthorId);
        setNewAuthorId('');
    };

    const handleRemoveAuthor = (authorIdToRemove: string) => {
        if (removeAuthorsIds.includes(authorIdToRemove))
            return
        setRemoveAuthorsIds(prevState => [...prevState, authorIdToRemove]);
        song.authorIds.splice(authorIdToRemove.indexOf(authorIdToRemove), 1);
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Изменение музыки</h2>
                <form>
                    <label>
                        Трек:
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                    </label>
                    <label>
                        ID картинки:
                        <input type="text" value={imageId} onChange={(e) => setImageId(e.target.value)}/>
                    </label>
                    <label>
                        ID файла:
                        <input type="text" value={fileId} onChange={(e) => setFileId(e.target.value)}/>
                    </label>
                    <label>
                        Авторы:
                        <ul>
                            {song.authorIds.map(authorId => (
                                <li key={authorId}>
                                    {authorId}
                                    <button type="button" onClick={() => handleRemoveAuthor(authorId)}>Удалить</button>
                                </li>))
                            }
                        </ul>
                        <input type="text" value={newAuthorId}
                               onChange={(e) => setNewAuthorId(e.target.value)}/>
                        <button type="button" onClick={handleAddAuthor}>Добавить автора</button>
                    </label>
                    <label>
                        Длительность:
                        <input type="number" value={duration}
                               onChange={(e) => setDuration(Number.parseInt(e.target.value))}/>
                    </label>
                    <label>
                        Количество прослушиваний:
                        <input type="number" value={playsNumber}
                               onChange={(e) => setPlaysNumber(Number.parseInt(e.target.value))}/>
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

export default SongUpdateModal;
