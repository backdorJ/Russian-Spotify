import './styles/SettingsPage.css'
import settingsPages from "../../utils/settings/settingsPages";
import {useState} from "react";


export default function SettingsPage(props: any) {
    const [chosenPage, setChosenPage] = useState(0)

    return (
        <div className="settings">
            <div className="settings__header">
                <h2>Settings</h2>
                <div className="settings__header__navbar">
                    <ul className="settings__header__navbar__list">
                        {
                            settingsPages.map(i => (
                                <li
                                    onClick={() => setChosenPage(i.id)}
                                    style={i.id === chosenPage ? {border: "2px solid #343333"} : {border: "2px solid transparent"}}>{i.name}</li>
                            ))
                        }
                    </ul>
                </div>
            </div>
            {
                settingsPages.filter(i => i.id === chosenPage).map(i => (
                    <i.component/>
                ))}
        </div>
    )
}