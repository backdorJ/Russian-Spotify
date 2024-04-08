/** Функция которая возвращает ссылку на картинку
 * @param imageId - id картинки в бд
 * */
export const getImage: (imageId: string) => string
    =  (imageId) => {
    return `${process.env.REACT_APP_SPOTIFY_API}api/File/image/${imageId}`;
}