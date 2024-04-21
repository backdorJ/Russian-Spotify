import UserRegisterDto from "../utils/dto/user/userRegisterDto";
import {$authHost, $host} from "./index";
import UserLoginDto from "../utils/dto/user/userLoginDto";
import User from "../models/User";
import UserEditDto from "../utils/dto/user/userEditDto";
// @ts-ignore
import UserConfirmEmailDto from "../utils/dto/user/userConfirmEmailDto";
// @ts-ignore
import UserNewPasswordDto from "../utils/dto/user/userNewPasswordDto";
// @ts-ignore
import UserConfirmNewPasswordDto from "../utils/dto/user/userConfirmNewPasswordDto";
import {ResponseWithMessage} from "../utils/dto/responseWithMessage";
import {getCookieValueByName} from "../functions/getCookieValueByName";

export const getUser = async () => {
    let response = null;
    await $authHost("api/Account/UserInfo")
        .then(x => response = x)
        .catch(error => console.log(error))
        .then(_ => {
            if(getCookieValueByName("token")) {
                localStorage.setItem("token", getCookieValueByName("token")!);
                localStorage.setItem("refresh", getCookieValueByName("refresh")!);
            }
        });

    if(localStorage.getItem("token"))
        response = await $authHost("api/Account/UserInfo");

    if(response === null) {
        await $host.post("api/Auth/RefreshToken", {
            accessToken: localStorage.getItem("token"),
            refreshToken: localStorage.getItem("refresh")
        }).then(x => {
            localStorage.setItem('refresh', x.data.refreshToken);
            localStorage.setItem('token', x.data.accessToken);
        }).catch(error => console.log(error));

        await $authHost("api/Account/UserInfo");
    }

    let cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        let eqPos = cookie.indexOf("=");
        let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }

    const data = response!.data
    return response!.status === 200
        ? User.init(0, data.email, data.userName,
            `${process.env.REACT_APP_SPOTIFY_API}api/File/image/${data.userPhotoId}`)
        : undefined
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
    let userToSend: any = user
    if (user.userName === '')
        userToSend.userName = null
    if (user.currentPassword === '') {
        userToSend.currentPassword = null
        userToSend.newPassword = null
        userToSend.newPasswordConfirm = null
    }
    if (user.filePhotoId === '')
        userToSend.imageId = null

    const response = await $authHost.patch("api/Account/UpdateUserInfo", userToSend)

    return response.status === 200
        ? new ResponseWithMessage(response.status, '', response.data)
        : new ResponseWithMessage(response.status, response.data.message)


}