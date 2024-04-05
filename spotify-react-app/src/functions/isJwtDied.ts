/**Проверка протухший ли JWT или нет
 * @param jwt - JWT
 * */
export const isJwtDied : (jwt : string | null) => boolean = (jwt): boolean => {
    if (jwt === null)
        return false;

    const [_, encodedPayload, __] = jwt!.split('.');

    const payload = JSON.parse(base64UrlDecode(encodedPayload));

    let tokenExpiryTime = new Date(Number(payload.exp) * 1000);

    return new Date() > tokenExpiryTime;
}

function base64UrlDecode(str: string) {
    str = str.replace(/-/g, '+').replace(/_/g, '/');

    while (str.length % 4 !== 0) {
        str += '=';
    }

    return decodeURIComponent(escape(atob(str)));
}