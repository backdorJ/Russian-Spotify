import Playlist from "../../../models/Playlist";

export interface ICreateOrEditPlaylistModal {
    show: boolean
    onHide: () => void;
    playlist: Playlist | undefined
    songsIds: Array<string>
    reloadTrigger: () => void;
}