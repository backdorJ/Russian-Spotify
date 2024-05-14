export class GetUsersByFilterResponseItemDto {
    id: string;
    name: string;
    email: string;
    accessToken: string;
    refreshToken: string;
    refreshTokenExpires: string;
    imageId: string;
    emailConfirmed: boolean;
    role: string;
}