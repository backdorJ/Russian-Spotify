import Playlist from "../../../models/Playlist";
import Song from "../../../models/Song";

export interface ICreateOrEditSongModal {
    show: boolean
    onHide: () => void;
    song: Song | undefined
    reloadTrigger: () => void;
}