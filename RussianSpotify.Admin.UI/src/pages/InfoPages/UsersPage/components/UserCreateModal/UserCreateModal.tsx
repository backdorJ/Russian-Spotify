import React, {FC, useState} from 'react';
import '../../../styles/Modal/Modal.css'
import {createUser} from "../../../../../http/userApi";

interface IUserCreateModal {
    onClose: () => void;
}

const UserCreateModal: FC<IUserCreateModal> = ({onClose}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [userPhotoId, setUserPhotoId] = useState('');
    const [role, setRole] = useState('Пользователь');
    const [password, setPassword] = useState('');
    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        createUser(name, email, userPhotoId, role, password).then(response => {
                alert(response.message)
                onClose()
            })
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Создание пользователя</h2>
                <form>
                    <label>
                        Имя:
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
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
                    <label>
                        Пароль:
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
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

export default UserCreateModal;
