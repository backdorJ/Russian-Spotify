import axios from "axios";

const $host = axios.create({
    baseURL: process.env.REACT_APP_SPOTIFY_ADMIN_API,
    validateStatus: () => true
})

const $authAdminHost = axios.create({
    baseURL: process.env.REACT_APP_SPOTIFY_ADMIN_API,
    validateStatus: () => true
})

export {
    $host,
    $authAdminHost
}