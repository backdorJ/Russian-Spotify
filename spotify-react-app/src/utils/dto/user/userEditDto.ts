export default class UserEditDto {
    userName: string;
    currentPassword: string;
    newPassword: string;
    newPasswordConfirm: string;

    constructor(userName: string, currentPassword: string, newPassword: string, newPasswordConfirm: string) {
        this.userName = userName;
        this.currentPassword = currentPassword;
        this.newPassword = newPassword;
        this.newPasswordConfirm = newPasswordConfirm;
    }
}