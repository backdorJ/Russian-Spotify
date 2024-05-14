import routeNames from "./routeNames";
import HomePage from "../pages/HomePage/HomePage";
import loginPage from "../pages/LoginPage/LoginPage";
import {SongsPage} from "../pages/InfoPages/SongsPage/SongsPage";
import {PlaylistsPage} from "../pages/InfoPages/PlaylistsPage/PlaylistsPage";
import {SubscriptionsPage} from "../pages/InfoPages/SubscriptionsPage/SubscriptionsPage";
import {FilesPage} from "../pages/InfoPages/FilesPage/FilesPage";
import {BucketsPage} from "../pages/InfoPages/BucketsPage/BucketsPage";
import {UsersPage} from "../pages/InfoPages/UsersPage/UsersPage";

export const notAuthRoutes = [
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
        path: routeNames.USERS_PAGE,
        Component: UsersPage
    },
    {
        path: routeNames.SONGS_PAGE,
        Component: SongsPage
    },
    {
        path: routeNames.PLAYLISTS_PAGE,
        Component: PlaylistsPage
    },
    {
        path: routeNames.SUBSCRIPTIONS_PAGE,
        Component: SubscriptionsPage
    },
    {
        path: routeNames.FILES_PAGE,
        Component: FilesPage
    },
    {
        path: routeNames.BUCKETS_PAGE,
        Component: BucketsPage
    }
]