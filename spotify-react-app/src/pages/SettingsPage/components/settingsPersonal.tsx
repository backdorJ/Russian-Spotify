import EditUserInfoModal from "./modals/editUserInfoModal/editUserInfoModal";
import {useState} from "react";

export default function SettingsPersonal(props: any) {
    const [showModal, setShowModal] = useState(false)
    let username = "irekkkarimov"
    let email = "irek@gmail.com"

    if (showModal)
        document.getElementById("body")!.style.overflowY = 'hidden';
    else
        document.getElementById("body")!.style.overflowY = 'visible';

    return (
        <div className="settings__personal">
            <div className="settings__personal__main">
                <UserInfoElement header="Username" text="Your username" value={username}/>
                <UserInfoElement header="Email" text="Your email" value={email}/>
                <UserInfoElement header="Password" text="Your password" value="********"/>
            </div>
            <div className="settings__personal__main__edit">
                <button
                    onClick={() => setShowModal(prev => !prev) }
                    className="settings__personal__main__edit__button">
                    Edit your info
                </button>
            </div>
            <EditUserInfoModal show={showModal} onHide={() => setShowModal(false)}/>
        </div>
    )
}

function UserInfoElement(props: any) {
    const {header, text, value} = props

    return (
        <div className="settings__personal__user-info">
            <h2 className="settings__personal__user-info__header">
                {header}
            </h2>
            <div className="settings__personal__user-info__main">
                <p className="settings__personal__user-info__main__text">
                    {text}:
                </p>
                <div className="settings__personal__user-info__main__display">
                    <p className="settings__personal__user-info__main__display__username">
                        {value}
                    </p>
                </div>
            </div>
        </div>
    )
}