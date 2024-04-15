import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import Author from "../../models/Author";
import {getAuthor} from "../../http/authorApi";
import FavouritePlaylist from "../AccountPage/components/FavouritePlaylist";
import FavoriteMusic from "../AccountPage/components/FavoriteMusic";
import discoveryCards from "../../utils/mocks/homepage/discoveryCards";
import playlistsNormal from "../../utils/mocks/homepage/playlistsNormal";
import '../AuthorPage/styles/AuthorPage.css'

const AuthorPage = () => {
    const params = useParams();
    const authorName = params.authorName;

    const [discoveryCardsLoaded, setDiscoveryCardsLoaded] = useState(discoveryCards)
    const [playlistsNormalLoaded, setPlaylistsNormalLoaded] = useState(playlistsNormal)


    const [authorData, setAuthorData] = useState(new Author());

    const [currentStartPlaylistIndex, setCurrentStartPlaylistIndex] = useState(0);

    const [currentStartDiscoveryIndex, setCurrentStartDiscoveryIndex] = useState(0);

    const visibleDiscoveryCards = discoveryCardsLoaded.slice(currentStartDiscoveryIndex, currentStartDiscoveryIndex + 3);


    const canScroll = (index: number, step: number, loadedList: any[]) => {
        const newIndex = index + step;
        return loadedList.length > 0 && newIndex < loadedList.length && newIndex >= 0;
    };

    const scroll = (setter: any, index: number, step: number, loadedList: any[]) => {
        if (canScroll(index, step, loadedList)) {
            setter(index + step);
        }
    };

    useEffect(() => {
        if(authorName !== undefined)
            getAuthor(authorName)
                .then(x => setAuthorData(x));
    }, []);

    return (
        <div className="account-page">
            <div className="account-page-content">
                <div className="account-page-wrapper">
                    <div className="user-info">
                        <div className="nickname-subscription">
                            <div className="nickname-container">
                                <p className="nickname">{authorData.name}</p>
                            </div>
                        </div>
                        <div className="user-image-container">
                            <img className="user-image"
                                 src={authorData.imageLink}
                                 alt="Фото артиста"/>
                        </div>
                    </div>
                    <div className="favorite-container">
                    </div>
                        {authorData.authorMusic.length > 0 && <><h3>Треки автора</h3><FavoriteMusic favoriteSongs={authorData.authorMusic}/></>}
                    </div>
                        {authorData.authorPlaylists.length > 0 &&
                            <><h3>Альбомы автора</h3><FavouritePlaylist favouritePlaylists={authorData.authorPlaylists}/></>
                        }
                </div>
            </div>
    );
};

export default AuthorPage;