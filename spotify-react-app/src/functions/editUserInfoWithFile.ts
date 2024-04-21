import UserEditDto from "../utils/dto/user/userEditDto";
import {deleteFile, uploadFile} from "../http/fileApi";
import {edit} from "../http/authApi";

const editUserInfoWithFile = async (username: string, oldPassword: string, newPassword: string,
                                    newPasswordConfirm: string, file: File) => {
    let userEditDto = new UserEditDto(username, oldPassword, newPassword, newPassword, '')
    if (file !== undefined) {
        let fileUploadResponse = await uploadFile(file)
        if (fileUploadResponse.status !== 200)
            return fileUploadResponse

        userEditDto.filePhotoId = fileUploadResponse.value
        let editUserInfoResponse = await edit(userEditDto)
        if (editUserInfoResponse.status !== 200) {
            await deleteFile(fileUploadResponse.value)
            return editUserInfoResponse
        }

        return editUserInfoResponse
    }
    return await edit(userEditDto)
}

export default editUserInfoWithFile