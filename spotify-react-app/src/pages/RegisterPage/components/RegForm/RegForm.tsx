import "./styles/RegForm.css";
import React from "react";
import InputRegisterWidget from "../InputRegisterWidget/InputRegisterWidget";

const RegForm = () => {
    return (
        <div className="auth-form-container">
            <p className="form-header-text-styles">Sign up with your email address</p>
            <div className="separator-line"/>
            <form>
                <InputRegisterWidget/>
                <div className="signup-section">
                    <p>By clicking on Sign up, you agree to <a>Spotify's terms & conditions</a> and <a>privacy
                        policy</a></p>
                    <button className="purple-button-style">Sign Up</button>
                </div>
            </form>
        </div>
    )
}

export default RegForm;
