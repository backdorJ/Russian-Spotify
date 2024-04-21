import './SideBar.css'
import navigationElementsProps from "../../utils/sidebar/navigationElementsProps";
// @ts-ignore
import create_playlist from '../../assets/sidebar/create_playlist.png'
// @ts-ignore
import liked_songs from '../../assets/sidebar/liked_songs.png'
import {useNavigate} from "react-router-dom";
import routeNames from "../../utils/routeNames";

const SideBar = (props: any) => {
    const {setCreatePlaylistModal} = props
    const navigate = useNavigate();

    return (
        <div className="sidebar-wrapper">
            <div className="sidebar">
                <div className="sidebar__nav">
                    <div className="sidebar__nav__main">
                        {
                            navigationElementsProps.map(i => (
                                <NavigationElement image={i.icon} title={i.title}
                                                   onClick={() => navigate(i.navigateTo)}/>
                            ))
                        }
                    </div>
                    <div className="sidebar__nav__playlists">
                        <PlaylistElement image={create_playlist} title={'create playlist'}
                                         onClick={() => setCreatePlaylistModal(true)}/>
                        <PlaylistElement image={liked_songs} title={'liked songs'}
                                         onClick={() => navigate(routeNames.FAVORITE_SONGS)}/>
                    </div>
                </div>
                <div className="sidebar__playlists">
                </div>
            </div>
        </div>
    )
}

export default SideBar

const NavigationElement = (props: any) => {
    const {image, title, onClick} = props

    return (
        <div
            onClick={onClick}
            className="sidebar__nav__main__element">
            <img src={image} alt={title}/>
            <p>{title}</p>
        </div>
    )
}

const PlaylistElement = (props: any) => {
    const {image, title, onClick} = props

    return (
        <div
            onClick={onClick}
            className="sidebar__nav__playlists__element">
            <img src={image} alt={title}/>
            <p>{title}</p>
        </div>
    )
}