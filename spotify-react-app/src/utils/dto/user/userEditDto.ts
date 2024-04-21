export default class UserEditDto {
    userName: string;
    currentPassword: string;
    newPassword: string;
    newPasswordConfirm: string;
    filePhotoId: string;

    constructor(userName: string, currentPassword: string, newPassword: string, newPasswordConfirm: string, filePhotoId: string) {
        this.userName = userName;
        this.currentPassword = currentPassword;
        this.newPassword = newPassword;
        this.newPasswordConfirm = newPasswordConfirm;
        this.filePhotoId = filePhotoId;
    }
}