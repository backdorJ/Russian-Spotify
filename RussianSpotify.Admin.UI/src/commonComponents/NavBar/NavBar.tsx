import "./styles/NavBar.css"
import React, {useContext} from "react";
import {useNavigate} from "react-router-dom";
import routeNames from "../../utils/routeNames";
import {UserContext} from "../../index";
import {observer} from "mobx-react-lite";
import HomeButton from "../HomeButton/HomeButton";


const NavBar = observer(() => {
    const userStore = useContext(UserContext)
    const navigate = useNavigate()

    const handleLogoutClick = () => {
        userStore.logout()
        localStorage.removeItem('token')
        localStorage.removeItem('refresh');
        navigate(routeNames.LOGIN_PAGE)
    }

    return (
        userStore.isAuth &&
        <div className="navbar">
            <HomeButton/>
            <div className="navbar__account">
                <div className="navbar__account__main">
                    <div onClick={handleLogoutClick}
                         className="navbar__account__wide__element">
                        <p className="navbar__account__wide__element__text">
                            Выйти
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
})

export default NavBar