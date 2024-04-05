import axios from "axios";
import {isJwtDied} from "../functions/isJwtDied";

const $host = axios.create({
    baseURL: process.env.REACT_APP_SPOTIFY_API
})

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_SPOTIFY_API
})

function authInterceptor(config: any) {
    let token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`

    if(isJwtDied(token)) {
        let refreshToken = localStorage.getItem('refresh');
        $host.post("api/Auth/RefreshToken", {
            accessToken: token,
            refreshToken: refreshToken
        }).then(x => {
            config.headers.Authorization = `Bearer ${x.data.accessToken}`;
            localStorage.setItem('token', token!);
            localStorage.setItem('refresh', x.data.refreshToken);
        }).catch(_ => {});
    }

    return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}