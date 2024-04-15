import {FC} from "react";
import {IPlaylist} from "../../../commonComponents/Playlist/interfaces/IPlaylist";
import {getImage} from "../../../http/fileApi";

const PlaylistNormal: FC<IPlaylist> = ({playlist}) => {

    // let descriptionFormatted = 'Здесь могла бы быть ваша реклама'.slice(0, 20)

    return (
        <div className="home-page__playlist-normal">
            <div className="home-page__playlist-normal__image-div">
                <img src={getImage(playlist.imageId)} alt={playlist.playlistName} className="home-page__playlist-normal__image"/>
            </div>
            <div className="home-page__playlist-normal__text">
                <div className="home-page__playlist-normal__text__title">
                    <p>
                        {playlist.playlistName}
                    </p>
                </div>
                <div className="home-page__playlist-normal__text__description">
                    <p>
                        Здесь могла бы быть ваша реклама
                    </p>
                </div>
            </div>
        </div>
    )
}

export default PlaylistNormal