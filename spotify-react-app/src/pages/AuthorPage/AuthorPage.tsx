import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import Author from "../../models/AuthorPage";
import {getAuthor} from "../../http/authorApi";
import FavouritePlaylist from "../../commonComponents/FavouritePlaylist/FavouritePlaylist";
import FavouriteMusic from "../../commonComponents/FavouriteMusic/FavouriteMusic";
import '../AuthorPage/styles/AuthorPage.css'
import handleImageNotLoaded from "../../functions/handleImageNotLoaded";

const AuthorPage = () => {
    const params = useParams();
    const authorName = params.authorName;

    const [authorData, setAuthorData] = useState(new Author());

    useEffect(() => {
        if (authorName)
            getAuthor(authorName, 1, 5, 1, 3)
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
                                 alt="Фото артиста"
                                 onError={handleImageNotLoaded}/>
                        </div>
                    </div>
                    <div className="favorite-container">
                    </div>
                    {authorData.authorMusic.length > 0 && <><h3>Треки автора</h3><FavouriteMusic
                        favouriteSongs={authorData.authorMusic}/></>}
                </div>
                {authorData.authorPlaylists.length > 0 &&
                    <><h3>Альбомы автора</h3><FavouritePlaylist favouritePlaylists={authorData.authorPlaylists}/></>
                }
            </div>
        </div>
    );
};

export default AuthorPage;