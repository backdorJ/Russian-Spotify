export default class UserRegisterDto {
    username: string;
    email: string;
    password: string;
    passwordConfirm: string;

    constructor(username: string,
                email: string,
                password: string,
                passwordConfirm: string) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.passwordConfirm = passwordConfirm;
    }
}