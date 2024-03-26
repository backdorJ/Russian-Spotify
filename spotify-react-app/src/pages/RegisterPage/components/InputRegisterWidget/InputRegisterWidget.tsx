import "./styles/InputRegisterWidget.css";
import {useEffect, useState} from "react";
import {ShowHideSvg} from "../../../../assets/mock/loginpage/buttons-SVGs/ShowHideSvg";

export default function InputRegisterWidget(props: any) {
    const [isPassword1Visible, setIsPassword1Visible] = useState(false);
    const [isPassword2Visible, setIsPassword2Visible] = useState(false);
    const [fadeProp, setFadeProp] = useState({fade: 'fade-out'})
    const {
        username,
        setUsername,
        email,
        setEmail,
        password1,
        setPassword1,
        password2,
        setPassword2
    } = props

    const togglePassword1Visibility = () => {
        setIsPassword1Visible(prev => !prev)
    }

    const togglePassword2Visibility = () => {
        setIsPassword2Visible(prev => !prev)
    }

    useEffect(() => {
        if (password1 === password2) {
            setFadeProp({
                fade: 'fade-out'
            })
        } else {
            setFadeProp({
                fade: 'fade-in'
            })
        }
    }, [password1, password2])

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
                            placeholder="Password" type={isPassword1Visible ? 'text' : 'password'}
                            value={password1} onChange={(e) => setPassword1(e.target.value)}
                            className="input-container input-style-f62::placeholder" required/>
                        <div className="svg-container1">
                            <button onClick={togglePassword1Visibility} className="button-switch-type" type="button">
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
                               type={isPassword2Visible ? 'text' : 'password'} value={password2}
                               onChange={(e) => setPassword2(e.target.value)}
                               className="input-container input-style-f62::placeholder" required/>
                        <div className="svg-container1">
                            <button onClick={togglePassword2Visibility} className="button-switch-type" type="button">
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
