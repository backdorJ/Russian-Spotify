export default class UpdateUserDto {
    id: string;
    userName: string | null;
    emailConfirmed: boolean | null;
    email: string | null;
    userPhotoId: string | null;
    role: string;

    constructor(id: string,
                userName: string | null = null,
                emailConfirmed: boolean | null = null,
                email: string | null = null,
                userPhotoId: string | null = null,
                role: string) {
        this.id = id;
        this.userName = userName;
        this.emailConfirmed = emailConfirmed;
        this.email = email;
        this.userPhotoId = userPhotoId;
        this.role = role;
    }
}