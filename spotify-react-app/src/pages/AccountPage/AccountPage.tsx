import "../AccountPage/styles/AccountPage.css"
// @ts-ignore
import settings_icon from "../../assets/setting.png"
import {useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import DiscoveryCard from "../HomePage/components/DiscoveryCard";
import discoveryCards from "../../utils/mocks/homepage/discoveryCards";
import PlaylistLittle from "../HomePage/components/PlaylistLittle";
import PlaylistNormal from "../HomePage/components/PlaylistNormal";
import playlistsLittle from "../../utils/mocks/homepage/playlistsLittle";
import playlistsNormal from "../../utils/mocks/homepage/playlistsNormal";
import {SpotifyContext} from "../../index";
import LikeIcon from "../../assets/mock/common/LikeIcon";
import PlayIcon from "../../assets/mock/common/PlayIcon";
import User from "../../models/User";

const AccountPage = () => {
    const userStore = useContext(SpotifyContext)
    const navigate = useNavigate()
    const [discoveryCardsLoaded, setDiscoveryCardsLoaded] = useState(discoveryCards)
    const [playlistsNormalLoaded, setPlaylistsNormalLoaded] = useState(playlistsNormal)
    const image = "https://sun9-21.userapi.com/impg/PhIuCK3TG1PTeAdwj0oMDxoADArLLJztpyzFEg/bAieR_Fic2I.jpg?size=153x153&quality=96&sign=eddeef8abc5207ce6ee23de1131750a6&type=album"
    const endsubdate = userStore.user._subEndDate.getDate()
    const endsubmonth = userStore.user._subEndDate.getMonth()
    const endsubyear = userStore.user._subEndDate.getFullYear()
    const lipoviiArrayOfMusic = [{
        id: 1,
        name: 'Hello',
        imageId: 1,
        duration: 206,
        category: 'pop',
        authors: ['Adele']
    }, {
        id: 2,
        name: 'Саламалейкум мои братьям',
        imageId: 2,
        duration: 150,
        category: 'kavkaz',
        authors: ['Islam Itlyashev', 'Oleg Gazmanov']
    }, {
        id: 3,
        name: 'Гимн .NET',
        imageId: 3,
        duration: 300,
        category: 'russian',
        authors: ['Irek Karimov']
    }]

    const [currentStartPlaylistIndex, setCurrentStartPlaylistIndex] = useState(0);

    const visiblePlaylistsNormal = playlistsNormalLoaded.slice(currentStartPlaylistIndex, currentStartPlaylistIndex + 3);

    const [currentStartDiscoveryIndex, setCurrentStartDiscoveryIndex] = useState(0);

    const visibleDiscoveryCards = discoveryCardsLoaded.slice(currentStartDiscoveryIndex, currentStartDiscoveryIndex + 3);

    const canScroll = (index: number, step: number, loadedList: any[]) => {
        const newIndex = index + step;
        return loadedList.length > 0 && newIndex < loadedList.length && newIndex >= 0;
    };

    const [isAnimating, setIsAnimating] = useState(false);

    const scroll = (setter: any, index: number, step: number, loadedList: any[]) => {
        if (canScroll(index, step, loadedList)) {
            setter(index + step);
        }
    };
    
    const nextDiscovery = () => scroll(setCurrentStartDiscoveryIndex, currentStartDiscoveryIndex, 3, discoveryCardsLoaded);
    const prevDiscovery = () => scroll(setCurrentStartDiscoveryIndex, currentStartDiscoveryIndex, -3, discoveryCardsLoaded);

    const nextPlaylist = () => scroll(setCurrentStartPlaylistIndex, currentStartPlaylistIndex, 3, playlistsNormalLoaded);
    const prevPlaylist = () => scroll(setCurrentStartPlaylistIndex, currentStartPlaylistIndex, -3, playlistsNormalLoaded);

    const [menuOpen, setMenuOpen] = useState(false);
    let timeoutId: NodeJS.Timeout;

    const handleMouseEnter = () => {
        clearTimeout(timeoutId);
        setMenuOpen(true);
    };

    const handleMouseLeave = () => {
        timeoutId = setTimeout(() => {
            setMenuOpen(false);
        }, 100);
    };
    
    return (
        <div className="account-page">
            <header className="account-page-header">
                <img className="settings_icon" src={settings_icon} alt="Назад" onClick={() => navigate("/settings")}/>
            </header>
            <div className="account-page-content">
                <div className="account-page-wrapper">
                    <div className="user-info">
                        <div className="nickname-subscription">
                            <div className="nickname-container">
                                <p className="nickname">{userStore.user.username}</p>
                            </div>
                            <div className="subscription-info">
                                {userStore.user.isSubscribed ? (
                                    <div className="subscribed">
                                        <p>{`${endsubdate}.${endsubmonth}.${endsubyear}`}</p>
                                    </div>
                                ) : (
                                    <div className="not-subscribed">
                                        <p>Подписка отсутствует</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="user-image-container">
                            <img className="user-image"
                                 src={image}
                                 alt="Твое фото"/>
                        </div>
                    </div>
                    <div className="favorite-container">
                        <h3>Любимые треки</h3>
                        <div className="music-container">
                            <div className="music-container-wrapper">
                                {lipoviiArrayOfMusic.map((music) => (
                                    <div key={music.id} className="music-card-button">
                                        <div className="play-icon-container">
                                            <PlayIcon/>
                                        </div>
                                        <div className="music-image-container">
                                            <img className="music-image" alt="music-image"
                                                 src="https://distribution.faceit-cdn.net/images/a2d6720c-44c7-456a-966a-cc50fd3e65c8.jpeg"/>
                                        </div>
                                        <div className="music-name-authors">
                                            <span>{music.name}</span>
                                            <span>{music.authors.map((author, index) => <a
                                                href={'artist/' + author} className="artist-link">{author}{index < music.authors.length - 1 ? ', ' : ''}</a>)}</span>
                                        </div>
                                        <div className="music-duration">
                                            <span>{Math.floor(music.duration / 60)}:{(music.duration % 60).toString().padStart(2, '0')}</span>
                                        </div>
                                        <div className="like-icon-container">
                                            <LikeIcon/>
                                        </div>
                                        <button className="music-more-button" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>⋮</button>
                                        {menuOpen && (
                                            <div className="music-menu" onMouseEnter={handleMouseEnter}
                                                 onMouseLeave={handleMouseLeave}>
                                                <button>Воспроизвести следующей</button>
                                                <button>Удалить из плейлиста</button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <button className="show-all-music-button">Показать все</button>
                        </div>
                        <h3>Любимые альбомы & плейлисты</h3>
                        <div className="cards-container">
                            <button className="arrow-button arrow-button-left"
                                    onClick={() => scroll(setCurrentStartPlaylistIndex, currentStartPlaylistIndex, -3, playlistsNormalLoaded)}
                                    disabled={!canScroll(currentStartPlaylistIndex, -3, playlistsNormalLoaded)}>&lt;</button>
                            <div className="home-page__latest-albums__cards ">
                                {
                                    visiblePlaylistsNormal.map(i => (
                                        <div className="card">
                                            <PlaylistNormal
                                                imageUrl={i.imageUrl}
                                                title={i.title}
                                                description={i.description}
                                                playlistId={i.playlistId}
                                                key={i.playlistId}/>
                                        </div>
                                    ))
                                }
                            </div>
                            <button className="arrow-button arrow-button-right"
                                    onClick={() => scroll(setCurrentStartPlaylistIndex, currentStartPlaylistIndex, 3, playlistsNormalLoaded)}
                                    disabled={!canScroll(currentStartPlaylistIndex, 3, playlistsNormalLoaded)}>&gt;</button>
                        </div>
                        <h3>Любимые исполнители</h3>
                        <div className="cards-container">
                            <button className="arrow-button arrow-button-left"
                                    onClick={() => scroll(setCurrentStartDiscoveryIndex, currentStartDiscoveryIndex, -3, discoveryCardsLoaded)}
                                    disabled={!canScroll(currentStartDiscoveryIndex, -3, discoveryCardsLoaded)}>&lt;</button>
                            <div className="home-page__discovery__cards">
                                {
                                    visibleDiscoveryCards.map(i => (
                                        <div className="card">
                                            <DiscoveryCard
                                                imageUrl={i.imageUrl}
                                                name={i.name}
                                                artistId={i.artistId}
                                                key={i.artistId}/>
                                        </div>
                                    ))
                                }
                            </div>
                            <button className="arrow-button arrow-button-right"
                                    onClick={() => scroll(setCurrentStartDiscoveryIndex, currentStartDiscoveryIndex, 3, discoveryCardsLoaded)}
                                    disabled={!canScroll(currentStartDiscoveryIndex, 3, discoveryCardsLoaded)}>&gt;</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountPage