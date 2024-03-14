// @ts-ignore
import arrow from "../../assets/arrow.png"
// @ts-ignore
import settings_icon from "../../assets/setting.png"
import "./NavBar.css"
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import wideOpenElements from "../../utils/navbar/wideOpenElements";
import routeNames from "../../utils/routeNames";

export default function NavBar(props: any) {
    const [isOpen, setIsOpen] = useState(false)
    const [wideHeight, setWideHeight] = useState(10)
    const navigate = useNavigate()
    let imagePlaceholder = "https://www.kurin.com/wp-content/uploads/placeholder-square.jpg"
    let username = "hayley marjoram"

    return (
        <div className="navbar">
            <div className="navbar__account">
                <div
                    className="navbar__account__main">
                    <div
                        onClick={() => navigate(routeNames.ACCOUNT_PAGE)}
                        className="navbar__account__main__image__div">
                        <img src={imagePlaceholder} alt="" className="navbar__account__main__image"/>
                    </div>
                    <p
                        onClick={() => navigate(routeNames.ACCOUNT_PAGE)}
                        className="navbar__account__main__name">
                        {username}
                    </p>
                    <div className="navbar__account__main__arrow__div">
                        <img onClick={() => setIsOpen(prev => !prev)} src={arrow} alt="show"
                             className="navbar__account__main__arrow"/>
                    </div>
                </div>
                {
                    isOpen &&
                    <div className="navbar__account__wide">
                        {wideOpenElements.map(element => (
                            <WideOpenElement
                                icon={element.icon}
                                title={element.title}
                                navigateTo={element.navigateTo}/>
                        ))}
                    </div>
                }
            </div>
        </div>
    )
}

function WideOpenElement(props: any) {
    const {icon, title, navigateTo} = props
    const navigate = useNavigate()

    return (
        <div
            onClick={() => navigate(navigateTo)}
            className="navbar__account__wide__element">
            <div className="navbar__account__wide__element__image__div">
                <img src={icon} alt={title}
                     className="navbar__account__wide__element__image"/>
            </div>
            <p className="navbar__account__wide__element__text">
                {title}
            </p>
        </div>
    )
}