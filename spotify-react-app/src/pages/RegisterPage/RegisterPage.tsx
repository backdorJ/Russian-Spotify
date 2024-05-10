import React from "react";
import {useNavigate} from "react-router-dom";
import "./styles/RegisterPage.css"
import Header from "../../commonComponents/Header/Header";
import RegForm from "./components/RegForm/RegForm";

const RegisterPage = () => {
    const navigate = useNavigate();

    const navigateToLogin = () => {
        navigate('/login')
    }

    return (
        <div className="form-page register-page">
            <Header/>
            <div className="form-container">
                <RegForm/>
                <div className="login-section">
                    <p>Already have an account? <a onClick={navigateToLogin}>Log in</a></p>
                </div>
            </div>
        </div>

    );
}

export default RegisterPage;