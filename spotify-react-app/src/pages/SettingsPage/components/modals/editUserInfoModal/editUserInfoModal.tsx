import React, {useState} from "react";
import './editUserInfoModal.css'


export default function EditUserInfoModal(props: any) {
    const {show, onHide} = props
    const [name, setName] = useState("irekkkarimov")
    const [password1, setPassword1] = useState("")
    const [password2, setPassword2] = useState("")
    let Email = "irek@gmail.com"


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
                            value={Email}
                            className="edit-profile__field edit-profile__field-disabled"
                            placeholder="Type new email"
                            disabled/>
                        <h3>
                            Name:
                        </h3>
                        <input
                            type="text"
                            id="edit-profile__name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className="edit-profile__field"
                            placeholder="Type profile name"/>
                    </div>
                    <div className="edit-profile__form__right">
                        <h3>
                            Password:
                        </h3>
                        <div className="edit-profile__form__right__fields">
                            <input
                                type="password"
                                id="edit-profile__password"
                                name="password"
                                value={password1}
                                onChange={e => setPassword1(e.target.value)}
                                className="edit-profile__field"
                                placeholder="Type new password"/>
                            <input
                                type="password"
                                id="edit-profile__password"
                                name="password"
                                value={password2}
                                onChange={e => setPassword2(e.target.value)}
                                className="edit-profile__field"
                                placeholder="Repeat new password"/>
                        </div>
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
                        // onClick={submitProfileForm}
                    >
                        Save
                    </button>
                </div>
            </div>
        </>
    );
}