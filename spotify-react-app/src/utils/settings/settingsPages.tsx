import SettingsGeneral from "../../pages/SettingsPage/components/settingsGeneral";
import SettingsPlayer from "../../pages/SettingsPage/components/settingsPlayer";
import SettingsPersonal from "../../pages/SettingsPage/components/settingsPersonal";

export default [
    {
        id: 0,
        name: 'general',
        component: SettingsGeneral
    },
    {
        id: 1,
        name: 'personal',
        component: SettingsPersonal
    },
    {
        id: 2,
        name: 'player',
        component: SettingsPlayer
    }
]