import {deleteFile, uploadFile} from "../http/fileApi";
import {addPlaylist, editPlaylist} from "../http/playlistApi";
import EditPlaylistDto from "../utils/dto/playlist/editPlaylistDto";

const editPlaylistWithFile = async (editPlaylistDto: EditPlaylistDto) => {
    if (editPlaylistDto.file !== undefined) {
        let fileUploadResponse = await uploadFile(editPlaylistDto.file)
        if (fileUploadResponse.status !== 200)
            return fileUploadResponse

        let addPlaylistResponse = await editPlaylist(editPlaylistDto.playlist.playlistId,
            editPlaylistDto.name,
            fileUploadResponse.value,
            editPlaylistDto.songsIds)
        if (addPlaylistResponse.status !== 200) {
            await deleteFile(fileUploadResponse.value)
            return addPlaylistResponse
        }

        return addPlaylistResponse
    }

    return await editPlaylist(editPlaylistDto.playlist.playlistId,
        editPlaylistDto.name,
        '',
        editPlaylistDto.songsIds)
}

export default editPlaylistWithFile