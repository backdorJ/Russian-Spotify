import Song from "../../../../models/Song";

/**Интерфейс для пропса, который содержит Song[]*/
export interface IFavoriteMusic {
    favoriteSongs: Song[];
}