import React from "react";
import {useNavigate} from "react-router-dom";
import "./styles/LoginPage.css"
import AuthForm from "./components/AuthForm/AuthForm";
import Header from "../../commonComponents/Header/Header";
import routeNames from "../../utils/routeNames";


const LoginPage = (props: any) => {
    const navigate = useNavigate();

    const navigateToSignup = () => {
        navigate(routeNames.REGISTRATION_PAGE);
    }

    return (
        <div className="form-page login-page">
            <Header/>
            <div className="form-container">
                <AuthForm/>
                <div className="signup-section">
                    <p className="signup-prompt-text-style">Don't have an account?</p>
                    <button className="signup-for-button-style" onClick={navigateToSignup}>Sign up for Spotify</button>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;