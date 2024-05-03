import Song from "../../../models/Song";

/**Интерфейс для пропса, который содержит SongCard[]*/
export interface IFavouriteMusic {
    favouriteSongs: Song[];
}