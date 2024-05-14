export const getImage = (imageId: string) => {
    return `${process.env.REACT_APP_SPOTIFY_API}api/File/image/${imageId}`;
}