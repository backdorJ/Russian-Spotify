import "./styles/InputRegisterWidget.css";
import {useEffect, useState} from "react";
import {ShowHideSvg} from "../../../../assets/mock/loginpage/buttons-SVGs/ShowHideSvg";

export default function InputRegisterWidget(props: any) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isPasswordConfirmVisible, setIsPasswordConfirmVisible] = useState(false);
    const [fadeProp, setFadeProp] = useState({fade: 'fade-out'})
    const {
        username,
        setUsername,
        email,
        setEmail,
        password,
        setPassword,
        passwordConfirm,
        setPasswordConfirm
    } = props

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(prev => !prev)
    }

    const togglePasswordConfirmVisibility = () => {
        setIsPasswordConfirmVisible(prev => !prev)
    }

    useEffect(() => {
        if (password === passwordConfirm) {
            setFadeProp({
                fade: 'fade-out'
            })
        } else {
            setFadeProp({
                fade: 'fade-in'
            })
        }
    }, [password, passwordConfirm])

    return (
        <div>
            <div className="input-field-container">
                <div className="input-label-container">
                    <label htmlFor="username" className="form-labels-style">
                        Username
                    </label>
                    <input
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        id="username"
                        placeholder="Username"
                        type="text" maxLength={12} minLength={5}
                        className="input-container input-style-f62::placeholder" required/>
                </div>
            </div>
            <div className="input-field-container">
                <div className="input-label-container">
                    <label htmlFor="email address" className="form-labels-style">
                        Email address
                    </label>
                    <input
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        id="email address"
                        placeholder="Email address"
                        type="text"
                        className="input-container input-style-f62::placeholder" required/>
                </div>
            </div>
            <div className="input-field-container">
                <div className="input-label-container">
                    <label htmlFor="password" className="form-labels-style">
                        Password
                    </label>
                    <div className="password-input-container">
                        <input
                            id="password1"
                            placeholder="Password" type={isPasswordVisible ? 'text' : 'password'}
                            value={password} onChange={(e) => setPassword(e.target.value)}
                            className="input-container input-style-f62::placeholder" required/>
                        <div className="svg-container1">
                            <button onClick={togglePasswordVisibility} className="button-switch-type" type="button">
                                <ShowHideSvg/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="input-field-container">
                <div className="input-label-container">
                    <label htmlFor="password" className="form-labels-style">
                        Confirm password
                    </label>
                    <div className="password-input-container">
                        <input id="password2" placeholder="Confirm password"
                               type={isPasswordConfirmVisible ? 'text' : 'password'} value={passwordConfirm}
                               onChange={(e) => setPasswordConfirm(e.target.value)}
                               className="input-container input-style-f62::placeholder" required/>
                        <div className="svg-container1">
                            <button onClick={togglePasswordConfirmVisibility} className="button-switch-type" type="button">
                                <ShowHideSvg/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={fadeProp.fade}>
                <p className="password-error">Passwords don't match</p>
            </div>
        </div>
    );
}
