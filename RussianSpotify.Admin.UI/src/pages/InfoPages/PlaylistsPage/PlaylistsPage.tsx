import React, {useEffect, useState} from "react";
import Header from "../../../commonComponents/Header/Header";
import "../styles/InfoPage.css"
import {getPlaylistsByFilter} from "../../../http/playlistApi";
import PlaylistCard from "./components/PlaylistCard/PlaylistCard";
import PlaylistCreateModal from "./components/PlaylistCreateModal/PlaylistCreateModal";
import Playlist from "../../../models/Playlist";

export const PlaylistsPage = () => {
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize] = useState(20);
    const [reloadTrigger, setReloadTrigger] = useState(false);
    const [filter, setFilter] = useState('')
    const [filterType, setFilterType] = useState('id')
    const [filterIsAlbum, setFilterIsAlbum] = useState<boolean | undefined>(undefined)

    useEffect(() => {
        !playlists || !filter && getPlaylistsByFilter(pageNumber, pageSize).then((response) => {
            if (response.message)
                alert(response.message);
            else
                setPlaylists(response.value);
        });

        if (!filter)
            return

        let getPlaylistFunc;
        switch (filterType) {
            case "id":
                getPlaylistFunc = getPlaylistsByFilter(pageNumber, pageSize, checkIsAlbum(), filter);
                break;
            case "name":
                getPlaylistFunc = getPlaylistsByFilter(pageNumber, pageSize, checkIsAlbum(), null, filter);
                break;
            case "authorId":
                getPlaylistFunc = getPlaylistsByFilter(pageNumber, pageSize, checkIsAlbum(), null, null, filter);
                break;
            case "authorName":
                getPlaylistFunc = getPlaylistsByFilter(pageNumber, pageSize, checkIsAlbum(), null, null, null, filter);
                break;
            default:
                break;
        }
        if (getPlaylistFunc) {
            getPlaylistFunc.then((response) => {
                if (response.message)
                    alert(response.message);
                else
                    setPlaylists(response.value);
            });
        }
    }, [pageNumber, reloadTrigger]);

    const handleNextPage = () => {
        setPageNumber(pageNumber + 1);
    };

    const handlePreviousPage = () => {
        setPageNumber(pageNumber - 1);
    };

    const handleReloadTrigger = () => {
        setReloadTrigger(prev => !prev)
    }

    const handleCreatePlaylist = () => {
        setIsModalOpen(true)
    }

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalClose = () => {
        setIsModalOpen(false);
        handleReloadTrigger()
    }

    const visiblePlaylists = playlists ? playlists.slice((pageNumber - 1) * pageSize, pageNumber * pageSize) : [];

    const totalPages = playlists ? Math.ceil(playlists.length / pageSize) : 0;
    
    const checkIsAlbum = () => {
        return filterIsAlbum === undefined ? null: filterIsAlbum
    }
    
    const handleSearchClick = () => {
        setPageNumber(1)
        setReloadTrigger(prevState => !prevState)
    }

    return (
        <div className="info-page">
            <Header/>
            <div className="info-page-content">
                <div className="info-page-wrapper">
                    <div className="info-page-content-header">
                        <p className="info-page-content-header-text">Плейлисты</p>
                    </div>
                    <div className="search-container">
                        <input
                            className="search-input" type="text"
                            placeholder="Введите ID, Name, Author ID, Author Name, Image ID" value={filter}
                            onChange={(e) => setFilter(e.target.value)}/>
                        <select className="search-select" onChange={(e) => setFilterType(e.target.value)}>
                            <option value="id">ID</option>
                            <option value="name">Name</option>
                            <option value="authorId">Author ID</option>
                            <option value="authorName">Author Name</option>
                            <option value="imageId">Image ID</option>
                        </select>
                        <label className="checkbox-label">
                            <input
                                className="search-input-checkbox"
                                type="checkbox"
                                onChange={(e) => setFilterIsAlbum(e.target.checked)}
                                checked={filterIsAlbum}/>
                            <span className="checkbox-custom"></span>
                            isAlbum
                        </label>
                        <button className="search-button" onClick={handleSearchClick}>Поиск</button>
                    </div>
                    {playlists && visiblePlaylists.map((playlist, index) => (
                        <PlaylistCard key={index} playlist={playlist}
                                      reloadTrigger={() => setReloadTrigger(prev => !prev)}/>))}
                    <footer>
                        <button onClick={handlePreviousPage} disabled={pageNumber === 1}>
                            <svg viewBox="0 0 24 24" width="24" height="24" fill="white"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.41 16.59L10.83 12L15.41 7.41L14 6L8 12L14 18L15.41 16.59Z" fill="white"/>
                            </svg>
                            Предыдущая страница
                        </button>
                        <div className="add-button" onClick={handleCreatePlaylist}>
                            <p className="add-button-text">Добавить</p>
                        </div>
                        <button onClick={handleNextPage} disabled={pageNumber === totalPages || !totalPages}>
                            Следующая страница
                            <svg viewBox="0 0 24 24" width="24" height="24" fill="white"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.59003 7.41L13.17 12L8.59003 16.59L10 18L16 12L10 6L8.59003 7.41Z"
                                      fill="white"/>
                            </svg>
                        </button>
                    </footer>
                </div>
            </div>
            {isModalOpen && <PlaylistCreateModal onClose={handleModalClose}/>}
        </div>
    )
}