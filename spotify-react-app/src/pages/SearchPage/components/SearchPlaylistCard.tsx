// @ts-ignore
import playlist_icon from '../../../assets/mock/homepage/playlistsBig/blend_spotify.png'

const SearchPlaylistCard = (props: any) => {
    const {playlist} = props

    return (
        <div className="search-playlist">
            <div className="search-playlist__left">
                <img src={playlist.imageUrl} alt=""/>
            </div>
            <div className="search-playlist__right">
                <h2>{playlist.title}</h2>
                <div className="search-playlist__right__bottom">
                    <p className="search-playlist__right__bottom__description">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aliquam amet asperiores
                        consectetur consequuntur dicta doloremque, earum harum id illum labore laudantium
                    </p>
                    <p className="search-playlist__right__bottom__author">
                        By <span>{playlist.author}</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SearchPlaylistCard