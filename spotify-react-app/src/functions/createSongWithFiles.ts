import {deleteFile, uploadFile} from "../http/fileApi";
import {addPlaylist} from "../http/playlistApi";
import CreateSongDto from "../utils/dto/song/createSongDto";
import {addSong} from "../http/songApi";

const createSongWithFiles = async (createSongDto: CreateSongDto) => {
    if (createSongDto.songFile === undefined)
        throw Error("Song file cannot be undefined")

    let songFileUploadResponse = await uploadFile(createSongDto.songFile)
    if (songFileUploadResponse.status !== 200)
        return songFileUploadResponse

    if (createSongDto.imageFile !== undefined) {
        let imageFileUploadResponse = await uploadFile(createSongDto.imageFile)
        if (imageFileUploadResponse.status !== 200) {
            await deleteFile(songFileUploadResponse.value)
            return imageFileUploadResponse
        }

        let addPlaylistResponse = await addSong(createSongDto.name, createSongDto.duration,
            createSongDto.category, songFileUploadResponse.value, imageFileUploadResponse.value)
        if (addPlaylistResponse.status !== 200) {
            await deleteFile(songFileUploadResponse.value)
            await deleteFile(imageFileUploadResponse.value)
            return addPlaylistResponse
        }

        return addPlaylistResponse
    }

    let addPlaylistResponse = await addSong(createSongDto.name, createSongDto.duration,
        createSongDto.category, songFileUploadResponse.value, '')

    if (addPlaylistResponse.status !== 200) {
        await deleteFile(songFileUploadResponse.value)
        return addPlaylistResponse
    }

    return addPlaylistResponse
}

export default createSongWithFiles