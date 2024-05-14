import routeNames from "../../../utils/routeNames";

export interface IButton {
    name: string;
    route: string
    color: string;
}

export const buttonsData: IButton[] = [
    {name: 'Users', route: routeNames.USERS_PAGE, color: 'red'},
    {name: 'Buckets', route: routeNames.BUCKETS_PAGE, color: 'green'},
    {name: 'Songs', route: routeNames.SONGS_PAGE, color: 'blue'},
    {name: 'Subscriptions', route: routeNames.SUBSCRIPTIONS_PAGE, color: 'gray'},
    {name: 'Playlists', route: routeNames.PLAYLISTS_PAGE, color: 'mediumpurple'},
    {name: 'Files', route: routeNames.FILES_PAGE, color: 'purple'}
];