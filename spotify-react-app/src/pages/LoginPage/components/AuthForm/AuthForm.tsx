import "./styles/AuthForm.css";
import React, {useContext, useState} from "react";
import InputLoginWidget from "../InputLoginWidget/InputLoginWidget";
import {VkButtonSvg} from "../../../../assets/mock/loginpage/buttons-SVGs/VkButtonSvg";
import {YandexButtonSvg} from "../../../../assets/mock/loginpage/buttons-SVGs/YandexButtonSvg";
import {GoogleButtonSvg} from "../../../../assets/mock/loginpage/buttons-SVGs/GoogleButtonSvg";
import {login} from "../../../../http/authApi";
import UserLoginDto from "../../../../utils/dto/user/userLoginDto";
import {Link, useNavigate} from "react-router-dom";
import routeNames from "../../../../utils/routeNames";
import {UserContext} from "../../../../index";
import {observer} from "mobx-react-lite";
import loadUser from "../../../../functions/loadUser";
import {codeConfirmationOperations} from "../../../../utils/operations/codeConfirmationOperations";

const AuthForm = observer(() => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const userStore = useContext(UserContext)
    const navigate = useNavigate()

    let handleLogin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        let user = new UserLoginDto(email, password)
        login(user)
            .then(response => {
                if (response.status === 200) {
                    loadUser()
                        .then(user => {
                            if (user !== undefined)
                                userStore.login(user)
                        })
                        .then(_ => navigate(routeNames.HOME_PAGE))
                } else {
                    if (response.message === "You need to confirm your Email Address") {
                        alert(response.message)
                        navigate(routeNames.CONFIRMATION_CODE_PAGE, {
                            state: {
                                email: email,
                                operation: codeConfirmationOperations.ConfirmEmail
                            }
                        })
                        return;
                    }
                    alert("Something went wrong. Try again")
                }
            })
    }

    return (
        <div className="auth-form-container">
            <Link
                to={`${process.env.REACT_APP_SPOTIFY_API}api/OAuth/ExternalLogin?provider=Vkontakte`}
                className="rounded-button rounded-blue-button">
                <div className="svg-container">
                    <VkButtonSvg/>
                </div>
                Continue with VK
            </Link>
            <Link
                to={`${process.env.REACT_APP_SPOTIFY_API}api/OAuth/ExternalLogin?provider=Yandex`}
                className="rounded-button rounded-red-button">
                <div className="svg-container">
                    <YandexButtonSvg/>
                </div>
                Continue with Yandex
            </Link>
            <Link
                to={`${process.env.REACT_APP_SPOTIFY_API}api/OAuth/ExternalLogin?provider=Google`}
                className="rounded-button rounded-white-button">
                <div className="svg-container">
                    <GoogleButtonSvg/>
                </div>
                Continue with Google
            </Link>
            <div className="separator-line"/>
            <div className="border-separator-horizontal"/>
            <p className="header-text-styles">or</p>
            <form>
                <InputLoginWidget
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}/>
                <div className="login-section-controls">
                    <div className="password-reset-section">
                        <a className="password-reset-link-text-style"
                           onClick={() => navigate(routeNames.RESET_PASSWORD_PAGE)}>Forgot your password?</a>
                    </div>
                    <div className="login-section1">
                        <button
                            onClick={e => handleLogin(e)}
                            className="purple-button-style">Log In
                        </button>
                    </div>
                </div>
                <div className="border-separator"/>
            </form>
        </div>
    )
})

export default AuthForm;
