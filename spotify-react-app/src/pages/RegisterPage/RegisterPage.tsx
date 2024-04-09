import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import "./styles/RegisterPage.css"
import Header from "../../commonComponents/Header/Header";
import RegForm from "./components/RegForm/RegForm";
import {EmailConfirmationModal} from "./components/EmailModal/EmailConfirmationModal";

const RegisterPage = (props: any) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const navigateToLogin = () => {
        navigate('/login')
    }

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
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
            {isModalOpen && <EmailConfirmationModal isOpen={isModalOpen} onClose={closeModal}/>}
        </div>
        
    );
}

export default RegisterPage;