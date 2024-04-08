import axios from "axios";
import {isJwtDyingOrDead} from "../functions/isJwtDyingOrDead";

const $host = axios.create({
    baseURL: process.env.REACT_APP_SPOTIFY_API
})

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_SPOTIFY_API
})

// TODO: Пофиксить вызов метода RefreshToken, он должен быть не тут
async function authInterceptor(config: any) {
    let token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`

    if(isJwtDyingOrDead(token)) {
        let refreshToken = localStorage.getItem('refresh');
         await $host.post("api/Auth/RefreshToken", {
            accessToken: token,
            refreshToken: refreshToken
        }).then(x => {
            config.headers.Authorization = `Bearer ${x.data.accessToken}`;
            localStorage.setItem('token', token!);
            localStorage.setItem('refresh', x.data.refreshToken);
        }).catch(error => {console.log(error)});
    }
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}