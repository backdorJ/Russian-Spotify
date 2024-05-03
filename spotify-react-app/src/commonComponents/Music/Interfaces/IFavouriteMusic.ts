import Playlist from "../../../models/Playlist";

/**Интерфейс для пропса, который содержит SongCard[]*/
export interface IFavouriteMusic {
    Playlist: Playlist;
}