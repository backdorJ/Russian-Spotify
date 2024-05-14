import React, {useEffect, useState} from "react";
// @ts-ignore
import search_icon from '../../assets/searchPage/search_icon_121212.png'
import searchTypesProps from "../../utils/search/searchTypesProps";
import './styles/SearchPage.css'
import SongModel from "../../models/Song";
import SearchPlaylistCard from "./components/SearchPlaylistCard";
import SearchAuthorCard from "./components/SearchAuthorCard";
import {getPlaylistsByFilter} from "../../http/playlistApi";
import {getAuthorsByFilter} from "../../http/authorApi";
import {songFilters} from "../../http/filters/songFilters";
// @ts-ignore
import {playlistFilters} from "../../http/filters/playlistFilters";
// @ts-ignore
import {authorFilters} from "../../http/filters/authorFilters";
import SongCard from "../../commonComponents/SongCard/SongCard";
import loadDynamicSongs from "../../functions/loadDynamicSongs";


const SearchPage = () => {
    const defaultSongLoadPageSize = 2
    const defaultPlaylistLoadPageSize = 5
    const [songCount, setSongCount] = useState(0)
    const [playlistCount, setPlaylistCount] = useState(0)
    const [pageLoading, setPageLoading] = useState(1)
    const [isFetching, setIsFetching] = useState(false)
    const [search, setSearch] = useState('')
    const [isSearched, setIsSearched] = useState(false)
    const [searchType, setSearchType] = useState(1)
    const [searchTypeDynamic, setSearchTypeDynamic] = useState(1)
    const [songs, setSongs] = useState(new Array<SongModel>())
    const [playlists, setPlaylists] = useState(new Array<any>())
    const [authors, setAuthors] = useState(new Array<any>())
    const [reloadTrigger, setReloadTrigger] = useState(false)

    const handleSearch = () => {
        if (search === '') {
            alert("Search is empty")
            return
        }

        setSearchTypeDynamic(searchType)
        setPageLoading(1)
        setIsFetching(true)
    }

    useEffect(() => {
        if (pageLoading === 1) {
            setSongs([])
            setAuthors([])
            setPlaylists([])
            setSongCount(0)
            setPlaylistCount(0)
        }

        if (isFetching) {
            if (searchTypeDynamic === 1) {
                setAuthors([])
                setPlaylists([])
                loadDynamicSongs(songFilters.songNameFilter, search, pageLoading, defaultSongLoadPageSize)
                    .then(response => {
                        setSongCount(response.count)
                        setSongs(prev => [...prev, ...response.songs])
                    })
                    .finally(() => {
                        setIsSearched(true)
                        setIsFetching(false)
                        setPageLoading(prev => prev + 1)
                    })
            }
            if (searchTypeDynamic === 2) {
                setSongs([])
                setAuthors([])
                getPlaylistsByFilter(playlistFilters.playlistNameFilter, search, pageLoading, defaultPlaylistLoadPageSize)
                    .then(response => {
                        if (response.status === 200) {
                            setPlaylistCount(response.value.count)
                            setPlaylists(prev => [...prev, ...response.value.playlists])
                            setPageLoading(prev => prev++)
                        }
                    })
                    .finally(() => {
                        setIsSearched(true)
                        setIsFetching(false)
                        setPageLoading(prev => prev + 1)
                    })
                setIsSearched(true)
            }
            if (searchTypeDynamic === 3) {
                setSongs([])
                setPlaylists([])
                getAuthorsByFilter(authorFilters.authorNameFilter, search, 2, pageLoading, 10)
                    .then(response => setAuthors(prev => [...response]))
                    .finally(() => {
                        setIsSearched(true)
                        setIsFetching(false)
                        setPageLoading(prev => prev + 1)
                    })
                setIsSearched(true)
            }
        }
    }, [isFetching]);

    useEffect(() => {
        // if (!isFetching)
        // document.addEventListener('scroll', scrollHandler)
    }, [isFetching]);

    const scrollHandler = (e: any) => {
        console.log(1)
        if ((e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 200)
            && ((searchTypeDynamic === 2 && playlists.length < playlistCount)
                || (searchTypeDynamic === 1 && songs.length < songCount))) {
            console.log('reached')
            document.removeEventListener('scroll', scrollHandler)
            setIsFetching(true)
        }
    }

    useEffect(() => {
        return function () {
            document.removeEventListener('scroll', scrollHandler)
        }
    }, []);

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
                    songs.map((song, index) =>
                        <SongCard
                            song={song}
                            order_number={index + 1}
                            onModalOpen={undefined}
                            playlistReloadTrigger={() => setReloadTrigger(prev => !prev)}
                            playlist={null}/>
                    )
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