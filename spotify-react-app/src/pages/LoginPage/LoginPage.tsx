import "./styles/LoginPage.css"
import AuthForm from "./components/AuthForm/AuthForm";
import React from "react";
import Header from "./components/Header/Header";
import {useNavigate} from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();

    const navigateToSignup = () => {
        navigate('/register')
    }

    return (
        <div className="auth-form-container1">
            <Header/>
            <div className="login-form-container">
                <AuthForm/>
                <div className="signup-section">
                    <p className="signup-prompt-text-style">Don't have an account?</p>
                    <button className="sign-up-button-style" onClick={navigateToSignup}>Sign up for Spotify</button>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;