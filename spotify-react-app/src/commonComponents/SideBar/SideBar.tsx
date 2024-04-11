import './SideBar.css'
import navigationElementsProps from "../../utils/sidebar/navigationElementsProps";
import playlistElementsProps from "../../utils/sidebar/playlistElementsProps";
import {useNavigate} from "react-router-dom";

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
                                <NavigationElement image={i.icon} title={i.title} onClick={() => navigate(i.navigateTo)}/>
                            ))
                        }
                    </div>
                    <div className="sidebar__nav__playlists">
                        <PlaylistElement image={playlistElementsProps[0].icon} title={playlistElementsProps[0].title}
                                         onClick={() => setCreatePlaylistModal(true)}/>
                        <PlaylistElement image={playlistElementsProps[1].icon} title={playlistElementsProps[1].title}
                                         onClick={() => navigate(playlistElementsProps[1].navigateTo)}/>
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