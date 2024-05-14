import React, {useEffect, useState} from "react";
import Header from "../../../commonComponents/Header/Header";
import "../styles/InfoPage.css";
import BucketCard from "./components/BucketCard/BucketCard";
import BucketCreateModal from "./components/BucketCreateModal/BucketCreateModal";
import {getBucketsByFilter} from "../../../http/bucketApi";
import Bucket from "../../../models/Bucket";
import SongCard from "../SongsPage/components/SongCard/SongCard";

export const BucketsPage = () => {
    const [bucket, setBucket] = useState<Bucket | null>();
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize] = useState(20);
    const [reloadTrigger, setReloadTrigger] = useState(false);
    const [filter, setFilter] = useState('')
    const [filterType, setFilterType] = useState('bucketId')

    useEffect(() => {
        bucket && getBucketsByFilter(filter).then((response) => {
            if (response.message)
                alert(response.message);
            else
                setBucket(response.value);
        });
    }, [pageNumber, reloadTrigger]);

    const handleNextPage = () => {
        setPageNumber(pageNumber + 1);
    };

    const handlePreviousPage = () => {
        setPageNumber(pageNumber - 1);
    };

    const handleCreateBucket = () => {
        setIsModalOpen(true);
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalClose = () => {
        setIsModalOpen(false);
        setReloadTrigger((prev) => !prev);
    };

    const handleSearchClick = () => {
        setPageNumber(1)
        if (!filter) {
            setBucket(null);
            return
        }
        
        if (filterType === "bucketId") {
            getBucketsByFilter(filter).then((response) => {
                if (response.message)
                    alert(response.message);
                else
                    setBucket(response.value);
            });
        } else if (filterType === "userId") {
            getBucketsByFilter(null, filter).then((response) => {
                if (response.message)
                    alert(response.message);
                else
                    setBucket(response.value);
            })
        }
    }

    const visibleSongs = bucket ? bucket.songs.slice((pageNumber - 1) * pageSize, pageNumber * pageSize) : [];

    const totalPages = bucket ? Math.ceil(bucket.songs.length / pageSize) : 0;

    return (
        <div className="info-page">
            <Header/>
            <div className="info-page-content">
                <div className="info-page-wrapper">
                    <div className="info-page-content-header">
                        <p className="info-page-content-header-text">Корзина</p>
                    </div>
                    <div className="search-container">
                        <input
                            className="search-input"
                            type="text"
                            placeholder="Введите Bucket ID или User ID"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}/>
                        <select className="search-select" onChange={(e) => setFilterType(e.target.value)}>
                            <option value="bucketId">Bucket Id</option>
                            <option value="userId">User Id</option>
                        </select>
                        <button className="search-button" onClick={handleSearchClick}>Поиск</button>
                    </div>
                    {bucket && (<BucketCard bucket={bucket} reloadTrigger={() => setReloadTrigger((prev) => !prev)}/>)}
                    {bucket && visibleSongs.map((song, index) => (
                        <SongCard key={index} song={song} reloadTrigger={() => setReloadTrigger((prev) => !prev)}/>))}
                    <footer>
                        <button onClick={handlePreviousPage} disabled={pageNumber === 1}>
                            <svg viewBox="0 0 24 24" width="24" height="24"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.41 16.59L10.83 12L15.41 7.41L14 6L8 12L14 18L15.41 16.59Z"/>
                            </svg>
                            Предыдущая страница
                        </button>
                        <div className="add-button" onClick={handleCreateBucket}>
                            <p className="add-button-text">Добавить</p>
                        </div>
                        <button onClick={handleNextPage} disabled={totalPages === pageNumber || !totalPages}>
                            Следующая страница
                            <svg viewBox="0 0 24 24" width="24" height="24"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.59003 7.41L13.17 12L8.59003 16.59L10 18L16 12L10 6L8.59003 7.41Z"/>
                            </svg>
                        </button>
                    </footer>
                </div>
            </div>
            {isModalOpen && <BucketCreateModal onClose={handleModalClose}/>}
        </div>
    );
}
