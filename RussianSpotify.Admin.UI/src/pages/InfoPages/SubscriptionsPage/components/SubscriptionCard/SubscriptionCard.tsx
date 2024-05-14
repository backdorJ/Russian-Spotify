import React, {FC, useState} from "react";
import '../../../styles/Card/Card.css'
import {deleteSubcription} from "../../../../../http/subscriptionApi";
import Subscription from "../../../../../models/Subscription";
import SubscriptionUpdateModal from "../SubscriptionUpdateModal/SubscriptionUpdateModal";
import {formatDate} from "../../../../../functions/formatDate";

interface ISubscriptionCard {
    subscription: Subscription
    reloadTrigger: () => void
}

const SubscriptionCard: FC<ISubscriptionCard> = ({subscription, reloadTrigger}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalClose = () => {
        setIsModalOpen(false);
        reloadTrigger()
    }

    const handleUpdateClick = () => {
        setIsModalOpen(true);
    }

    const handleDeleteClick = () => {
        if (!window.confirm("Вы уверены, что хотите удалить подписку?"))
            return

        deleteSubcription(subscription.id).then(response => {
            alert(response.message)
            reloadTrigger()
        })
    }

    return (
        <div className="card">
            <div className="details">
                <p><strong>ID:</strong> {subscription.id}</p>
                <p><strong>Start Date:</strong> {formatDate(subscription.dateStart)}</p>
                <p><strong>End Date:</strong> {formatDate(subscription.dateEnd)}</p>
                <p><strong>User ID:</strong> {subscription.userId}</p>
            </div>
            <div className="action-buttons">
                <div className="update-button" onClick={handleUpdateClick}>
                    <p className="update-button-text">Изменить</p>
                </div>
                <div className="delete-button" onClick={handleDeleteClick}>
                    <p className="delete-button-text">Удалить</p>
                </div>
            </div>
            {isModalOpen && <SubscriptionUpdateModal subscription={subscription} onClose={handleModalClose}/>}
        </div>
    );
}

export default SubscriptionCard;