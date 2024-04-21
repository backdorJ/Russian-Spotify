import {FC} from "react";
import {IPlaylist} from "../../../commonComponents/Playlist/interfaces/IPlaylist";
import {getImage} from "../../../http/fileApi";
import {useNavigate} from "react-router-dom";
import routeNames from "../../../utils/routeNames";

const PlaylistLittle: FC<IPlaylist> = ({playlist}) => {
    const navigate = useNavigate()

    return (
        <div
            onClick={() => navigate(routeNames.PLAYLIST_PAGE_NAV + playlist.playlistId)}
            className="homepage__playlist-little">
            <div className="homepage__playlist-little__image-div">
                <img src={getImage(playlist.imageId)} alt={playlist.playlistName} className="homepage__playlist-little__image"/>
            </div>
            <div className="homepage__playlist-little__name-div">
                <p>
                    {playlist.playlistName}
                </p>
            </div>
        </div>
    )
}

export default PlaylistLittle
