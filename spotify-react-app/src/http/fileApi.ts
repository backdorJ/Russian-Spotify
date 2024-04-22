import {$authHost} from "./index";
import {ResponseWithMessage} from "../utils/dto/responseWithMessage";

/** Функция которая возвращает ссылку на картинку
 * @param imageId - id картинки в бд
 * */
export const getImage: (imageId: string) => string
    = (imageId) => {
    return `${process.env.REACT_APP_SPOTIFY_API}api/File/image/${imageId}`;
}

export const uploadFile = async (file: File) => {
    let formData = new FormData();
    formData.append('files', file)

    const response = await $authHost.post('api/file', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })

    if (response.status === 200)
        return new ResponseWithMessage(200, '', response.data.fileNameToIds[0].fileId)

    return new ResponseWithMessage(response.status, response.data.message)
}

export const deleteFile = async (fileId: string) => {
    const response = await $authHost.delete('api/File/Delete?' +
        new URLSearchParams({
            fileId: fileId
        }))

    return response.status === 200
        ? new ResponseWithMessage(response.status, '')
        : new ResponseWithMessage(response.status, response.data.message)
}