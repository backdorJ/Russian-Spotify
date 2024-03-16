import "./Header.css";
import {SpotifySvg} from "./SpotifySvg";

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
