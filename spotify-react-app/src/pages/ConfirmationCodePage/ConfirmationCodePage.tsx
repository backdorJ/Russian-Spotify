import React, {useState} from 'react';
import './styles/EmailConfirmationPage.css'
import Header from "../../commonComponents/Header/Header";
import userConfirmEmailDto from "../../utils/dto/user/userConfirmEmailDto";
import {confirmEmail, resetPassword, confirmPasswordReset} from "../../http/authApi";
import {useLocation, useNavigate} from "react-router-dom";
import routeNames from "../../utils/routeNames";

const ConfirmationCodePage = () => {
    const [confirmationCode, setConfirmationCode] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state.email;
    const operation = location.state.operation;

    const handleConfirmationCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmationCode(e.target.value);
    };

    const handleConfirmClick = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (operation === 'confirm_email') {
            let confirmEmailDto = new userConfirmEmailDto(email, confirmationCode);
            confirmEmail(confirmEmailDto)
                .then(success => {
                    if (success) {
                        alert("Email was confirmed successfully!")
                        navigate(routeNames.LOGIN_PAGE)
                    } else {
                        // TODO: Заменить alert на подсказки, где юзер ошибся в случае BadRequest или Redirect на страницу 5XX ошибки
                        alert("Something went wrong. Try again")
                    }
                });
        } else if (operation === 'reset_password') {
            // Обработка сброса пароля
            confirmPasswordReset(email)
                .then(success => {
                    if (success) {
                        alert("Password reset successfully!");
                        // Redirect на страницу входа или что-то еще
                    } else {
                        alert("Something went wrong. Try again");
                    }
                });
        }
    };

    return (
        <div className="form-page email-confirmation-page">
            <Header/>
            <div className="form-container  email-confirmation-page-container">
                <h2>{operation === 'confirm_email' ? 'Email Confirmation' : 'Password Reset'}</h2>
                <p className="form-labels-style">
                    {operation === 'confirm_email' ? 'Please enter the confirmation code sent to your email.' : 'Please enter the confirmation code sent to your email to reset your password.'}
                </p>
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

export default ConfirmationCodePage;