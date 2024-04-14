import {uploadFile} from "../http/fileApi";
import {addPlaylist} from "../http/playlistApi";
import CreatePlaylistDto from "../utils/dto/playlist/createPlaylistDto";

const createPlaylistWithFile = async (createPlaylistDto: CreatePlaylistDto) => {
    if (createPlaylistDto.file !== '') {
        let fileId = await uploadFile(createPlaylistDto.file)
        // TODO: instead of '' must be fileId
        await addPlaylist(createPlaylistDto.name, '')
    }

    await addPlaylist(createPlaylistDto.name, '')
}

export default createPlaylistWithFile