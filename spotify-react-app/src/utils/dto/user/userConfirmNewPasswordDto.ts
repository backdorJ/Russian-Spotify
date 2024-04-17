export default class UserConfirmNewPasswordDto {
    email: string;
    newPassword: string;
    verificationCodeFromUser: string;

    constructor(email: string, newPassword: string, verificationCodeFromUser: string) {
        this.email = email;
        this.newPassword = newPassword;
        this.verificationCodeFromUser = verificationCodeFromUser;
    }
}