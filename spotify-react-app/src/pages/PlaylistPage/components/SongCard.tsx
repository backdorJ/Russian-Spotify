// @ts-ignore
import song_img from "../../../assets/mock/playlistpage/songs/slow_grenade_img.png"
// @ts-ignore
import not_liked_icon from "../../../assets/mock/playlistpage/like.png"
// @ts-ignore
import liked_icon from "../../../assets/mock/playlistpage/songs/liked.png"
import {Fragment} from "react";

const SongCard = (props: any) => {
    const {id, name, artists, album, length, isLiked} = props
    let artistCount = artists.length
    let artistsArray = [...artists]
    let artistsMapped = artistsArray.map((artist, index) => {
        if (index < artistCount - 1)
            return (<Fragment><span>{artist}</span>, </Fragment>)
        return (<Fragment><span>{artist}</span></Fragment>)
    })

    return (
        <div className="playlist-page__songs__list__main__song-card">
            <div className="playlist-page__songs__list__main__song-card__id">
                <p>{id}</p>
            </div>
            <div className="playlist-page__songs__list__main__song-card__title">
                <img src={song_img} alt={name}
                     className="playlist-page__songs__list__main__song-card__title__img"/>
                <div className="playlist-page__songs__list__main__song-card__title__info">
                    <div className="playlist-page__songs__list__main__song-card__title__info__song-name">
                        <p>{name}</p>
                    </div>
                    <div className="playlist-page__songs__list__main__song-card__title__info__artist-names">
                        <p>{artistsMapped}</p>
                    </div>
                </div>
            </div>
            <div className="playlist-page__songs__list__main__song-card__album">
                <p>{album}</p>
            </div>
            <div className="playlist-page__songs__list__main__song-card__added">

            </div>
            <div className="playlist-page__songs__list__main__song-card__liked">
                {
                    isLiked
                        ? <img src={liked_icon} alt="Dislike"/>
                        : <img src={not_liked_icon} alt="Like"/>
                }
            </div>
            <div className="playlist-page__songs__list__main__song-card__length">
                <p>{length}</p>
            </div>
        </div>
    )
}

export default SongCard