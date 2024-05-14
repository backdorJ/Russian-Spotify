import {$host} from "./index";
import AdminLoginDto from "../utils/dto/admin/adminLoginDto";
import {MessageWithValue} from "../utils/dto/messageWithValue";
import Admin from "../models/Admin";

/** Логин админа
 * @param admin - AdminLoginDto дто для логина админа*/
export const login = async (admin: AdminLoginDto) => {
    const response = await $host.post("api/Auth/Login", admin)
    localStorage.setItem('token', response.data)
    Admin.init(admin.email)
    return (response.status == 201 && response.data
        ? new MessageWithValue('')
        : new MessageWithValue(response.data.message));
}