import UserRegisterDto from "../utils/dto/user/userRegisterDto";
import {$authHost, $host} from "./index";
import UserLoginDto from "../utils/dto/user/userLoginDto";
import User from "../models/User";
import UserEditDto from "../utils/dto/user/userEditDto";
import UserConfirmEmailDto from "../utils/dto/user/userConfirmEmailDto";
import UserNewPasswordDto from "../utils/dto/user/userNewPasswordDto";
import UserConfirmNewPasswordDto from "../utils/dto/user/userConfirmNewPasswordDto";

export const getUser = async () => {
    const response = await $authHost("api/Account/UserInfo");

    const data = response.data
    return response.status === 200
        ? User.init(0, data.email, data.userName,
            `${process.env.REACT_APP_SPOTIFY_API}api/File/image/${data.userPhotoId}`)
        : new User()
}

export const register = async (user: UserRegisterDto) => {
    const response = await $host.post("api/auth/Register", user)
    return response.status === 200
}

export const confirmEmail = async (user: UserConfirmEmailDto) => {
    const response = await $authHost.post("api/auth/ConfirmEmail", user)
    return response.status === 200
}

export const resetPassword = async (user: UserNewPasswordDto) => {
    const response = await $host.post("api/auth/ResetPassword", user)
    return response.status === 200
}

export const confirmNewPassword = async (user: UserConfirmNewPasswordDto) => {
    const response = await $host.post("api/auth/ConfirmPasswordReset", user)
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