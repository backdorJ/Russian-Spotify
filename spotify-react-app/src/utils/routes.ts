import HomePage from "../pages/HomePage/HomePage";
import routeNames from "./routeNames";
import SettingsPage from "../pages/SettingsPage/SettingsPage";
import registerPage from "../pages/RegisterPage/RegisterPage";
import loginPage from "../pages/LoginPage/LoginPage";
import AccountPage from "../pages/AccountPage/AccountPage";
import PlaylistPage from "../pages/PlaylistPage/PlaylistPage";
import EmailConfirmationPage from "../pages/EmailConfirmationPage/EmailConfirmationPage";
import SearchPage from "../pages/SearchPage/SearchPage";
import AuthorPage from "../pages/AuthorPage/AuthorPage";

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
    },
    {
        path: routeNames.EMAIL_CONFIRMATION_PAGE,
        Component: EmailConfirmationPage
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
        path: routeNames.SEARCH_PAGE,
        Component: SearchPage
    },
    {
        path: routeNames.AUTHOR_PAGE,
        Component: AuthorPage
    }
]