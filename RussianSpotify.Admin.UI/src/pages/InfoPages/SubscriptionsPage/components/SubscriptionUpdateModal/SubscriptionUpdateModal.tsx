import React, {FC, useState} from 'react';
import '../../../styles/Modal/Modal.css'
import {updateSubscription} from "../../../../../http/subscriptionApi";
import Subscription from "../../../../../models/Subscription";
import {formatDate} from "../../../../../functions/formatDate";

interface ISubscriptionUpdateModalProps {
    subscription: Subscription;
    onClose: () => void;
}

const SubscriptionUpdateModal: FC<ISubscriptionUpdateModalProps> = ({subscription, onClose}) => {
    const [dateStart, setDateStart] = useState(formatDate(subscription.dateStart));
    const [dateEnd, setDateEnd] = useState(formatDate(subscription.dateEnd));
    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        updateSubscription(subscription.id, new Date(dateStart), new Date(dateEnd)).then(response => {
            alert(response.message)
            onClose()
        })
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Изменение подписки</h2>
                <form>
                    <label>
                        Дата начала:
                        <input type="date" value={dateStart} onChange={(e) => setDateStart(e.target.value)}/>
                    </label>
                    <label>
                        Дата окончания:
                        <input type="date" value={dateEnd} onChange={(e) => setDateEnd(e.target.value)}/>
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

export default SubscriptionUpdateModal;
