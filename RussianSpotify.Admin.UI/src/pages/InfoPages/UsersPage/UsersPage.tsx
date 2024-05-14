import React, {useEffect, useState} from "react";
import '../styles/InfoPage.css'
import User from "../../../models/User";
import Header from "../../../commonComponents/Header/Header";
import UserCard from "./components/UserCard/UserCard";
import UserCreateModal from "./components/UserCreateModal/UserCreateModal";
import {getUsersByFilter} from "../../../http/userApi";

export const UsersPage = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize] = useState(20);
    const [reloadTrigger, setReloadTrigger] = useState(false);
    const [filter, setFilter] = useState<string | null>(null)
    const [filterType, setFilterType] = useState('id')
    const [filterIsNullRefresh, setFilterAsNullRefresh] = useState<boolean | undefined>(undefined)
    const [filterIsNullAccess, setFilterAsNullAccess] = useState<boolean | undefined>(undefined)
    const [filterIsExpiredRefresh, setFilterAsExpiredRefresh] = useState<boolean | undefined>(undefined)
    const [filterIsEmailConfirmed, setFilterAsEmailConfirmed] = useState<boolean | undefined>(undefined)

    useEffect(() => {
            (!users || !filter 
                || filterIsNullRefresh
                    || filterIsNullAccess
                    || filterIsExpiredRefresh
                    || filterIsEmailConfirmed) && getUsersByFilter(pageNumber, pageSize).then((response) => {
                    if (response.message)
                        alert(response.message);
                    else
                        setUsers(response.value);
                })

                let getUsersFunc;
                switch (filterType) {
                    case "id":
                        getUsersFunc = getUsersByFilter(pageNumber, pageSize,
                            checkIsUndefined(filterIsNullRefresh),
                            checkIsUndefined(filterIsNullAccess),
                            checkIsUndefined(filterIsExpiredRefresh),
                            checkIsUndefined(filterIsEmailConfirmed), filter);
                        break;
                    case "userName":
                        getUsersFunc = getUsersByFilter(pageNumber, pageSize,
                            checkIsUndefined(filterIsNullRefresh),
                            checkIsUndefined(filterIsNullAccess),
                            checkIsUndefined(filterIsExpiredRefresh),
                            checkIsUndefined(filterIsEmailConfirmed), null, filter);
                        break;
                    case "email":
                        getUsersFunc = getUsersByFilter(pageNumber, pageSize,
                            checkIsUndefined(filterIsNullRefresh),
                            checkIsUndefined(filterIsNullAccess),
                            checkIsUndefined(filterIsExpiredRefresh),
                            checkIsUndefined(filterIsEmailConfirmed), null, null, filter);
                        break;
                    case "role":
                        getUsersFunc = getUsersByFilter(pageNumber, pageSize,
                            checkIsUndefined(filterIsNullRefresh),
                            checkIsUndefined(filterIsNullAccess),
                            checkIsUndefined(filterIsExpiredRefresh),
                            checkIsUndefined(filterIsEmailConfirmed), null, null, null, filter);
                        break;
                    default:
                        break;
                }
                if (getUsersFunc) {
                    getUsersFunc.then((response) => {
                        if (response.message)
                            alert(response.message);
                        else
                            setUsers(response.value);
                    });
                }
        }, [pageNumber, reloadTrigger]
    )

    const checkIsUndefined = (isUndefined: boolean | undefined) => {
        return isUndefined === undefined ? null : isUndefined;
    }

    const handleNextPage = () => {
        setPageNumber(pageNumber + 1);
    };

    const handlePreviousPage = () => {
        setPageNumber(pageNumber - 1);
    };

    const handleCreateUser = () => {
        setIsModalOpen(true)
    }

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalClose = () => {
        setIsModalOpen(false);
        setReloadTrigger(prev => !prev)
    }

    const visibleUsers = users ? users.slice((pageNumber - 1) * pageSize, pageNumber * pageSize) : [];

    const totalPages = users ? Math.ceil(users.length / pageSize) : 0;

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
                        <p className="info-page-content-header-text">Пользователи</p>
                    </div>
                    <div className="search-container">
                        <input
                            className="search-input" type="text"
                            placeholder="Введите ID, UserName, Email, Role"
                            value={filter ? filter : ''}
                            onChange={(e) => setFilter(e.target.value)}/>
                        <select className="search-select" onChange={(e) => setFilterType(e.target.value)}>
                            <option value="id">ID</option>
                            <option value="userName">UserName</option>
                            <option value="email">Email</option>
                            <option value="role">Role</option>
                        </select>
                        <label className="checkbox-label">
                            <input
                                className="search-input-checkbox"
                                type="checkbox"
                                onChange={(e) => setFilterAsNullRefresh(e.target.checked)}
                                checked={filterIsNullRefresh}/>
                            <span className="checkbox-custom"></span>
                            isNullRefresh
                        </label>
                        <label className="checkbox-label">
                            <input
                                className="search-input-checkbox"
                                type="checkbox"
                                onChange={(e) => setFilterAsNullAccess(e.target.checked)}
                                checked={filterIsNullAccess}/>
                            <span className="checkbox-custom"></span>
                            isNullAccess
                        </label>
                        <label className="checkbox-label">
                            <input
                                className="search-input-checkbox"
                                type="checkbox"
                                onChange={(e) => setFilterAsExpiredRefresh(e.target.checked)}
                                checked={filterIsExpiredRefresh}/>
                            <span className="checkbox-custom"></span>
                            isExpiredRefresh
                        </label>
                        <label className="checkbox-label">
                            <input
                                className="search-input-checkbox"
                                type="checkbox"
                                onChange={(e) => setFilterAsEmailConfirmed(e.target.checked)}
                                checked={filterIsEmailConfirmed}/>
                            <span className="checkbox-custom"></span>
                            isEmailConfirmed
                        </label>
                        <button className="search-button" onClick={handleSearchClick}>Поиск</button>
                    </div>
                    {users && visibleUsers.map((user, index) => (
                        <UserCard key={index} user={user} reloadTrigger={() => setReloadTrigger(prev => !prev)}/>))}
                    <footer>
                        <button onClick={handlePreviousPage} disabled={pageNumber === 1}>
                            <svg viewBox="0 0 24 24" width="24" height="24"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.41 16.59L10.83 12L15.41 7.41L14 6L8 12L14 18L15.41 16.59Z"/>
                            </svg>
                            Предыдущая страница
                        </button>
                        <div className="add-button" onClick={handleCreateUser}>
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
            {isModalOpen && <UserCreateModal onClose={handleModalClose}/>}
        </div>
    )
}