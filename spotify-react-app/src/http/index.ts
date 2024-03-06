import axios from "axios";

const $host = axios.create({
    baseURL: process.env.SPOTIFY_API
})

const $authHost = axios.create({
    baseURL: process.env.SPITOFY_API
})

function authInterceptor(config: any) {
    let token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}