export default class UserRegisterDto {
    username: string;
    email: string;
    password: string;
    passwordConfirm: string;
    role: string;

    constructor(username: string,
                email: string,
                password: string,
                passwordConfirm: string,
                role: string) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.passwordConfirm = passwordConfirm;
        this.role = role;
    }
}