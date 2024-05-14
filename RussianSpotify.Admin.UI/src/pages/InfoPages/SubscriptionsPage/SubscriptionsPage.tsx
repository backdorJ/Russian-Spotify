import React, {useEffect, useState} from "react";
import Header from "../../../commonComponents/Header/Header";
import "../styles/InfoPage.css";
import {getSubscriptionsByFilter} from "../../../http/subscriptionApi";
import SubscriptionCard from "./components/SubscriptionCard/SubscriptionCard";
import SubscriptionCreateModal from "./components/SubscriptionCreateModal/SubscriptionCreateModal";
import Subscription from "../../../models/Subscription";
import FilterDateComponent from "./components/DateSelector/FIlterDateComponent/FilterDateComponent";

export const SubscriptionsPage = () => {
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize] = useState(20);
    const [reloadTrigger, setReloadTrigger] = useState(false);
    const [filter, setFilter] = useState<string | null>('');
    const [filterType, setFilterType] = useState("id");
    const [startedBefore, setStartedBefore] = useState<Date | null>(null);
    const [startedAfter, setStartedAfter] = useState<Date | null>(null);
    const [finishedBefore, setFinishedBefore] = useState<Date | null>(null);
    const [finishedAfter, setFinishedAfter] = useState<Date | null>(null);
    const [filterIsAlreadyFinished, setFilterAsAlreadyFinished] = useState(false);

    const handleSearchClick = () => {
        setPageNumber(1);
        setReloadTrigger((prevState) => !prevState);
    };

    useEffect(() => {
        console.log(!subscriptions || !filter, subscriptions, filter)
        !subscriptions || !filter && getSubscriptionsByFilter(pageNumber, pageSize).then((response) => {
            if (response.message)
                alert(response.message);
            else
                setSubscriptions(response.value);
        });

        if (!filter)
            return

        let getSubscriptionsFunc;
        switch (filterType) {
            case "id":
                getSubscriptionsFunc = getSubscriptionsByFilter(
                    pageNumber,
                    pageSize,
                    filterIsAlreadyFinished,
                    startedAfter ? startedAfter : null,
                    finishedAfter ? finishedAfter : null,
                    finishedBefore ? finishedBefore : null,
                    startedBefore ? startedBefore : null,
                    filter
                );
                break;
            case "userId":
                getSubscriptionsFunc = getSubscriptionsByFilter(
                    pageNumber,
                    pageSize,
                    filterIsAlreadyFinished,
                    startedAfter ? startedAfter : null,
                    finishedAfter ? finishedAfter : null,
                    finishedBefore ? finishedBefore : null,
                    startedBefore ? startedBefore : null,
                    null,
                    filter
                );
                break;
            case "userRole":
                getSubscriptionsFunc = getSubscriptionsByFilter(
                    pageNumber,
                    pageSize,
                    filterIsAlreadyFinished,
                    startedAfter ? startedAfter : null,
                    finishedAfter ? finishedAfter : null,
                    finishedBefore ? finishedBefore : null,
                    startedBefore ? startedBefore : null,
                    null,
                    null,
                    filter
                );
                break;
            default:
                break;
        }
        if (getSubscriptionsFunc) {
            getSubscriptionsFunc.then((response) => {
                if (response.message)
                    alert(response.message);
                else
                    setSubscriptions(response.value);
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
        setReloadTrigger((prev) => !prev);
    };

    const handleCreateSubscription = () => {
        setIsModalOpen(true);
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalClose = () => {
        setIsModalOpen(false);
        handleReloadTrigger();
    };

    const visibleSubscriptions = subscriptions
        ? subscriptions.slice((pageNumber - 1) * pageSize, pageNumber * pageSize)
        : [];

    const totalPages = subscriptions
        ? Math.ceil(subscriptions.length / pageSize)
        : 0;

    return (
        <div className="info-page">
            <Header/>
            <div className="info-page-content">
                <div className="info-page-wrapper">
                    <div className="info-page-content-header">
                        <p className="info-page-content-header-text">Подписки</p>
                    </div>
                    <div className="search-container">
                        <input
                            className="search-input"
                            type="text"
                            placeholder="Введите ID, Name, Author ID, Author Name, Image ID"
                            value={filter ? filter : ""}
                            onChange={(e) => setFilter(e.target.value)}
                        />
                        <select
                            className="search-select"
                            onChange={(e) => setFilterType(e.target.value)}
                        >
                            <option value="id">ID</option>
                            <option value="userId">User ID</option>
                            <option value="userRole">User role</option>
                        </select>
                        <label className="checkbox-label">
                            <input
                                className="search-input-checkbox"
                                type="checkbox"
                                onChange={(e) => setFilterAsAlreadyFinished(e.target.checked)}
                                checked={filterIsAlreadyFinished}
                            />
                            <span className="checkbox-custom"></span>
                            alreadyFinished
                        </label>
                        <button className="search-button" onClick={handleSearchClick}>
                            Поиск
                        </button>
                    </div>
                    <FilterDateComponent
                        startedBefore={startedBefore}
                        startedAfter={startedAfter}
                        finishedBefore={finishedBefore}
                        finishedAfter={finishedAfter}
                        setStartedBefore={setStartedBefore}
                        setStartedAfter={setStartedAfter}
                        setFinishedBefore={setFinishedBefore}
                        setFinishedAfter={setFinishedAfter}
                    />
                    {subscriptions &&
                        visibleSubscriptions.map((subscription, index) => (
                            <SubscriptionCard
                                key={index}
                                subscription={subscription}
                                reloadTrigger={() => setReloadTrigger((prev) => !prev)}
                            />
                        ))}
                    <footer>
                        <button onClick={handlePreviousPage} disabled={pageNumber === 1}>
                            <svg
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                                fill="white"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M15.41 16.59L10.83 12L15.41 7.41L14 6L8 12L14 18L15.41 16.59Z"
                                    fill="white"
                                />
                            </svg>
                            Предыдущая страница
                        </button>
                        <div className="add-button" onClick={handleCreateSubscription}>
                            <p className="add-button-text">Добавить</p>
                        </div>
                        <button
                            onClick={handleNextPage}
                            disabled={totalPages === pageNumber || !totalPages}
                        >
                            Следующая страница
                            <svg
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                                fill="white"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M8.59003 7.41L13.17 12L8.59003 16.59L10 18L16 12L10 6L8.59003 7.41Z"
                                    fill="white"
                                />
                            </svg>
                        </button>
                    </footer>
                </div>
            </div>
            {isModalOpen && <SubscriptionCreateModal onClose={handleModalClose}/>}
        </div>
    );
};
