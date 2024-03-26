import "../AccountPage/styles/AccountPage.css"
// @ts-ignore
import settings_icon from "../../assets/setting.png"
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import DiscoveryCard from "../HomePage/components/DiscoveryCard";
import discoveryCards from "../../utils/mocks/homepage/discoveryCards";
import PlaylistLittle from "../HomePage/components/PlaylistLittle";
import PlaylistNormal from "../HomePage/components/PlaylistNormal";
import playlistsLittle from "../../utils/mocks/homepage/playlistsLittle";
import playlistsNormal from "../../utils/mocks/homepage/playlistsNormal";

const AccountPage = () => {

    const navigate = useNavigate()
    const [discoveryCardsLoaded, setDiscoveryCardsLoaded] = useState(discoveryCards)
    const [playlistsNormalLoaded, setPlaylistsNormalLoaded] = useState(playlistsNormal)
    const nickname = "Irek"
    const image = "https://sun9-21.userapi.com/impg/PhIuCK3TG1PTeAdwj0oMDxoADArLLJztpyzFEg/bAieR_Fic2I.jpg?size=153x153&quality=96&sign=eddeef8abc5207ce6ee23de1131750a6&type=album"
    const subscription = "Осталось 5 дней, пополняй"
    const subscription1 = ""

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
                                <p className="nickname">{nickname}</p>
                            </div>
                            <div className="subscription-info">
                                {subscription1 ? (
                                    <div className="subscription">
                                        <p>{subscription1}</p>
                                    </div>
                                ) : (
                                    <div className="no-subscription">
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