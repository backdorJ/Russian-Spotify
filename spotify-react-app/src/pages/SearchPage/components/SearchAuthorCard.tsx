import {Fragment} from "react";
import {getImage} from "../../../http/fileApi";
import {useNavigate} from "react-router-dom";
import routeNames from "../../../utils/routeNames";
import handleImageNotLoaded from "../../../functions/handleImageNotLoaded";


const SearchAuthorCard = (props: any) => {
    const {author} = props
    const navigate = useNavigate()

    const playlists = [...author.albums]

    let playlistsMapped = playlists.map((playlist, index) => {
        if (index < playlists.length - 1)
            return (<Fragment><span className="search-author__right__author-playlist"
                                    onClick={() => navigate(routeNames.PLAYLIST_PAGE_NAV + playlist.albumId)}>{playlist.albumName}</span>,
            </Fragment>)
        return (<Fragment><span className="search-author__right__author-playlist"
                                onClick={() => navigate(routeNames.PLAYLIST_PAGE_NAV + playlist.albumId)}>{playlist.albumName}</span></Fragment>)
    })

    let additionalPlaylistCountDisplay = author.totalCount > playlists.length
        ? `and ${author.totalCount - playlists.length} more album` :
        ''

    let additionalsEnding = author.playlistCount > playlists.length ?
        (author.playlistCount - playlists.length) > 1 ? 's' : '' : ''

    return (
        <div className="search-author">
            <div className="search-author__left">
                <img
                    src={getImage(author.imageId)}
                    alt={author.authorName}
                    onError={handleImageNotLoaded}/>
            </div>
            <div className="search-author__right">
                    <h2 className="search-author__right__author-name"
                        onClick={() => navigate(`/author/${author.authorName}`)}>{author.authorName}</h2>
                <p className="search-author__right__author-playlists">{playlistsMapped} {additionalPlaylistCountDisplay} {additionalsEnding}</p>
            </div>
        </div>
    )
}

export default SearchAuthorCard