export default class User {
    id: string;
    name: string;
    email: string;
    accessToken: string;
    refreshToken: string;
    refreshTokenExpires: string;
    imageId: string;
    emailConfirmed: boolean;
    role: string;

    constructor(id: string,
                name: string,
                email: string,
                accessToken: string,
                refreshToken: string,
                refreshTokenExpires: string,
                imageId: string,
                emailConfirmed: boolean,
                role: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.refreshTokenExpires = refreshTokenExpires;
        this.imageId = imageId;
        this.emailConfirmed = emailConfirmed;
        this.role = role;
    }
}