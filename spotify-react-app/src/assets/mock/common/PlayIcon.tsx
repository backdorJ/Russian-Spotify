import {FC, useContext} from "react";
import {PlayerContext, UserContext} from "../../../index";
import {getSong} from "../../../http/songApi";
import {ISong} from "../../../commonComponents/Song/interfaces/ISong";

/** Иконка запуска песни */
const PlayIcon: FC<ISong> = ({song}) => {
    const playerStore = useContext(PlayerContext);
    const userStore = useContext(UserContext);

    /** Обновление плеера(текущей песни) */
    const handlePlay = () => {
        getSong(song, song.nextSong, userStore.user)
            .then(x => playerStore.Player = x);
    }

    return (
        <svg onClick={handlePlay} cursor="pointer" width="24px" viewBox="0 0 24 24" fill="white"
             className="like-icon">
            <path
                d="M20.4086 9.35258C22.5305 10.5065 22.5305 13.4935 20.4086 14.6474L7.59662 21.6145C5.53435 22.736 3 21.2763 3 18.9671L3 5.0329C3 2.72368 5.53435 1.26402 7.59661 2.38548L20.4086 9.35258Z"
                stroke="white" stroke-width="2"/>
        </svg>
    )
}

export default PlayIcon