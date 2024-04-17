import {deleteFile, uploadFile} from "../http/fileApi";
import {addPlaylist} from "../http/playlistApi";
import CreatePlaylistDto from "../utils/dto/playlist/createPlaylistDto";

const createPlaylistWithFile = async (createPlaylistDto: CreatePlaylistDto) => {
    if (createPlaylistDto.file !== undefined) {
        let fileUploadResponse = await uploadFile(createPlaylistDto.file)
        if (fileUploadResponse.status !== 200)
            return fileUploadResponse

        let addPlaylistResponse = await addPlaylist(createPlaylistDto.name, fileUploadResponse.value)
        if (addPlaylistResponse.status !== 200) {
            await deleteFile(fileUploadResponse.value)
            return addPlaylistResponse
        }
    }

    return await addPlaylist(createPlaylistDto.name, '')
}

export default createPlaylistWithFile