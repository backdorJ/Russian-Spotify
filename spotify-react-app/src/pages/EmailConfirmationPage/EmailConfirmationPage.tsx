import React, {useState} from 'react';
import './styles/EmailConfirmationPage.css'
import Header from "../../commonComponents/Header/Header";
import ConfirmEmailDto from "../../utils/dto/user/confirmEmailDto";
import {confirmEmail} from "../../http/authApi";
import {useLocation, useNavigate} from "react-router-dom";
import routeNames from "../../utils/routeNames";

const EmailConfirmationPage = () => {
    const [confirmationCode, setConfirmationCode] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state.email;

    const handleConfirmationCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmationCode(e.target.value);
    };

    const handleConfirmClick = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        let confirmEmailDto = new ConfirmEmailDto(email, confirmationCode);
        confirmEmail(confirmEmailDto)
            .then(success => {
                if (success) {
                    alert("Email was confirmed successfully!")
                    navigate(routeNames.LOGIN_PAGE)
                } else
                    // TODO: Заменить alert на подсказки, где юзер ошибся в случае BadRequest или Redirect на страницу 5XX ошибки
                    alert("Something went wrong. Try again")
            })
    };

    return (
        <div className="form-page email-confirmation-page">
            <Header/>
            <div className="form-container  email-confirmation-page-container">
                <h2>Email Confirmation</h2>
                <p className="form-labels-style">Please enter the confirmation code sent to your email.</p>
                <form method="POST" className="input-form-container">
                    <input
                        type="text"
                        name="confirmation_code"
                        placeholder="Confirmation Code"
                        value={confirmationCode}
                        className="input-container input-style-f62::placeholder"
                        onChange={handleConfirmationCodeChange}
                        required
                    />
                    <button type="submit" className="purple-button-style confirm-button"
                            onClick={handleConfirmClick}>
                        Confirm
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EmailConfirmationPage;