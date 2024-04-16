import Header from "../../commonComponents/Header/Header";
import './styles/NewPasswordPage.css'
import React, {useState} from "react";
import {resetPassword} from "../../http/authApi";
import routeNames from "../../utils/routeNames";
import {useNavigate} from "react-router-dom";
import UserNewPasswordDto from "../../utils/dto/user/userNewPasswordDto";
import {codeConfirmationOperations} from "../../utils/operations/codeConfirmationOperations";

const NewPasswordPage = () => {
    const [email, setEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newPasswordConfirmation, setnewPasswordConfirmation] = useState('')
    const navigate = useNavigate();

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPassword(e.target.value);
    };

    const handleNewPasswordConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setnewPasswordConfirmation(e.target.value);
    };

    let handleResetPassword = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        let user = new UserNewPasswordDto(email, newPassword, newPasswordConfirmation)
        resetPassword(user)
            .then(success => {
                if (success) {
                    alert("Registered successfully! Please check your Email to confirm it")
                    navigate(routeNames.CONFIRMATION_CODE_PAGE, {
                        state: {
                            email: email,
                            operation: codeConfirmationOperations.ResetPassword
                        }
                    })
                } else
                    // TODO: Заменить alert на подсказки, где юзер ошибся в случае BadRequest или Redirect на страницу 5XX ошибки
                    alert("Something went wrong. Try again")
            })
    }

    return (
        <div className="form-page new-password-page">
            <Header/>
            <div className="form-container new-password-page-container">
                <h2>Password Reset</h2>
                <form method="POST" className="input-form-container">
                    <input
                        type="text"
                        name="Email"
                        placeholder="Email"
                        value={email}
                        className="input-container input-style-f62::placeholder"
                        onChange={handleEmailChange}
                        required
                    />
                    <input
                        type="password"
                        name="new_password"
                        placeholder="New password"
                        value={newPassword}
                        className="input-container input-style-f62::placeholder"
                        onChange={handleNewPasswordChange}
                        required
                    />
                    <input
                        type="password"
                        name="new_password_confirmation"
                        placeholder="New password confirmation"
                        value={newPasswordConfirmation}
                        className="input-container input-style-f62::placeholder"
                        onChange={handleNewPasswordConfirmChange}
                        required
                    />
                    <button type="submit" className="purple-button-style confirm-button"
                            onClick={handleResetPassword}>
                        Confirm
                    </button>
                </form>
            </div>
        </div>
    )
}

export default NewPasswordPage