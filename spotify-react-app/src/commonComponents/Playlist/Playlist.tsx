import {IPlaylist} from "./interfaces/IPlaylist";
import {FC} from "react";
import './styles/Playlist.css'
import {getImage} from "../../http/fileApi";

const Playlist: FC<IPlaylist> = ({playlist}) => {
    return (
        <div className="home-page__playlist-normal">
            <div className="home-page__playlist-normal__image-div">
                <img src={getImage(playlist.imageId)} alt="Фотка хуя" className="home-page__playlist-normal__image"/>
            </div>
            <div className="home-page__playlist-normal__text">
                <div className="home-page__playlist-normal__text__title">
                    <p>
                        {playlist.playlistName}
                    </p>
                </div>
                <div className="home-page__playlist-normal__text__description">
                    <p>
                        {playlist.isAlbum ? "Альбом" : "Плейлист"}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Playlist;