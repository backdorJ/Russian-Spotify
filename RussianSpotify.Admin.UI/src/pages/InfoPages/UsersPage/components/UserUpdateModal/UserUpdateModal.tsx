import React, {FC, useState} from 'react';
import '../../../styles/Modal/Modal.css'
import User from "../../../../../models/User";
import {updateUser} from "../../../../../http/userApi";

interface IUserUpdateModalProps {
    user: User;
    onClose: () => void;
}

const UserUpdateModal: FC<IUserUpdateModalProps> = ({user, onClose}) => {
    const [userName, setUserName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [userPhotoId, setUserPhotoId] = useState(user.imageId);
    const [role, setRole] = useState(user.role);
    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        updateUser(user.id, userName, email, userPhotoId, role).then(response => {
            alert(response.message)
            onClose()
        })
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Изменение пользователя</h2>
                <form>
                    <label>
                        Имя:
                        <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)}/>
                    </label>
                    <label>
                        Email:
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </label>
                    <label>
                        Фото пользователя:
                        <input type="text" value={userPhotoId} onChange={(e) => setUserPhotoId(e.target.value)}/>
                    </label>
                    <label>
                        Роль:
                        <select value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="Пользователь">Пользователь</option>
                            <option value="Админ">Админ</option>
                            <option value="Автор">Автор</option>
                        </select>
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

export default UserUpdateModal;
