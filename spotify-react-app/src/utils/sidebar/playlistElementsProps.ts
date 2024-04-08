// @ts-ignore
import create_playlist from '../../assets/sidebar/create_playlist.png'
// @ts-ignore
import liked_songs from '../../assets/sidebar/liked_songs.png'
import routeNames from "../routeNames";

export default [
    {
        icon: create_playlist,
        title: 'create playlist',
        navigateTo: routeNames.HOME_PAGE
    },
    {
        icon: liked_songs,
        title: 'liked songs',
        navigateTo: routeNames.ACCOUNT_PAGE
    }
]