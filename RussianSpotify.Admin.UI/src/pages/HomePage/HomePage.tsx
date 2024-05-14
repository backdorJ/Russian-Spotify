import './styles/HomePage.css';
import {observer} from "mobx-react-lite";
import Header from "../../commonComponents/Header/Header";
import {useNavigate} from "react-router-dom";
import {buttonsData} from "./data/buttons";


const HomePage = observer(() => {
    const navigate = useNavigate();

    return (
        <div className="home-page">
            <Header/>
            <div className="home-page__content">
                <div className="home-page__wrapper">
                    <div className="home-page__buttons_div">
                        {buttonsData.map((button, index) => (
                            <div key={index} className="home-page__buttons_btn"
                                 onClick={() => navigate(button.route, {state: {button: button}})}>
                                <div className="button-content" style={{backgroundColor: button.color}}>
                                    <p>{button.name}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
});

export default HomePage;