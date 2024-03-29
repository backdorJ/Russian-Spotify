import HomePage from "../pages/HomePage/HomePage";
import routeNames from "./routeNames";
import SettingsPage from "../pages/SettingsPage/SettingsPage";
import registerPage from "../pages/RegisterPage/RegisterPage";
import loginPage from "../pages/LoginPage/LoginPage";
import AccountPage from "../pages/AccountPage/AccountPage";

export const routes = [
]

export const notAuthRoutes = [
    {
        path: routeNames.REGISTRATION_PAGE,
        Component: registerPage
    },
    {
        path: routeNames.LOGIN_PAGE,
        Component: loginPage
    }
]

export const authRoutes = [
    {
        path: routeNames.HOME_PAGE,
        Component: HomePage
    },
    {
        path: routeNames.SETTINGS_PAGE,
        Component: SettingsPage
    },
    {
        path: routeNames.ACCOUNT_PAGE,
        Component: AccountPage
    }
]