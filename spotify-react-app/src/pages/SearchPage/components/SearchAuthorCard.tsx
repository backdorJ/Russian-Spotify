import {Fragment} from "react";


const SearchAuthorCard = (props: any) => {
    const {author} = props

    const playlists = [...author.playlists]

    let playlistsMapped = playlists.map((playlist, index) => {
        if (index < playlists.length - 1)
            return (<Fragment><span>{playlist}</span>, </Fragment>)
        return (<Fragment><span>{playlist}</span></Fragment>)
    })

    let additionalPlaylistCountDisplay = author.playlistCount > playlists.length
        ? `and ${author.playlistCount - playlists.length} more album` :
        ''

    let additionalsEnding = author.playlistCount > playlists.length ?
        (author.playlistCount - playlists.length) > 1 ? 's' : '' : ''

    return (
        <div className="search-author">
            <div className="search-author__left">
                <img src={author.imageUrl} alt={author.name}/>
            </div>
            <div className="search-author__right">
                <h2>{author.name}</h2>
                <p>{playlistsMapped} {additionalPlaylistCountDisplay}{additionalsEnding}</p>
            </div>
        </div>
    )
}

export default SearchAuthorCard