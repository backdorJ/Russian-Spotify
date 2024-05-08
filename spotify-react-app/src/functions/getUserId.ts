import {base64UrlDecode} from "./isJwtDied";

export const getUserId = () => {
    const jwt: string | null = localStorage.getItem("token");

    if (jwt == null) return null;

    const [_, encodedPayload, __] = jwt.split('.');

    const payload = JSON.parse(base64UrlDecode(encodedPayload));

    return payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
}
