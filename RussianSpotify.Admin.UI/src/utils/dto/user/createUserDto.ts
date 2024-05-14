export default class CreateUserDto {
    name: string;
    email: string;
    photoId: string | null = null;
    role: string;
    password: string;

    constructor(name: string,
                email: string,
                photoId: string | null = null,
                role: string,
                password: string) {
        this.name = name;
        this.email = email;
        this.photoId = photoId;
        this.role = role;
        this.password = password;
    }
}