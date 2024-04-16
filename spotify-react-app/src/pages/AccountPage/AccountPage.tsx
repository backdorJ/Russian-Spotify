import "../AccountPage/styles/AccountPage.css"
// @ts-ignore
import settings_icon from "../../assets/setting.png"
import {useNavigate} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import DiscoveryCard from "../HomePage/components/DiscoveryCard";
import discoveryCards from "../../utils/mocks/homepage/discoveryCards";
import PlaylistNormal from "../HomePage/components/PlaylistNormal";
import playlistsNormal from "../../utils/mocks/homepage/playlistsNormal";
import {UserContext} from "../../index";
import Song from "../../models/Song";
import {getFavouriteSongs} from "../../http/songApi";
import FavoriteMusic from "./components/FavoriteMusic";
import Playlist from "../../models/Playlist";
import {getFavouritePlaylists} from "../../http/playlistApi";
import FavouritePlaylist from "./components/FavouritePlaylist";
        
const AccountPage = () => {
    const userStore = useContext(UserContext)
    const endsubdate = userStore.user._subEndDate.getDate()
    const endsubmonth = userStore.user._subEndDate.getMonth()
    const endsubyear = userStore.user._subEndDate.getFullYear()
    const formattedDate = `${endsubdate.toString().padStart(2, '0')}:${endsubmonth.toString().padStart(2, '0')}:${endsubyear.toString().padStart(4, '0')}`;
    // Список любимых песен
    const [favoriteSongs, setFavoriteSongs] = useState(new Array<Song>());
    const [favouritePlaylists, setFavouritePlaylists] = useState(new Array<Playlist>())
    let imagePlaceholder = "https://www.kurin.com/wp-content/uploads/placeholder-square.jpg"

    // Получение списка любимых песен
    useEffect(() => {
        getFavouriteSongs(1, 5)
            .then(r => setFavoriteSongs(r))

        getFavouritePlaylists(1, 5)
            .then(p => setFavouritePlaylists(p))
    }, []);
    
    return (
        <div className="account-page">
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
                                        <p>Дата окончания подписки: {formattedDate}</p>
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
                                 src={userStore.user.photoUrl ? userStore.user.photoUrl : imagePlaceholder }
                                 alt="Твое фото"/>
                        </div>
                    </div>
                    <div className="favorite-container">
                        {favoriteSongs.length > 0 &&  <><h3>Любимые треки</h3>
                            <FavoriteMusic favoriteSongs={favoriteSongs}/></>}
                        {favouritePlaylists.length > 0 && <><h3>Любимые альбомы & плейлисты</h3>
                        <FavouritePlaylist favouritePlaylists={favouritePlaylists}/></>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountPage