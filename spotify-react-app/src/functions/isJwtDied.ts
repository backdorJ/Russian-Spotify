/**Проверка протухший ли JWT или нет
 * @param jwt - JWT
 * */
export const isJwtDied: (jwt: string | null) => boolean = (jwt): boolean => {
    if (!jwt) return false;

    const [_, encodedPayload, __] = jwt!.split('.');

    let decodedPayLoad = base64UrlDecode(encodedPayload)

    if (!decodedPayLoad)
        return false;

    const payload = JSON.parse(decodedPayLoad);

    let tokenExpiryTime = new Date(Number(payload.exp) * 1000);

    return tokenExpiryTime < new Date();
}

export function base64UrlDecode(str: string) {
    if (!str)
        return '';

    str = str.replace(/-/g, '+').replace(/_/g, '/');

    while (str.length % 4 !== 0)
        str += '=';

    return decodeURIComponent(escape(atob(str)));
}