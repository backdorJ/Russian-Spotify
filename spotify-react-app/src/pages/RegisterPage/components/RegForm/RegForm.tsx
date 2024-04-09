import "./styles/RegForm.css";
import React, {useState} from "react";
import InputRegisterWidget from "../InputRegisterWidget/InputRegisterWidget";
import {register} from "../../../../http/authApi";
import UserRegisterDto from "../../../../utils/dto/user/userRegisterDto";
import routeNames from "../../../../utils/routeNames";
import {useNavigate} from "react-router-dom";

const RegForm = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    const [role, setRole] = useState('user')
    const [isUser, setAsUser] = useState(false);

    let handleRegister = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (password1 !== password2) {
            alert("Passwords don't match")
            return
        }
        e.preventDefault()
        let user = new UserRegisterDto(username, email, password1, password2, role)
        // register(user)
        //     .then(success => {
        //         if (success) {
        //             alert("Registered successfully! Please check your Email to confirm it")
        //             navigate(routeNames.HOME_PAGE)
        //         } else
        //             // TODO: Заменить alert на подсказки, где юзер ошибся в случае BadRequest или Redirect на страницу 5XX ошибки
        //             alert("Something went wrong. Try again")
        //     })
        console.log(true)
    }

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAsUser(event.target.checked);
        if(isUser)
            setRole('user')
        else
            setRole('author')
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
                    password1={password1}
                    setPassword1={setPassword1}
                    password2={password2}
                    setPassword2={setPassword2}/>
                <div className="is-author">
                    <label className="user switcher-label">
                        User
                    </label>
                    <div className="checkbox-container">
                        <label className="switch">
                            <input type="checkbox" checked={isUser} onChange={handleCheckboxChange}/>
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
