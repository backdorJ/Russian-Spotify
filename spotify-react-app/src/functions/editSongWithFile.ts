import EditSongDto from "../utils/dto/song/editSongDto";
import {deleteFile, uploadFile} from "../http/fileApi";
import {editSong} from "../http/songApi";


const editSongWithFile = async (editSongDto: EditSongDto) => {
    if (editSongDto.imageFile !== undefined) {
        let fileUploadResponse = await uploadFile(editSongDto.imageFile)
        if (fileUploadResponse.status !== 200)
            return fileUploadResponse
        let addPlaylistResponse = await editSong(editSongDto.song.songId,
            editSongDto.name,
            editSongDto.category,
            editSongDto.duration,
            fileUploadResponse.value)
        if (addPlaylistResponse.status !== 200) {
            await deleteFile(fileUploadResponse.value)
            return addPlaylistResponse
        }

        return addPlaylistResponse
    }

    return await editSong(editSongDto.song.songId,
        editSongDto.name,
        editSongDto.category,
        editSongDto.duration,
        undefined)
}

export default editSongWithFile