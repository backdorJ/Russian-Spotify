export default function SettingsGeneral() {

    return (
        <div className="settings__general">
            <div className="settings__general__language">
                <h3 className="settings__general__language__header">
                    language
                </h3>
                <div className="settings__general__language__main">
                    <p className="settings__general__language__main__text">
                        Choose language - changes will be applied immediately
                    </p>
                    <select className="settings__general__language__main__switcher">
                        <option>English</option>
                        <option>Russian</option>
                    </select>
                </div>
            </div>
        </div>
    )
}