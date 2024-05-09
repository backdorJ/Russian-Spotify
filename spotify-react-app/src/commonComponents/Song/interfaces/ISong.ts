import Song from "../../../models/Song";

/**Интерфейс для пропса, который включает в себя песню*/
export interface ISong {
    song: Song;
    order_number: number | undefined
    onModalOpen: (() => void) | undefined
    playlistReloadTrigger: (() => void) | undefined
}