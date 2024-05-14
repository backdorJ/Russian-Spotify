import React, {useContext, useState} from "react";
import './editUserInfoModal.css'
import {UserContext} from "../../../../../index";
import loadUser from "../../../../../functions/loadUser";
import {observer} from "mobx-react-lite";
import editUserInfoWithFile from "../../../../../functions/editUserInfoWithFile";


const EditUserInfoModal = observer((props: any) => {
    const userStore = useContext(UserContext)
    const {show, onHide} = props
    const [username, setUsername] = useState(userStore.user.username)
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [files, setFiles] = useState(new Array<File>())

    const handleEdit = () => {
        editUserInfoWithFile(username, oldPassword, newPassword, newPassword, files[0])
            .then(response => {
                console.log(response)
                if (response.status === 200) {
                    alert("Personal data was successfully changed!")
                    loadUser()
                        .then(user => {
                            if (user !== undefined)
                                userStore.login(user)
                        })
                        .then(_ => {
                            reset()
                            onHide()
                        })
                } else {
                    if (response.status >= 500)
                        alert("Internal error occurred! Please try later!")
                    else
                        alert(response.message)
                }
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
                <div className="modal-content__header">
                    <h2>Profile editing</h2>
                    <p>If you don't want to update, leave field empty or default</p>
                </div>
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
                        <h3>Profile photo:</h3>
                        <input
                            type="file"
                            id="edit-profile__password"
                            onChange={e => {
                                if (e.target.files !== null) {
                                    const file = e.target.files[0]
                                    setFiles([file])
                                }
                            }}
                            className="edit-profile__field edit-profile__field__file"
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
                            autoComplete="false"
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
                            autoComplete="false"
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