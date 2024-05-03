import Song from "../../../models/Song";
import Playlist from "../../../models/Playlist";

/**Интерфейс для пропса, который включает в себя песню*/
export interface ISongCard {
    song: Song;
    order_number: number | undefined
    current_playlist: Playlist
}