import {IPlaylist} from "./interfaces/IPlaylist";
import {FC} from "react";
import './styles/Playlist.css'
import {getImage} from "../../http/fileApi";
import {useNavigate} from "react-router-dom";
import routeNames from "../../utils/routeNames";
import handleImageNotLoaded from "../../functions/handleImageNotLoaded";

const Playlist: FC<IPlaylist> = ({playlist}) => {
    const navigate = useNavigate()

    return (
        <div
            onClick={() => navigate(routeNames.PLAYLIST_PAGE_NAV + playlist.playlistId)}
            className="home-page__playlist-normal">
            <div className="home-page__playlist-normal__image-div">
                <img
                    src={getImage(playlist.imageId)}
                    alt="Фотка альбома"
                    onError={handleImageNotLoaded}
                    className="home-page__playlist-normal__image"/>
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