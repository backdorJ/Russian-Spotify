import "./styles/Header.css";
import {SpotifySvg} from "./components/SpotifySvg";

const Header = () => {
    return (
        <div className="vertical-centered-container">
            <div className="vertical-centered-box">
                <SpotifySvg/>
            </div>
        </div>
    );
}

export default Header;
