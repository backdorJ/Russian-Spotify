import "../AccountPage/styles/AccountPage.css"
import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "../../index";
import Song from "../../models/Song";
import FavoriteMusic from "./components/FavoriteMusic";
import Playlist from "../../models/Playlist";
import FavouritePlaylist from "./components/FavouritePlaylist";
import {getSongsByFilter} from "../../http/songApi";
import {songFilters} from "../../http/filters/songFilters";
import {getPlaylistsByFilter} from "../../http/playlistApi";
import {playlistFilters} from "../../http/filters/playlistFilters";
import {getUserId} from "../../functions/getUserId";

const AccountPage = () => {
    const userStore = useContext(UserContext)
    const endSubscriptionDate = userStore.user._subEndDate.getDate()
    const endSubscriptionMonth = userStore.user._subEndDate.getMonth()
    const endSubscriptionYear = userStore.user._subEndDate.getFullYear()
    const formattedDate = `${endSubscriptionDate.toString().padStart(2, '0')}:${endSubscriptionMonth.toString().padStart(2, '0')}:${endSubscriptionYear.toString().padStart(4, '0')}`;
    // Список любимых песен
    const [favoriteSongs, setFavoriteSongs] = useState<Song[]>([]);
    const [favouritePlaylists, setFavouritePlaylists] = useState<Playlist[]>([]);
    let imagePlaceholder = "https://www.kurin.com/wp-content/uploads/placeholder-square.jpg"

    // Получение списка любимых песен
    useEffect(() => {
        getSongsByFilter(songFilters.favoriteSongsFilter, getUserId(),1, 5)
            .then(s => setFavoriteSongs(s))

        getPlaylistsByFilter(playlistFilters.favoritePlaylistsFilter, getUserId(), 1, 5)
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