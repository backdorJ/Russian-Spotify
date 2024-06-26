import "./styles/RegForm.css";
import React, {useState} from "react";
import InputRegisterWidget from "../InputRegisterWidget/InputRegisterWidget";
import UserRegisterDto from "../../../../utils/dto/user/userRegisterDto";
import {useNavigate} from "react-router-dom";
import {register} from "../../../../http/authApi";
import routeNames from "../../../../utils/routeNames";
import {codeConfirmationOperations} from "../../../../utils/operations/codeConfirmationOperations";

const RegForm = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [role, setRole] = useState('Пользователь')
    const navigate = useNavigate();

    let handleRegister = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (password !== passwordConfirm) {
            alert("Passwords don't match")
            return
        }
        e.preventDefault()
        let user = new UserRegisterDto(username, email, password, passwordConfirm, role)
        register(user)
            .then(response => {
                if (response.status === 200) {
                    alert("Registered successfully! Please check your Email to confirm it")
                    navigate(routeNames.CONFIRMATION_CODE_PAGE, {
                        state: {
                            email: email,
                            operation: codeConfirmationOperations.ConfirmEmail
                        }
                    })

                } else {
                    if (response.message === "User with same email already registered") {
                        alert(response.message)
                        navigate(routeNames.LOGIN_PAGE)
                    } else {
                        alert(response.message)
                    }
                }
            })
    }

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked)
            setRole('Автор')
        else
            setRole('Пользователь')
    };

    return (
        <div className="auth-form-container">
            <p className="form-header-text-styles">Sign up with your email address</p>
            <div className="separator-line"/>
            <form>
                <InputRegisterWidget
                    username={username}
                    setUsername={setUsername}
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    passwordConfirm={passwordConfirm}
                    setPasswordConfirm={setPasswordConfirm}/>
                <div className="is-author">
                    <label className="user switcher-label">
                        User
                    </label>
                    <div className="checkbox-container">
                        <label className="switch">
                            <input type="checkbox" onChange={handleCheckboxChange}/>
                            <span className="slider round"/>
                        </label>
                    </div>
                    <label className="author switcher-label">
                        Author
                    </label>
                </div>
                <div className="signup-section">
                    <p>By clicking on Sign up, you agree to <a>Spotify's terms & conditions</a> and <a>privacy
                        policy</a></p>
                    <button
                        onClick={handleRegister}
                        className="purple-button-style">Sign Up
                    </button>
                </div>
            </form>
        </div>
    )
}

export default RegForm;
