export default class UserResetPasswordDto {
    email: string;

    constructor(email: string) {
        this.email = email;
    }
}