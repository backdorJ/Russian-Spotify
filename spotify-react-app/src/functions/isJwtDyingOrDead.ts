/**Проверка протухший ли JWT или нет
 * @param jwt - JWT
 * */
export const isJwtDyingOrDead : (jwt : string | null) => boolean = (jwt): boolean => {
    if (jwt === null || jwt == undefined || jwt == '')
        return false;

    const [_, encodedPayload, __] = jwt!.split('.');

    const payload = JSON.parse(base64UrlDecode(encodedPayload));

    let tokenExpiryTime = new Date(Number(payload.exp) * 1000);
    tokenExpiryTime.setHours(tokenExpiryTime.getHours() - 1)

    return tokenExpiryTime < new Date();
}

function base64UrlDecode(str: string) {
    console.log(str);
    str = str.replace(/-/g, '+').replace(/_/g, '/');

    while (str.length % 4 !== 0)
        str += '=';

    return decodeURIComponent(escape(atob(str)));
}