import {getImage} from "../../../http/fileApi";
import {useNavigate} from "react-router-dom";
import routeNames from "../../../utils/routeNames";
import React from "react";
import handleImageNotLoaded from "../../../functions/handleImageNotLoaded";

const SearchPlaylistCard = (props: any) => {
    const {playlist} = props
    const navigate = useNavigate()

    return (
        <div
            onClick={() => navigate(routeNames.PLAYLIST_PAGE_NAV + playlist.playlistId)}
            className="search-playlist">
            <div className="search-playlist__left">
                <img
                    src={getImage(playlist.imageId)}
                    alt={playlist.playlistName}
                    onError={handleImageNotLoaded}/>
            </div>
            <div className="search-playlist__right">
                <h2>{playlist.playlistName}</h2>
                <div className="search-playlist__right__bottom">
                    <p className="search-playlist__right__bottom__description">
                        {
                            playlist.isAlbum
                            ? 'Album' : 'Playlist'
                        }
                    </p>
                    <p className="search-playlist__right__bottom__author">
                        By <span>{playlist.authorName}</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SearchPlaylistCard