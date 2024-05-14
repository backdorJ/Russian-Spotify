import React, {FC, useState} from 'react';
import '../../../styles/Modal/Modal.css'
import {createBucket} from "../../../../../http/bucketApi";

interface IBucketCreateModal {
    onClose: () => void;
}

const BucketCreateModal: FC<IBucketCreateModal> = ({onClose}) => {
    const [userId, setUserId] = useState('');
    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        createBucket(userId).then(response => {
            alert(response.message)
            onClose()
        })
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Создание корзины</h2>
                <form>
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

export default BucketCreateModal;
