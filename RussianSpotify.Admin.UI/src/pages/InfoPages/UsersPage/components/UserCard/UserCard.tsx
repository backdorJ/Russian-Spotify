import React, {FC, useState} from "react";
import '../../../styles/Card/Card.css'
import User from "../../../../../models/User";
import {deleteUser} from "../../../../../http/userApi";
import UserUpdateModal from "../UserUpdateModal/UserUpdateModal";
import handleImageNotLoaded from "../../../../../functions/handleImageNotLoaded";
import {getImage} from "../../../../../http/imageApi";

interface IUserCard {
    user: User
    reloadTrigger: () => void
}

const UserCard: FC<IUserCard> = ({user, reloadTrigger}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalClose = () => {
        setIsModalOpen(false);
        reloadTrigger();
    }

    const handleUpdateClick = () => {
        setIsModalOpen(true);
    }

    const handleDeleteClick = () => {
        if (!window.confirm("Вы уверены, что хотите удалить пользователя?"))
            return

        deleteUser(user.id).then(response => {
            alert(response.message)
            reloadTrigger();
        })
    }

    return (
        <div className="card">
            <div className="card-info">
                <div className="avatar">
                    <img src={user.imageId ? getImage(user.imageId): ''} alt="User Avatar" onError={handleImageNotLoaded}/>
                </div>
                <div className="details">
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>ID:</strong> {user.id}</p>
                    <p><strong>Access Token:</strong> {user.accessToken}</p>
                    <p><strong>Refresh Token:</strong> {user.refreshToken}</p>
                    <p><strong>Refresh Token Expires:</strong> {user.refreshTokenExpires}</p>
                    <p><strong>Image ID:</strong> {user.imageId}</p>
                    <p><strong>Email Confirmed:</strong> {user.emailConfirmed ? 'Yes' : 'No'}</p>
                    <p><strong>Role:</strong> {user.role}</p>
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
            {isModalOpen && <UserUpdateModal user={user} onClose={handleModalClose}/>}
        </div>
    );
}

export default UserCard;