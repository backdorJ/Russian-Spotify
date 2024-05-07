// @ts-ignore
import not_liked_icon from "../../../assets/mock/playlistpage/like.png"
// @ts-ignore
import liked_icon from "../../../assets/mock/playlistpage/songs/liked.png"
import {FC, Fragment, useContext, useEffect, useState} from "react";
import {getImage} from "../../../http/fileApi";
import {useNavigate} from "react-router-dom";
import {getSong, tryAddSongToFavorites, tryRemoveSongFromFavorites} from "../../../http/songApi";
import {ISong} from "../../../commonComponents/Song/interfaces/ISong";
import {PlayerContext, UserContext} from "../../../index";
import handleImageNotLoaded from "../../../functions/handleImageNotLoaded";
import PlayIcon from "../../../assets/mock/common/PlayIcon";
import CreateOrEditSongModal
    from "../../../commonComponents/SideBar/components/CreateOrEditSongModal/CreateOrEditSongModal";
import roles from "../../../utils/roles";

const SongCard: FC<ISong> = ({song, order_number, onModalOpen}) => {
    const userStore = useContext(UserContext)
    const playerStore = useContext(PlayerContext)
    const navigate = useNavigate();
    const [isLikedSong, setIsLikedSong] = useState(song.isInFavorite)
    const [isMouseOverPlay, setIsMouseOverPlay] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [reloadTrigger, setReloadTrigger] = useState(false)
    let isInLikeProcess = false;
    let artistCount = song.authors.length
    let artistsMapped = song.authors.map((artist, index) => {
        if (index < artistCount - 1)
            return (<Fragment><span onClick={() => navigate(`/author/${artist}`)}>{artist}</span>, </Fragment>)
        return (<Fragment><span onClick={() => navigate(`/author/${artist}`)}>{artist}</span></Fragment>)
    })

    useEffect(() => {
        if (showEditModal)
            document.getElementById("body")!.style.overflowY = 'hidden';
        else
            document.getElementById("body")!.style.overflowY = 'visible';

        if (onModalOpen !== undefined)
            onModalOpen()
    }, [showEditModal]);

    const handleLikeClick = () => {
        if (!isInLikeProcess) {
            isInLikeProcess = true;
            if (!isLikedSong) {
                tryAddSongToFavorites(song.songId)
                    .then(isSuccessful => {
                        if (isSuccessful) {
                            setIsLikedSong(true);
                            isInLikeProcess = false;
                        }
                    });
            } else {
                tryRemoveSongFromFavorites(song.songId)
                    .then(isSuccessful => {
                        if (isSuccessful) {
                            setIsLikedSong(false);
                            isInLikeProcess = false;
                        }
                    });
            }
        }
    }

    const handlePlay = () => {
        playerStore.Player = getSong(song, userStore.user);
    }

    return (
        <div
            className="playlist-page__songs__list__main__song-card">
            <div
                onClick={handlePlay}
                onMouseEnter={() => setIsMouseOverPlay(true)}
                onMouseLeave={() => setIsMouseOverPlay(false)}
                style={{marginRight: isMouseOverPlay ? '25px' : '20px', marginLeft: isMouseOverPlay ? '-5px' : '0'}}
                className="playlist-page__songs__list__main__song-card__id">
                {
                    isMouseOverPlay
                        ? <PlayIcon song={song} order_number={order_number} onModalOpen={undefined}/>
                        : <p>{order_number}</p>
                }
            </div>
            <div className="playlist-page__songs__list__main__song-card__title">
                <img
                    onClick={handlePlay}
                    src={getImage(song.imageId)}
                    alt={song.songName}
                    onError={handleImageNotLoaded}
                    className="playlist-page__songs__list__main__song-card__title__img"/>
                <div className="playlist-page__songs__list__main__song-card__title__info">
                    <div
                        onClick={() => {
                            if (userStore.user.roles.includes(roles.Author))
                                setShowEditModal(true)
                            else
                                handlePlay()
                        }}
                        className="playlist-page__songs__list__main__song-card__title__info__song-name">
                        <p>{song.songName}</p>
                    </div>
                    <div
                        className="playlist-page__songs__list__main__song-card__title__info__artist-names">
                        <p>{artistsMapped}</p>
                    </div>
                </div>
            </div>
            <div className="playlist-page__songs__list__main__song-card__album">
                <p>Some album</p>
            </div>
            <div className="playlist-page__songs__list__main__song-card__added">
                <p></p>
            </div>
            <div onClick={handleLikeClick} className="playlist-page__songs__list__main__song-card__liked">
                {
                    isLikedSong
                        ? <img src={liked_icon} alt="Dislike"/>
                        : <img src={not_liked_icon} alt="Like"/>
                }
            </div>
            <div className="playlist-page__songs__list__main__song-card__length">
                <p>{Math.floor(song.duration / 60)}:{(song.duration % 60).toString().padStart(2, '0')}</p>
            </div>
            <CreateOrEditSongModal
                show={showEditModal}
                onHide={() => setShowEditModal(false)}
                song={song}
                reloadTrigger={() => setReloadTrigger(prev => !prev)}/>
        </div>
    )
}

export default SongCard