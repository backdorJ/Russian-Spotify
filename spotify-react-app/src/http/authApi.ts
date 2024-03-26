import UserRegisterDto from "../utils/dto/user/userRegisterDto";
import {$host} from "./index";
import UserLoginDto from "../utils/dto/user/userLoginDto";


export const register = async (user: UserRegisterDto) => {
    const response = await $host.post("api/Account/Register", user)
    return response.status === 200
}

export const login = async (user: UserLoginDto) => {
    const response = await $host.post("api/Account/Login", user)
    localStorage.setItem('token', response.data.accessToken)
    return !!(response.status === 200 && response.data.accessToken);
}