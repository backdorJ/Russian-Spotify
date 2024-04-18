import React, { useState} from "react";
// @ts-ignore
import search_icon from '../../assets/searchPage/search_icon_121212.png'
import searchTypesProps from "../../utils/search/searchTypesProps";
import './styles/SearchPage.css'
import Song from "../../commonComponents/Song/Song";
import { getSongsByFilter} from "../../http/songApi";
import SongModel from "../../models/Song";
import SearchPlaylistCard from "./components/SearchPlaylistCard";
import SearchAuthorCard from "./components/SearchAuthorCard";
import { getPlaylistsByFilter} from "../../http/playlistApi";
import {getAuthorsByFilter} from "../../http/authorApi";
import {songFilters} from "../../http/filters/songFilters";
// @ts-ignore
import {playlistFilters} from "../../http/filters/playlistFilters";
// @ts-ignore
import {authorFilters} from "../../http/filters/authorFilters";


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
            getSongsByFilter(songFilters.songNameFilter, search, 1, 10)
                .then(response => setSongs(prev => [...response]))
                .then(() => setIsSearched(true))
        }
        if (searchType === 2) {
            setSongs([])
            setAuthors([])
            getPlaylistsByFilter(playlistFilters.playlistNameFilter, search, 1, 10)
                .then(response => setPlaylists(prev => [...response]))
            setIsSearched(true)
        }
        if (searchType === 3) {
            setSongs([])
            setPlaylists([])
            getAuthorsByFilter(authorFilters.authorNameFilter, search, 2, 1,10)
                .then(response => setAuthors(prev => [...response]))
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
                                isSelected={i.value === searchType}
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