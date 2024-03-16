import "./styles/AuthForm.css";
import React from "react";
import InputLoginWidget from "../InputLoginWidget/InputLoginWidget";
import {VkButtonSvg} from "../../../../assets/mock/loginpage/buttons-SVGs/VkButtonSvg";
import {YandexButtonSvg} from "../../../../assets/mock/loginpage/buttons-SVGs/YandexButtonSvg";
import {GoogleButtonSvg} from "../../../../assets/mock/loginpage/buttons-SVGs/GoogleButtonSvg";

const AuthForm = () => {
    return (
        <div className="auth-form-container">
            <button className="rounded-button rounded-blue-button">
                <div className="svg-container">
                    <VkButtonSvg/>
                </div>
                Continue with VK
            </button>
            <button className="rounded-button rounded-red-button">
                <div className="svg-container">
                    <YandexButtonSvg/>
                </div>
                Continue with Yandex
            </button>
            <button className="rounded-button rounded-white-button">
                <div className="svg-container">
                    <GoogleButtonSvg/>
                </div>
                Continue with Google
            </button>
            <div className="separator-line"/>
            <div className="border-separator-horizontal"/>
            <p className="header-text-styles">or</p>
            <form>
                <InputLoginWidget/>
                <div className="login-section-controls">
                    <div className="password-reset-section">
                        <a className="password-reset-link-text-style" href="/">Forgot your password?</a>
                        <div className="login-section">
                            <div className="checkbox-container">
                                <label className="switch">
                                    <input type="checkbox"/>
                                    <span className="slider round"/>
                                </label>
                            </div>
                            <label htmlFor="remember me" className="remember-me-label">
                                Remember me
                            </label>
                        </div>
                    </div>
                    <div className="login-section1">
                        <button className="purple-button-style">Log In</button>
                    </div>
                </div>
                <div className="border-separator"/>
            </form>
        </div>
    )
}

export default AuthForm;
