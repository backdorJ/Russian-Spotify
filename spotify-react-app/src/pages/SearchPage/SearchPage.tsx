import React, {FC, useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
// @ts-ignore
import search_icon from '../../assets/searchPage/search_icon_121212.png'
import searchTypesProps from "../../utils/search/searchTypesProps";
import './styles/SearchPage.css'
import Song from "../../commonComponents/Song/Song";
import {getSongs, getSongsByNameFilter} from "../../http/songApi";
import SongModel from "../../models/Song";
import playlistsNormal from "../../utils/mocks/homepage/playlistsNormal";
import SearchPlaylistCard from "./components/SearchPlaylistCard";
import discoveryCards from "../../utils/mocks/homepage/discoveryCards";
import SearchAuthorCard from "./components/SearchAuthorCard";


const SearchPage = () => {
    const [search, setSearch] = useState('')
    const [isSearched, setIsSearched] = useState(false)
    const [searchType, setSearchType] = useState(1)
    const [songs, setSongs] = useState(new Array<SongModel>())
    const [playlists, setPlaylists] = useState(new Array<any>())
    const [authors, setAuthors] = useState(new Array<any>())

    const handleSearch = () => {
        if (searchType === 1) {
            setAuthors([])
            setPlaylists([])
            getSongsByNameFilter(search, 1, 10)
                .then(response => setSongs(prev => [...response]))
                .then(() => setIsSearched(true))
        }
        if (searchType === 2) {
            setSongs([])
            setAuthors([])
            setPlaylists(playlistsNormal)
            setIsSearched(true)
        }
        if (searchType === 3) {
            setSongs([])
            setPlaylists([])
            setAuthors(discoveryCards)
            setIsSearched(true)
        }
    }

    const inputPlaceholder = searchTypesProps
        .filter(i => i.value === searchType)[0].title

    return (
        <div className="search">
            <div className="search__header">
                <div className="search__header__field">
                    <div className="search__header__field__left">
                        <img src={search_icon} alt="Search"/>
                        <input
                            value={search}
                            onChange={e => {
                                setSearch(e.target.value)
                                setIsSearched(false)
                            }}
                            type="text"
                            placeholder={`Search for ${inputPlaceholder}`}
                            className="search__header__field__left__input"/>
                    </div>
                    <div className="search__header__field__right">
                        <div
                            onClick={handleSearch}
                            style={{backgroundColor: isSearched ? '#595959' : '#2c2c2c'}}
                            className="search__header__field__right__submit">
                            <p>Search</p>
                        </div>
                    </div>
                </div>
                <div className="search__header__types">
                    {
                        searchTypesProps.map(i => (
                            <SearchType
                                title={i.title}
                                color={i.color}
                                highlight={i.highlight}
                                isSelected={i.value == searchType}
                                onClick={() => {
                                    setSearchType(i.value)
                                    setIsSearched(false)
                                }}/>
                        ))
                    }
                </div>
            </div>
            <div className="search__main">
                {
                    songs.map(i => (
                        <Song song={i}/>
                    ))
                }
                {
                    playlists.map(i => (
                        <SearchPlaylistCard playlist={i}/>
                    ))
                }
                {
                    authors.map(i => (
                        <SearchAuthorCard author={i}/>
                    ))
                }
            </div>
        </div>
    )
}

export default SearchPage

const SearchType = (props: any) => {
    const {title, color, highlight, onClick, isSelected} = props

    return (
        <div
            style={{backgroundColor: isSelected ? highlight : color}}
            onClick={onClick}
            className="search__header__types__type">
            <p>{title}</p>
        </div>
    )
}