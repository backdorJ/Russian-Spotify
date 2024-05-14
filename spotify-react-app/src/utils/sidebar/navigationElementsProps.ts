// @ts-ignore
import home_icon from '../../assets/sidebar/home_icon.png'
// @ts-ignore
import search_icon from '../../assets/sidebar/search_icon.png'
// @ts-ignore
import about_icon from '../../assets/sidebar/about.png'
// @ts-ignore
import library_icon from '../../assets/sidebar/library_icon.png'
import routeNames from "../routeNames";

export default [
    {
        icon: home_icon,
        title: 'home',
        navigateTo: routeNames.HOME_PAGE
    },
    {
        icon: search_icon,
        title: 'search',
        navigateTo: routeNames.SEARCH_PAGE
    },
    {
        icon: library_icon,
        title: 'your library',
        navigateTo: routeNames.ACCOUNT_PAGE + "#favourites"
    },
    {
        icon: about_icon,
        title: 'About us',
        navigateTo: routeNames.ABOUT_PAGE
    }
]