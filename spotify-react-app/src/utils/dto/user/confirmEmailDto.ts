export default class ConfirmEmailDto {
    email: string;
    emailVerificationCodeFromUser: string;

    constructor(email: string, confirmationCode: string) {
        this.email = email;
        this.emailVerificationCodeFromUser = confirmationCode;
    }
}