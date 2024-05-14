import React, {FC, useEffect, useState} from 'react';
import '../../../styles/Modal/Modal.css'
import Bucket from "../../../../../models/Bucket";
import {updateBucket} from "../../../../../http/bucketApi";
import {getSongsByFilter} from "../../../../../http/songApi";
import Song from "../../../../../models/Song";

interface IBucketUpdateModalProps {
    bucket: Bucket;
    onClose: () => void;
}

const BucketUpdateModal: FC<IBucketUpdateModalProps> = ({bucket, onClose}) => {
    const [addSongsIds, setAddSongsIds] = useState<string[]>([]);
    const [removeSongsIds, setRemoveSongsIds] = useState<string[]>([]);
    const [songsIds, setSongsIds] = useState<string[]>();
    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        updateBucket(bucket.bucketId, addSongsIds, removeSongsIds).then(response => {
            alert(response.message)
            onClose()
        })
    }

    useEffect(() => {
        getSongsByFilter(1, 10000)
            .then(response => setSongsIds(response.value.map((song: Song) => song.id)))
    }, []);

    const [newSongId, setNewSongId] = useState('');

    const handleAddSong = () => {
        if (!newSongId || addSongsIds.includes(newSongId))
            return
        setAddSongsIds(prevState => [...prevState, newSongId]);
        setNewSongId('');
    };

    const handleRemoveSong = (songIdToRemove: string) => {
        if (removeSongsIds.includes(songIdToRemove))
            return
        setRemoveSongsIds(prevState => [...prevState, songIdToRemove]);
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Изменение плейлиста</h2>
                <form>
                    <label>
                        Песни:
                        <ul>
                            {songsIds && songsIds.map(songId => (
                                <li key={songId}>
                                    {songId}
                                    <button type="button" onClick={() => handleRemoveSong(songId)}>Удалить</button>
                                </li>))
                            }
                        </ul>
                        <input type="text" value={newSongId}
                               onChange={(e) => setNewSongId(e.target.value)}/>
                        <button type="button" onClick={handleAddSong}>Добавить песню</button>
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

export default BucketUpdateModal;
