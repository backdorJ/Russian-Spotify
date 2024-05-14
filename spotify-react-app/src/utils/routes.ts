import routeNames from "./routeNames";
import HomePage from "../pages/HomePage/HomePage";
import SettingsPage from "../pages/SettingsPage/SettingsPage";
import registerPage from "../pages/RegisterPage/RegisterPage";
import loginPage from "../pages/LoginPage/LoginPage";
import AccountPage from "../pages/AccountPage/AccountPage";
import PlaylistPage from "../pages/PlaylistPage/PlaylistPage";
import ConfirmationCodePage from "../pages/ConfirmationCodePage/ConfirmationCodePage";
import SearchPage from "../pages/SearchPage/SearchPage";
import AuthorPage from "../pages/AuthorPage/AuthorPage";
// @ts-ignore
import ResetPasswordPage from "../pages/ResetPasswordPage/ResetPasswordPage";
import AboutPage from "../pages/AboutPage/AboutPage";

export const routes = []

export const notAuthRoutes = [
    {
        path: routeNames.REGISTRATION_PAGE,
        Component: registerPage
    },
    {
        path: routeNames.LOGIN_PAGE,
        Component: loginPage
    },
    {
        path: routeNames.CONFIRMATION_CODE_PAGE,
        Component: ConfirmationCodePage
    },
    {
        path: routeNames.RESET_PASSWORD_PAGE,
        Component: ResetPasswordPage
    }
]

export const authRoutes = [
    {
        path: routeNames.HOME_PAGE,
        Component: HomePage
    },
    {
        path: routeNames.ACCOUNT_PAGE,
        Component: AccountPage
    },
    {
        path: routeNames.SETTINGS_PAGE,
        Component: SettingsPage
    },
    {
        path: routeNames.PLAYLIST_PAGE_ROUTE,
        Component: PlaylistPage
    },
    {
      path: routeNames.AUTHOR_SONGS_ROUTE,
      Component: PlaylistPage
    },
    {
        path: routeNames.SEARCH_PAGE,
        Component: SearchPage
    },
    {
        path: routeNames.AUTHOR_PAGE_ROUTE,
        Component: AuthorPage
    },
    {
        path: routeNames.ABOUT_PAGE,
        Component: AboutPage
    }
]