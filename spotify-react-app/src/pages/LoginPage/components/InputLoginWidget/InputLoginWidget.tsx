import "./styles/InputLoginWidget.css";
import {useState} from "react";
import {ShowHideSvg} from "../../../../assets/mock/loginpage/buttons-SVGs/ShowHideSvg";

const InputLoginWidget = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    }
    return (
        <div>
            <div className="login-form-label-container">
                <div className="input-label-container">
                    <label htmlFor="email address or username" className="form-labels-style">
                        Email address or username
                    </label>
                    <input id="email address or username" placeholder="Email address or username" type="text"
                           className="input-container" required/>
                </div>
            </div>
            <div className="password-field-container">
                <div className="input-label-container">
                    <label htmlFor="password" className="form-labels-style">
                        Password
                    </label>
                    <div className="password-input-container">
                        <input id="password" placeholder="Password" type={isPasswordVisible ? 'text' : 'password'}
                               className="input-container" required/>
                        <div className="svg-container1">
                            <button onClick={togglePasswordVisibility} className="button-switch-type" type="button">
                                <ShowHideSvg/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InputLoginWidget;
