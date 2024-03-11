import EmailInputWidget from "../EmailInputWidget/EmailInputWidget";
import PasswordInputWidget from "../PasswordInputWidget/PasswordInputWidget";
import SvgIcon1 from "./icons/SvgIcon1";
import SvgIcon2 from "./icons/SvgIcon2";
import SvgIcon3 from "./icons/SvgIcon3";
import "./style.css";
import React from "react";


const AuthForm = () => {
    return (
        <div className="auth-form-container">
            <button className="rounded-blue-button">
                <SvgIcon1 className="svg-container"/>
                Continue with Facebook
            </button>
            <button className="rounded-dark-button">
                <SvgIcon2 className="svg-container"/>
                Continue with Apple
            </button>
            <button className="rounded-white-button">
                <SvgIcon3 className="svg-container"/>
                Continue with Google
            </button>
            <div className="separator-line"/>
            <div className="border-separator-horizontal"/>
            <p className="header-text-styles">or</p>
            <EmailInputWidget/>
            <PasswordInputWidget/>
            <div className="login-section-controls">
                <div className="password-reset-section">
                    <a className="password-reset-link-text-style" href="">Forgot your password?</a>
                    {/* Checkbox with Label Component is detected here. We've generated code using HTML. See other options in "Component library" dropdown in Settings */}
                    <div className="login-section1">
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
                <div className="login-section">
                    {/* Button Component is detected here. We've generated code using HTML. See other options in "Component library" dropdown in Settings */}
                    <button className="login-button-style">Log In</button>
                </div>
            </div>
            <div className="border-separator"/>
        </div>
    );
}

export default AuthForm;
