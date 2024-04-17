export default class UserNewPasswordDto {
    email: string;
    newPassword: string;
    newPasswordConfirm: string;

    constructor(email: string, newPassword: string, newPasswordConfirm: string) {
        this.email = email;
        this.newPassword = newPassword;
        this.newPasswordConfirm = newPasswordConfirm;
    }
}