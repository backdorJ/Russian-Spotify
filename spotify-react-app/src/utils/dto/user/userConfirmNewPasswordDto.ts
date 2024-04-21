export default class UserConfirmNewPasswordDto {
    email: string;
    newPassword: string;
    newPasswordConfirm: string;
    verificationCodeFromUser: string;

    constructor(email: string, newPassword: string, newPasswordConfirm: string, verificationCodeFromUser: string) {
        this.email = email;
        this.newPassword = newPassword;
        this.newPasswordConfirm = newPasswordConfirm
        this.verificationCodeFromUser = verificationCodeFromUser;
    }
}