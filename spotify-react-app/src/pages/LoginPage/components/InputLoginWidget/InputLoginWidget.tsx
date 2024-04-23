import "./styles/InputLoginWidget.css";
import {useState} from "react";
import {ShowHideSvg} from "../../../../assets/mock/loginpage/buttons-SVGs/ShowHideSvg";

const InputLoginWidget = (props: any) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    }
    return (
        <div>
            <div className="input-field-container">
                <div className="input-label-container">
                    <input
                        value={props.email}
                        onChange={e => props.setEmail(e.target.value)}
                        id="email address"
                        placeholder="Email address"
                        type="text"
                        className="input-container" required/>
                </div>
            </div>
            <div className="input-field-container">
                <div className="input-label-container">
                    <div className="password-input-container">
                        <input
                            value={props.password}
                            onChange={e => props.setPassword(e.target.value)}
                            id="password"
                            placeholder="Password"
                            type={isPasswordVisible ? 'text' : 'password'}
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
