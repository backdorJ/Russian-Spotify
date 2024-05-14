import React, {FC, useState} from 'react';
import '../../../styles/Modal/Modal.css'
import {createSong} from "../../../../../http/songApi";

interface ISongCreateModal {
    onClose: () => void;
}

const SongCreateModal: FC<ISongCreateModal> = ({onClose}) => {
    const [name, setName] = useState('');
    const [duration, setDuration] = useState(0);
    const [imageId, setImageId] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        createSong(name, duration, imageId ? imageId : null, categoryId).then(response => {
            alert(response.message)
            onClose()
        })
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Создание песни</h2>
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
                        Длительность:
                        <input type="number" value={duration}
                               onChange={(e) => setDuration(Number.parseInt(e.target.value))}/>
                    </label>
                    <label>
                        Категория:
                        <input type="text" value={categoryId}
                               onChange={(e) => setCategoryId(e.target.value)}/>
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

export default SongCreateModal;
