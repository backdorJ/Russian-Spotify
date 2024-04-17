import {uploadFile} from "../http/fileApi";
import {addPlaylist} from "../http/playlistApi";
import CreatePlaylistDto from "../utils/dto/playlist/createPlaylistDto";
import {ResponseWithMessage} from "../utils/dto/responseWithMessage";

const createPlaylistWithFile = async (createPlaylistDto: CreatePlaylistDto) => {
    if (createPlaylistDto.file !== undefined) {
        let fileUploadResponse = await uploadFile(createPlaylistDto.file)
        if (fileUploadResponse.status !== 200)
            return fileUploadResponse

        return await addPlaylist(createPlaylistDto.name, fileUploadResponse.value)
    }

    return await addPlaylist(createPlaylistDto.name, '')
}

export default createPlaylistWithFile