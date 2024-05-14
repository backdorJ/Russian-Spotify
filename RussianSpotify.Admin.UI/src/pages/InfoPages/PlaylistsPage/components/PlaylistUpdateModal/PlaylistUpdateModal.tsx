import React, {FC, useEffect, useState} from 'react';
import '../../../styles/Modal/Modal.css'
import {updatePlaylist} from "../../../../../http/playlistApi";
import Playlist from "../../../../../models/Playlist";
import {formatDate} from "../../../../../functions/formatDate";
import {getSongsByFilter} from "../../../../../http/songApi";
import Song from "../../../../../models/Song";

interface IPlaylistUpdateModalProps {
    playlist: Playlist;
    onClose: () => void;
}

const PlaylistUpdateModal: FC<IPlaylistUpdateModalProps> = ({playlist, onClose}) => {
    const [name, setName] = useState(playlist.name);
    const [addSongsIds, setAddSongsIds] = useState<string[]>([]);
    const [removeSongsIds, setRemoveSongsIds] = useState<string[]>([]);
    const [authorId, setAuthorId] = useState(playlist.authorId);
    const [releaseDate, setReleaseDate] = useState(formatDate(new Date(playlist.releaseDate)));
    const [isAlbum, setAsAlbum] = useState(playlist.isAlbum);
    const [songsIds, setSongsIds] = useState<string[]>();
    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        updatePlaylist(playlist.id, name, isAlbum, addSongsIds, removeSongsIds, authorId, new Date(releaseDate)).then(response => {
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
                        Название:
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                    </label>
                    <label>
                        ID автора:
                        <input type="text" value={authorId} onChange={(e) => setAuthorId(e.target.value)}/>
                    </label>
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
                        <button type="button" onClick={handleAddSong}>Добавить песни</button>
                    </label>
                    <label>
                        Дата релиза:
                        <input type="date" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)}/>
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

export default PlaylistUpdateModal;
