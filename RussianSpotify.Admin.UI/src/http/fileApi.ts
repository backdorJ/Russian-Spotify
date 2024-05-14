import {$authAdminHost} from "./index";
import {MessageWithValue} from "../utils/dto/messageWithValue";
import DeleteDto from "../utils/dto/deleteDto";
import GetFilesByFilterDto from "../utils/dto/files/getFilesByFilterDto";

export const getFilesByFilter = async (pageNumber: number,
                                       pageSize: number,
                                       isSongFile: boolean | null = null,
                                       isImageFile: boolean | null = null,
                                       orderBySize: boolean | null = null,
                                       id: string | null = null,
                                       name: string | null = null,
                                       address: string | null = null,
                                       sizeMoreThen: number | null = null,
                                       sizeLessThen: number | null = null) => {
    const dto = new GetFilesByFilterDto(pageNumber, pageSize, id, name, isSongFile, isImageFile, address, sizeMoreThen, sizeLessThen, orderBySize);
    const response = await $authAdminHost.get('api/FileInteraction/GetFilesByFilter', {params: {...dto}})
    return (response.status !== 200)
        ? new MessageWithValue(response.data.message)
        : new MessageWithValue('', response.data.files)
}

export const createFile = async (file: File) => {
    const formData = new FormData();
    formData.append('files', file);
    const response = await $authAdminHost.post('api/FileInteraction/CreateFile', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    return response.status !== 201
        ? new MessageWithValue(response.data.message)
        : new MessageWithValue(`Файл создан успешно\nЕго ID:\n${response.data.id}`)
}

export const deleteFile = async (fileId: string) => {
    const dto = new DeleteDto(fileId)
    const response = await $authAdminHost.delete('api/FileInteraction/DeleteFile', {data: dto})
    return response.status === 200
        ? new MessageWithValue('Файл был удален')
        : new MessageWithValue(response.data.message)
}