import {useNavigate} from "react-router-dom";
import './styles/HomeButton.css'
import routeNames from "../../utils/routeNames";
// @ts-ignore
import homeIcon from '../../assets/home_icon.png'

const HomeButton = () => {
    const navigate = useNavigate();
    return (
        <button className="home-button" onClick={() => navigate(routeNames.HOME_PAGE)}>
            <img src={homeIcon} alt="Home"/>
        </button>
    );
};

export default HomeButton;