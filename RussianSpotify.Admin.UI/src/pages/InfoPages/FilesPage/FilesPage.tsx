import React, {useEffect, useState} from "react";
import Header from "../../../commonComponents/Header/Header";
import "../styles/InfoPage.css"
import FileCard from "./components/FileCard/FileCard";
import FileCreateModal from "./components/FileCreateModal/FileCreateModal";
import {getFilesByFilter} from "../../../http/fileApi";
import File from "../../../models/File";

export const FilesPage = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize] = useState(20);
    const [reloadTrigger, setReloadTrigger] = useState(false);
    const [filter, setFilter] = useState('')
    const [filterType, setFilterType] = useState('id')
    const [filterIsOrderBySize, setFilterAsOrderBySize] = useState(false)
    const [filterIsSongFile, setFilterAsSongFile] = useState(false)
    const [filterIsImageFile, setFilterAsImageFile] = useState(false)

    useEffect(() => {
        !files || !filter && getFilesByFilter(pageNumber, pageSize).then((response) => {
            if (response.message)
                alert(response.message);
            else
                setFiles(response.value);
        });

        if (!filter)
            return

        let getFilesFunc;
        switch (filterType) {
            case "id":
                getFilesFunc = getFilesByFilter(pageNumber, pageSize, filterIsSongFile, filterIsImageFile, filterIsOrderBySize, filter);
                break;
            case "name":
                getFilesFunc = getFilesByFilter(pageNumber, pageSize, filterIsSongFile, filterIsImageFile, filterIsOrderBySize, null, filter);
                break;
            case "address":
                getFilesFunc = getFilesByFilter(pageNumber, pageSize, filterIsSongFile, filterIsImageFile, filterIsOrderBySize, null, null, filter);
                break;
            case "sizeMoreThen":
                getFilesFunc = getFilesByFilter(pageNumber, pageSize, filterIsSongFile, filterIsImageFile, filterIsOrderBySize, null, null, null, filter ? Number.parseInt(filter) : null);
                break;
            case "sizeLessThen":
                getFilesFunc = getFilesByFilter(pageNumber, pageSize, filterIsSongFile, filterIsImageFile, filterIsOrderBySize, null, null, null, null, filter ? Number.parseInt(filter) : null);
                break;
            default:
                break;
        }
        if (getFilesFunc) {
            getFilesFunc.then((response) => {
                if (response.message)
                    alert(response.message);
                else
                    setFiles(response.value);
            });
        }
    }, [pageNumber, reloadTrigger]);

    const handleNextPage = () => {
        setPageNumber(pageNumber + 1);
    };

    const handlePreviousPage = () => {
        setPageNumber(pageNumber - 1);
    };

    const handleCreateFile = () => {
        setIsModalOpen(true)
    }

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalClose = () => {
        setIsModalOpen(false);
        setReloadTrigger(prevState => !prevState)
    }

    const visibleSongs = files ? files.slice((pageNumber - 1) * pageSize, pageNumber * pageSize) : [];

    const totalPages = files ? Math.ceil(files.length / pageSize) : 0;

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
                        <p className="info-page-content-header-text">Файлы</p>
                    </div>
                    <div className="search-container">
                        <input
                            className="search-input" type="text"
                            placeholder="Введите ID, Name, Address, Size more then, Size less then" value={filter}
                            onChange={(e) => setFilter(e.target.value)}/>
                        <select className="search-select" onChange={(e) => setFilterType(e.target.value)}>
                            <option value="id">ID</option>
                            <option value="name">Name</option>
                            <option value="address">Address</option>
                            <option value="sizeMoreThen">Size more then</option>
                            <option value="sizeLessThen">Size less then</option>
                        </select>
                        <label className="checkbox-label">
                            <input
                                className="search-input-checkbox"
                                type="checkbox"
                                onChange={(e) => {
                                    setFilterAsSongFile(e.target.checked);
                                    if (e.target.checked) {
                                        setFilterAsImageFile(false);
                                    }
                                }}
                                checked={filterIsSongFile && !filterIsImageFile}
                            />
                            <span className="checkbox-custom"></span>
                            isSong
                        </label>
                        <label className="checkbox-label">
                            <input
                                className="search-input-checkbox"
                                type="checkbox"
                                onChange={(e) => {
                                    setFilterAsImageFile(e.target.checked);
                                    if (e.target.checked) {
                                        setFilterAsSongFile(false);
                                    }
                                }}
                                checked={filterIsImageFile && !filterIsSongFile}
                            />
                            <span className="checkbox-custom"></span>
                            isImage
                        </label>
                        <label className="checkbox-label">
                            <input
                                className="search-input-checkbox"
                                type="checkbox"
                                onChange={(e) => setFilterAsOrderBySize(e.target.checked)}
                                checked={filterIsOrderBySize}/>
                            <span className="checkbox-custom"></span>
                            isOrderBySize
                        </label>
                        <button className="search-button" onClick={handleSearchClick}>Поиск</button>
                    </div>
                    {files && visibleSongs.map((file, index) => (
                        <FileCard key={index} file={file} reloadTrigger={() => setReloadTrigger(prev => !prev)}/>))}
                    <footer>
                        <button onClick={handlePreviousPage} disabled={pageNumber === 1}>
                            <svg viewBox="0 0 24 24" width="24" height="24" fill="white"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.41 16.59L10.83 12L15.41 7.41L14 6L8 12L14 18L15.41 16.59Z" fill="white"/>
                            </svg>
                            Предыдущая страница
                        </button>
                        <div className="add-button" onClick={handleCreateFile}>
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
            {isModalOpen && <FileCreateModal onClose={handleModalClose}/>}
        </div>
    )
}