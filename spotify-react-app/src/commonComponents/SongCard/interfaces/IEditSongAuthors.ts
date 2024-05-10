import Song from "../../../models/Song";

export interface IEditSongAuthors {
    song: Song
    show: boolean
    onHide: () => void
    reloadTrigger : (() => void) | undefined
}