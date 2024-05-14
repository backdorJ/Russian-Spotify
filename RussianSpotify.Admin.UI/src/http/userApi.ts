import {$authAdminHost} from "./index";
import GetUsersByFilterDto from "../utils/dto/user/getUsersByFilterDto";
import {MessageWithValue} from "../utils/dto/messageWithValue";
import DeleteDto from "../utils/dto/deleteDto";
import UpdateUserDto from "../utils/dto/user/updateUserDto";
import CreateUserDto from "../utils/dto/user/createUserDto";

export const getUsersByFilter = async (pageNumber: number,
                                       pageSize: number,
                                       isNullRefresh: boolean | null = null,
                                       isNullAccess: boolean | null = null,
                                       isExpiredRefresh: boolean | null = null,
                                       isEmailConfirmed: boolean | null = null,
                                       id: string | null = null,
                                       userName: string | null = null,
                                       email: string | null = null,
                                       role: string | null = null) => {
    const dto = new GetUsersByFilterDto(pageNumber, pageSize, userName, id, email, isNullRefresh, isNullAccess, isExpiredRefresh, isEmailConfirmed, role);
    const response = await $authAdminHost.get('api/UserInteraction/GetUsersByFilter', {params: {...dto}})
    return (response.status !== 200)
        ? new MessageWithValue(response.data.message)
        : new MessageWithValue('', response.data.users)
}

export const createUser = async (name: string, email: string, photoId: string | null = null, role: string, password: string) => {
    const dto = new CreateUserDto(name, email, photoId, role, password);
    const response = await $authAdminHost.post('api/UserInteraction/CreateUser', dto)
    return (response.status !== 201)
        ? new MessageWithValue(response.data.message)
        : new MessageWithValue('Пользователь создан успешно')
}

export const deleteUser = async (id: string) => {
    const dto = new DeleteDto(id)
    const response = await $authAdminHost.delete('api/UserInteraction/DeleteUser', {data: dto})
    return response.status === 200
        ? new MessageWithValue('Пользователь был удалён')
        : new MessageWithValue(response.data.message)
}

export const updateUser = async (id: string, userName: string, email: string, userPhotoId: string, role: string) => {
    const dto = new UpdateUserDto(id, userName, null, email, userPhotoId, role)
    const response = await $authAdminHost.patch('api/UserInteraction/UpdateUser', dto)
    return response.status === 200
        ? new MessageWithValue('Пользователь успешно обновлён')
        : new MessageWithValue(response.data.message)
}