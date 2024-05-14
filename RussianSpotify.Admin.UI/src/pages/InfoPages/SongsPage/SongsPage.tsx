import React, {useEffect, useState} from "react";
import Header from "../../../commonComponents/Header/Header";
import "../styles/InfoPage.css"
import SongCard from "./components/SongCard/SongCard";
import Song from "../../../models/Song";
import SongCreateModal from "./components/SongCreateModal/SongCreateModal";
import {getSongsByFilter} from "../../../http/songApi";

export const SongsPage = () => {
    const [songs, setSongs] = useState<Song[]>([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize] = useState(20);
    const [reloadTrigger, setReloadTrigger] = useState(false);
    const [filter, setFilter] = useState<string | null>('')
    const [filterType, setFilterType] = useState('id')
    const [filterIsOrderByPlaysNumber, setFilterAsOrderByPlaysNumber] = useState(false)

    useEffect(() => {
        !songs || !filter && getSongsByFilter(pageNumber, pageSize).then((response) => {
            if (response.message)
                alert(response.message);
            else
                setSongs(response.value);
        });

        if (!filter)
            return

        let getSongsFunc;
        switch (filterType) {
            case "id":
                getSongsFunc = getSongsByFilter(pageNumber, pageSize, filterIsOrderByPlaysNumber, filter);
                break;
            case "name":
                getSongsFunc = getSongsByFilter(pageNumber, pageSize, filterIsOrderByPlaysNumber, null, filter);
                break;
            case "authorsIds":
                if (!filter)
                    getSongsFunc = getSongsByFilter(pageNumber, pageSize, filterIsOrderByPlaysNumber);
                else
                    getSongsFunc = getSongsByFilter(pageNumber, pageSize, filterIsOrderByPlaysNumber, null, null, filter.split(',').map(authorId => authorId.trim()));
                break;
            case "moreThenPlaysNumber":
                getSongsFunc = getSongsByFilter(pageNumber, pageSize, filterIsOrderByPlaysNumber, null, null, null, filter ? Number.parseInt(filter) : null);
                break;
            case "lessThenPlaysNumber":
                getSongsFunc = getSongsByFilter(pageNumber, pageSize, filterIsOrderByPlaysNumber, null, null, null, null, filter ? Number.parseInt(filter) : null);
                break;
            case "categoryId":
                getSongsFunc = getSongsByFilter(pageNumber, pageSize, filterIsOrderByPlaysNumber, null, null, null, null, null, filter);
                break;
            case "moreThenDuration":
                getSongsFunc = getSongsByFilter(pageNumber, pageSize, filterIsOrderByPlaysNumber, null, null, null, null, null, null, filter ? Number.parseInt(filter) : null);
                break;
            case "lessThenDuration":
                getSongsFunc = getSongsByFilter(pageNumber, pageSize, filterIsOrderByPlaysNumber, null, null, null, null, null, null, null, filter ? Number.parseInt(filter) : null);
                break;
            case "albumId":
                getSongsFunc = getSongsByFilter(pageNumber, pageSize, filterIsOrderByPlaysNumber, null, null, null, null, null, null, null, null, filter);
                break;
            default:
                break;
        }
        if (getSongsFunc) {
            getSongsFunc.then((response) => {
                if (response.message)
                    alert(response.message);
                else
                    setSongs(response.value);
            });
        }
    }, [pageNumber, reloadTrigger]);

    const handleNextPage = () => {
        setPageNumber(pageNumber + 1);
    };

    const handlePreviousPage = () => {
        setPageNumber(pageNumber - 1);
    };

    const handleCreateSong = () => {
        setIsModalOpen(true)
    }

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalClose = () => {
        setIsModalOpen(false);
        setReloadTrigger(prevState => !prevState)
    }

    const visibleSongs = songs ? songs.slice((pageNumber - 1) * pageSize, pageNumber * pageSize) : [];

    const totalPages = songs ? Math.ceil(songs.length / pageSize) : 0;

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
                        <p className="info-page-content-header-text">Песни</p>
                    </div>
                    <div className="search-container">
                        <input
                            className="search-input" type="text"
                            placeholder="Введите ID, Name, Author ID, Author Name, Image ID"
                            value={filter ? filter : ''}
                            onChange={(e) => setFilter(e.target.value)}/>
                        <select className="search-select" onChange={(e) => setFilterType(e.target.value)}>
                            <option value="id">ID</option>
                            <option value="name">Name</option>
                            <option value="authorsIds">Author(s) ID</option>
                            <option value="moreThenPlaysNumber">More then plays number</option>
                            <option value="lessThenPlaysNumber">Less then plays number</option>
                            <option value="categoryId">Category ID</option>
                            <option value="moreThenDuration">More then duration</option>
                            <option value="lessThenDuration">Less then duration</option>
                            <option value="albumId">Album ID</option>
                        </select>
                        <label className="checkbox-label">
                            <input
                                className="search-input-checkbox"
                                type="checkbox"
                                onChange={(e) => setFilterAsOrderByPlaysNumber(e.target.checked)}
                                checked={filterIsOrderByPlaysNumber}/>
                            <span className="checkbox-custom"></span>
                            orderByPlaysNumber
                        </label>
                        <button className="search-button" onClick={handleSearchClick}>Поиск</button>
                    </div>
                    {songs && visibleSongs.map((song, index) => (
                        <SongCard key={index} song={song} reloadTrigger={() => setReloadTrigger(prev => !prev)}/>))}
                    <footer>
                        <button onClick={handlePreviousPage} disabled={pageNumber === 1}>
                            <svg viewBox="0 0 24 24" width="24" height="24" fill="white"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.41 16.59L10.83 12L15.41 7.41L14 6L8 12L14 18L15.41 16.59Z" fill="white"/>
                            </svg>
                            Предыдущая страница
                        </button>
                        <div className="add-button" onClick={handleCreateSong}>
                            <p className="add-button-text">Добавить</p>
                        </div>
                        <button onClick={handleNextPage} disabled={totalPages === pageNumber || !totalPages}>
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
            {isModalOpen && <SongCreateModal onClose={handleModalClose}/>}
        </div>
    )
}