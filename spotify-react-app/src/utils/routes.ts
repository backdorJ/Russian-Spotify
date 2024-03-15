import HomePage from "../pages/HomePage/HomePage";
import routeNames from "./routeNames";
import SettingsPage from "../pages/SettingsPage/SettingsPage";

export default [
    {
        path: routeNames.HOME_PAGE,
        element: HomePage
    },
    {
        path: routeNames.SETTINGS_PAGE,
        element: SettingsPage
    }
]