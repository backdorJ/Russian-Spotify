import React, {FC, useState} from "react";
import '../../../styles/Card/Card.css'
import BucketUpdateModal from "../BucketUpdateModal/BucketUpdateModal";
import Bucket from "../../../../../models/Bucket";
import {deleteBucket} from "../../../../../http/bucketApi";

interface IBucketCard {
    bucket: Bucket
    reloadTrigger: () => void
}

const BucketCard: FC<IBucketCard> = ({bucket, reloadTrigger}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalClose = () => {
        setIsModalOpen(false);
        reloadTrigger()
    }

    const handleUpdateClick = () => {
        setIsModalOpen(true);
    }

    const handleDeleteClick = () => {
        if (!window.confirm("Вы уверены, что хотите удалить плейлист?"))
            return

        deleteBucket(bucket.bucketId).then(response => {
            alert(response.message)
            reloadTrigger()
        })
    }

    return (
        <div className="card">
            <div className="card-info">
                <div className="details">
                    <p><strong>ID:</strong> {bucket.bucketId}</p>
                    <p><strong>User Id:</strong> {bucket.userId}</p>
                </div>
            </div>
            <div className="action-buttons">
                <div className="update-button" onClick={handleUpdateClick}>
                    <p className="update-button-text">Изменить</p>
                </div>
                <div className="delete-button" onClick={handleDeleteClick}>
                    <p className="delete-button-text">Удалить</p>
                </div>
            </div>
            {isModalOpen && <BucketUpdateModal bucket={bucket} onClose={handleModalClose}/>}
        </div>
    );
}

export default BucketCard;