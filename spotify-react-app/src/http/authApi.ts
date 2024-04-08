import UserRegisterDto from "../utils/dto/user/userRegisterDto";
import {$authHost, $host} from "./index";
import UserLoginDto from "../utils/dto/user/userLoginDto";
import User from "../models/User";
import UserEditDto from "../utils/dto/user/userEditDto";

export const getUser = async () => {
    const response = await $authHost("api/Account/UserInfo");

    const data = response.data
    return response.status === 200
        ? User.init(0, data.email, data.userName)
        : new User()
}

export const register = async (user: UserRegisterDto) => {
    const response = await $host.post("api/auth/Register", user)
    return response.status === 200
}

/** Логин пользователя
 * @param user - UserLoginDto дто для логина пользователя*/
export const login = async (user: UserLoginDto) => {
    const response = await $host.post("api/auth/Login", user)
    localStorage.setItem('token', response.data.accessToken)
    localStorage.setItem('refresh', response.data.refreshToken);
    return !!(response.status === 200 && response.data.accessToken && response.data.refreshToken);
}

export const edit = async (user: UserEditDto) => {
    const response = await $authHost.patch("api/Account/UpdateUserInfo", user)
    return response.status === 200
}