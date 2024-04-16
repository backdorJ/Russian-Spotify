import Header from "../../commonComponents/Header/Header";
import './styles/ResetPasswordPage.css'
import React, {useEffect, useState} from "react";
import {resetPassword} from "../../http/authApi";
import routeNames from "../../utils/routeNames";
import {useNavigate} from "react-router-dom";
import UserNewPasswordDto from "../../utils/dto/user/userNewPasswordDto";
import {codeConfirmationOperations} from "../../utils/operations/codeConfirmationOperations";
import {ShowHideSvg} from "../../assets/mock/loginpage/buttons-SVGs/ShowHideSvg";

const ResetPasswordPage = () => {
    const [email, setEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('')
    const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
    const [isNewPasswordConfirmVisible, setIsNewPasswordConfirmVisible] = useState(false);
    const [fadeProp, setFadeProp] = useState({fade: 'fade-out'})
    const navigate = useNavigate();

    let handleResetnewPassword = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        let user = new UserNewPasswordDto(email, newPassword, newPasswordConfirm)
        resetPassword(user)
            .then(success => {
                if (success) {
                    alert("Registered successfully! Please check your Email to confirm it")
                    navigate(routeNames.CONFIRMATION_CODE_PAGE, {
                        state: {
                            email: email,
                            operation: codeConfirmationOperations.ResetPassword,
                            newnewPassword: newPassword
                        }
                    })
                } else
                    // TODO: Заменить alert на подсказки, где юзер ошибся в случае BadRequest или Redirect на страницу 5XX ошибки
                    alert("Something went wrong. Try again")
            })
    }

    useEffect(() => {
        if (newPassword === newPasswordConfirm) {
            setFadeProp({
                fade: 'fade-out'
            })
        } else {
            setFadeProp({
                fade: 'fade-in'
            })
        }
    }, [newPassword, newPasswordConfirm])

    return (
        <div className="form-page reset-password-page">
            <Header/>
            <div className="form-container reset-password-page-container">
                <h2>Password Reset</h2>
                <form method="POST" className="input-form-container">
                    <div className="input-field-container">
                        <input
                            type="text"
                            name="Email"
                            placeholder="Email"
                            value={email}
                            className="input-container input-style-f62::placeholder"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-field-container">
                        <div className="password-input-container">
                            <input
                                id="Password"
                                placeholder="New Password" type={isNewPasswordVisible ? 'text' : 'Password'}
                                value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                                className="input-container input-style-f62::placeholder" required/>
                            <div className="svg-container1">
                                <button onClick={() => setIsNewPasswordVisible(prev => !prev)}
                                        className="button-switch-type"
                                        type="button">
                                    <ShowHideSvg/>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="input-field-container">
                        <div className="password-input-container">
                            <input
                                id="newPasswordConfirm"
                                placeholder="Password confirmation"
                                type={isNewPasswordConfirmVisible ? 'text' : 'Password'}
                                value={newPasswordConfirm}
                                onChange={(e) => setNewPasswordConfirm(e.target.value)}
                                className="input-container input-style-f62::placeholder" required/>
                            <div className="svg-container1">
                                <button onClick={() => setIsNewPasswordConfirmVisible(prev => !prev)}
                                        className="button-switch-type"
                                        type="button">
                                    <ShowHideSvg/>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={fadeProp.fade}>
                        <div className={fadeProp.fade}>
                            <p className="password-error">Passwords don't match</p>
                        </div>
                    </div>
                    <button type="submit" className="purple-button-style confirm-button"
                            onClick={handleResetnewPassword}>
                        Confirm
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ResetPasswordPage