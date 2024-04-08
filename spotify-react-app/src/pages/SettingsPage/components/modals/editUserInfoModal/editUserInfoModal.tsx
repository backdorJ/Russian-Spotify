import React, {useContext, useState} from "react";
import './editUserInfoModal.css'
import {UserContext} from "../../../../../index";
import UserEditDto from "../../../../../utils/dto/user/userEditDto";
import {edit} from "../../../../../http/authApi";
import loadUser from "../../../../../functions/loadUser";
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";


const EditUserInfoModal = observer((props: any) => {
    const userStore = useContext(UserContext)
    const {show, onHide} = props
    const [username, setUsername] = useState(userStore.user.username)
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")

    const handleEdit = () => {
        if (username === "" || oldPassword === "" || newPassword === "") {
            alert("All fields must be filled!")
            return
        }

        let userEditDto = new UserEditDto(username, oldPassword, newPassword, newPassword)
        edit(userEditDto)
            .then(status => {
                if (status) {
                    alert("Personal data was successfully changed!")
                    loadUser()
                        .then(user => userStore.login(user))
                        .then(_ => {
                            reset()
                            onHide()
                        })
                }
                else
                    alert("Something went wrong! Please try again")
            })
    }

    const reset = () => {
        setUsername(userStore.user.username)
        setOldPassword("")
        setNewPassword("")
    }


    return (
        show &&
        <>
            <div className="overlay" onClick={() => {
                onHide()
                // reset()
            }}>
            </div>
            <div className="modal-content">
                <h2>Profile editing</h2>
                <div className="modal-hr"></div>
                <form className="edit-profile__form">
                    <div className="edit-profile__form__left">
                        <h3>
                            Email:
                        </h3>
                        <input
                            type="text"
                            id="edit-profile__email"
                            name="email"
                            value={userStore.user.email}
                            className="edit-profile__field edit-profile__field-disabled"
                            placeholder="Type new email"
                            disabled/>
                        <h3>
                            Username:
                        </h3>
                        <input
                            type="text"
                            id="edit-profile__name"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            className="edit-profile__field"
                            placeholder="Type profile name"
                            required/>
                    </div>
                    <div className="edit-profile__form__right">
                        <h3>
                            Old password:
                        </h3>
                        <input
                            type="password"
                            id="edit-profile__password"
                            name="password"
                            value={oldPassword}
                            onChange={e => setOldPassword(e.target.value)}
                            className="edit-profile__field"
                            placeholder="Type new password"
                            required/>
                        <h3>
                            New password:
                        </h3>
                        <input
                            type="password"
                            id="edit-profile__password"
                            name="password"
                            value={newPassword}
                            onChange={e => setNewPassword(e.target.value)}
                            className="edit-profile__field"
                            placeholder="Repeat new password"
                            required/>
                    </div>
                </form>
                <div className="modal-buttons">
                    <button
                        className="close-modal"
                        onClick={() => {
                            onHide()
                            // reset()
                        }}>
                        Close
                    </button>
                    <button
                        className="submit-modal"
                        onClick={handleEdit}
                    >
                        Update
                    </button>
                </div>
            </div>
        </>
    );
})

export default EditUserInfoModal