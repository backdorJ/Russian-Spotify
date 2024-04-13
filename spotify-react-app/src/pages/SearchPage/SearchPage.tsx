import {useState} from "react";
import {useNavigate} from "react-router-dom";
// @ts-ignore
import search_icon from '../../assets/searchPage/search_icon_121212.png'
import searchTypesProps from "../../utils/search/searchTypesProps";
import './styles/SearchPage.css'


const SearchPage = () => {
    const [search, setSearch] = useState('')
    const [searchType, setSearchType] = useState(1)

    return (
        <div className="search">
            <div className="search__header">
                <div className="search__header__field">
                    <div className="search__header__field__left">
                        <img src={search_icon} alt="Search"/>
                        <input
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            type="text"
                            placeholder="Artists, songs, or playlists"
                            className="search__header__field__left__input"/>
                    </div>
                    <div className="search__header__field__right">
                        <div className="search__header__field__right__submit">
                            <p>Search</p>
                        </div>
                    </div>
                </div>
                <div className="search__header__types">
                    {
                        searchTypesProps.map(i => (
                            <SearchType title={i.title} color={i.color} onClick={() => setSearchType(i.value)}/>
                        ))
                    }
                </div>
            </div>
            <div className="search__main">

            </div>
        </div>
    )
}

export default SearchPage

const SearchType = (props: any) => {
    const {title, color, onClick, isSelected} = props

    return (
        <div
            style={{backgroundColor: "#bb3232"}}
            onClick={onClick}
            className="search__header__types__type">
            <p>{title}</p>
        </div>
    )
}