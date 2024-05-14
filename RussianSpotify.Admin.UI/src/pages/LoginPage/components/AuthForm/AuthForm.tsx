import "./styles/AuthForm.css";
import React, {useContext, useState} from "react";
import InputLoginWidget from "../InputLoginWidget/InputLoginWidget";
import {login} from "../../../../http/authApi";
import AdminLoginDto from "../../../../utils/dto/admin/adminLoginDto";
import {useNavigate} from "react-router-dom";
import routeNames from "../../../../utils/routeNames";
import {UserContext} from "../../../../index";
import {observer} from "mobx-react-lite";
import Admin from "../../../../models/Admin";

const AuthForm = observer(() => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const userStore = useContext(UserContext)
    const navigate = useNavigate()

    let handleLogin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        let admin = new AdminLoginDto(email, password)
        login(admin)
            .then(response => {
                if (response.message) {
                    alert(response.message)
                    return;
                } else {
                    let admin = Admin.init(email)
                    userStore.login(admin)
                    navigate(routeNames.HOME_PAGE)
                }
            })
    }

    return (
        <div className="auth-form-container">
            <form>
                <InputLoginWidget
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}/>
                <div className="login-section">
                    <button
                        onClick={e => handleLogin(e)}
                        className="purple-button-style">Log In
                    </button>
                </div>
            </form>
        </div>
    )
})

export default AuthForm;
