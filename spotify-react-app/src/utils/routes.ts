import HomePage from "../pages/HomePage/HomePage";
import routeNames from "./routeNames";
import SettingsPage from "../pages/SettingsPage/SettingsPage";
import registerPage from "../pages/RegisterPage/RegisterPage";
import loginPage from "../pages/LoginPage/LoginPage";

export const routes = [
    {
        path: routeNames.REGISTRATION_PAGE,
        element: registerPage
    },
    {
        path: routeNames.LOGIN_PAGE,
        element: loginPage
    }
]

export const authRoutes = [
    {
        path: routeNames.HOME_PAGE,
        element: HomePage
    },
    {
        path: routeNames.SETTINGS_PAGE,
        element: SettingsPage
    }
]