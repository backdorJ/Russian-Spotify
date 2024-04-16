export default class userConfirmEmailDto {
    email: string;
    emailVerificationCodeFromUser: string;

    constructor(email: string, confirmationCode: string) {
        this.email = email;
        this.emailVerificationCodeFromUser = confirmationCode;
    }
}