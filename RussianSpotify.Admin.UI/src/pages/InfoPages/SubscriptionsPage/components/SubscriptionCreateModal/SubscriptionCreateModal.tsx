import React, {FC, useState} from 'react';
import '../../../styles/Modal/Modal.css'
import {createSubscription} from "../../../../../http/subscriptionApi";

interface ISubscriptionCreateModal {
    onClose: () => void;
}

const SubscriptionCreateModal: FC<ISubscriptionCreateModal> = ({onClose}) => {
    const [dateStart, setDateStart] = useState('');
    const [dateEnd, setDateEnd] = useState('');
    const [userId, setUserId] = useState('');
    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        createSubscription(new Date(dateStart), new Date(dateEnd), userId).then(response => {
                alert(response.message)
                onClose()
            }
        )
    }

    const handleDateStartUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const dateValue = e.target.value;
        setDateStart(dateValue);
    }

    const handleDateEndUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const dateValue = e.target.value;
        setDateEnd(dateValue);
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Создание подписки</h2>
                <form>
                    <label>
                        Дата начала:
                        <input type="date" value={dateStart} onChange={handleDateStartUpdate}/>
                    </label>
                    <label>
                        Дата окончания:
                        <input type="date" value={dateEnd} onChange={handleDateEndUpdate}/>
                    </label>
                    <label>
                        ID пользователя:
                        <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)}/>
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

export default SubscriptionCreateModal;
