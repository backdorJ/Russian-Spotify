import React from "react";
import "./styles/LoginPage.css"
import AuthForm from "./components/AuthForm/AuthForm";
import Header from "../../commonComponents/Header/Header";


const LoginPage = () => {
    return (
        <div className="form-page login-page">
            <Header/>
            <div className="form-container">
                <AuthForm/>
            </div>
        </div>
    );
}

export default LoginPage;