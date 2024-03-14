import "./styles/InputRegisterWidget.css";
import {useEffect, useState} from "react";

const InputRegisterWidget = () => {
    const [isPassword1Visible, setIsPassword1Visible] = useState(false);
    const [isPassword2Visible, setIsPassword2Visible] = useState(false);
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    const [fadeProp, setFadeProp] = useState({fade: 'fade-out'})

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
            <div className="login-form-label-container">
                <div className="input-label-container">
                    <label htmlFor="username" className="form-labels-style">
                        Username
                    </label>
                    <input id="username" placeholder="Username" type="text" maxLength={12} minLength={5}
                           className="input-container input-style-f62::placeholder" required/>
                </div>
            </div>
            <div className="login-form-label-container">
                <div className="input-label-container">
                    <label htmlFor="email address" className="form-labels-style">
                        Email address
                    </label>
                    <input id="email address" placeholder="Email address" type="text"
                           className="input-container input-style-f62::placeholder" required/>
                </div>
            </div>
            <div className="password-field-container">
                <div className="input-label-container">
                    <label htmlFor="password" className="form-labels-style">
                        Password
                    </label>
                    <div className="password-input-container">
                        <input id="password1" placeholder="Password" type={isPassword1Visible ? 'text' : 'password'}
                               value={password1} onChange={(e) => setPassword1(e.target.value)}
                               className="input-container input-style-f62::placeholder" required/>
                        <div className="svg-container1">
                            <button onClick={togglePassword1Visibility} className="button-switch-type" type="button">
                                <svg id="toggle-password"
                                     viewBox="0 0 24.875 22.0241">
                                    <path
                                        d="M22.6445,2.219c0.096,-0.092 0.172,-0.203 0.224,-0.325c0.053,-0.122 0.08,-0.253 0.081,-0.386c0.001,-0.132 -0.024,-0.264 -0.074,-0.387c-0.05,-0.123 -0.125,-0.234 -0.219,-0.328c-0.093,-0.094 -0.205,-0.169 -0.328,-0.219c-0.123,-0.05 -0.255,-0.075 -0.387,-0.074c-0.133,0.001 -0.264,0.029 -0.386,0.081c-0.122,0.052 -0.233,0.129 -0.325,0.224l-3.643,3.643c-1.529,-0.69 -3.23,-1.053 -5.15,-1.053c-3.329,0 -6.004,1.091 -8.258,3.089c-0.896,0.794 -2.3,2.353 -3.381,4.453l-0.236,0.458l0.236,0.458c1.082,2.1 2.485,3.659 3.381,4.453c0.278,0.246 0.562,0.479 0.853,0.697l-2.802,2.802c-0.096,0.092 -0.172,0.203 -0.224,0.325c-0.053,0.122 -0.08,0.253 -0.081,0.386c-0.001,0.132 0.024,0.264 0.074,0.387c0.05,0.123 0.125,0.235 0.219,0.328c0.093,0.094 0.205,0.169 0.328,0.219c0.123,0.05 0.255,0.075 0.387,0.074c0.133,-0.001 0.264,-0.028 0.386,-0.081c0.122,-0.052 0.233,-0.128 0.325,-0.224l3.126,-3.126l0.003,0.002l1.503,-1.503l-0.004,-0.001l1.73,-1.73l0.004,0.001l1.567,-1.567h-0.004l4.68,-4.681l0.001,0.004l1.595,-1.595l-0.002,-0.003l0.11,-0.109l0.002,0.002l1.444,-1.444l-0.003,-0.002zM15.3215,6.715l-5.57,5.57c-0.383,-0.377 -0.686,-0.828 -0.892,-1.324c-0.206,-0.496 -0.311,-1.029 -0.309,-1.566c0,-2.23 1.761,-4 3.886,-4c1.137,0 2.17,0.506 2.884,1.319zM8.3375,13.699l-1.873,1.873c-0.333,-0.237 -0.652,-0.492 -0.957,-0.763c-0.674,-0.596 -1.77,-1.793 -2.683,-3.414c0.913,-1.62 2.01,-2.818 2.683,-3.414c0.519,-0.46 1.061,-0.863 1.634,-1.204c-0.39,0.818 -0.592,1.712 -0.591,2.618c0,1.681 0.683,3.21 1.787,4.304zM19.9055,8.499l1.415,-1.415c1.099,1.145 2.027,2.443 2.756,3.853l0.236,0.458l-0.236,0.458c-1.082,2.1 -2.485,3.659 -3.381,4.453c-2.254,1.997 -4.93,3.089 -8.258,3.089c-1.037,0.005 -2.071,-0.112 -3.08,-0.348l1.726,-1.726c0.435,0.05 0.886,0.074 1.354,0.074c2.833,0 5.037,-0.907 6.931,-2.586c0.674,-0.596 1.77,-1.793 2.683,-3.414c-0.592,-1.051 -1.313,-2.024 -2.146,-2.896z"
                                        fill="currentColor"/>
                                    <path
                                        d="M18.2805,10.124c-0.328,2.755 -2.494,4.956 -5.24,5.24z"
                                        fill="currentColor"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="password-field-container">
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
                                <svg id="toggle-password"
                                     viewBox="0 0 24.875 22.0241">
                                    <path
                                        d="M22.6445,2.219c0.096,-0.092 0.172,-0.203 0.224,-0.325c0.053,-0.122 0.08,-0.253 0.081,-0.386c0.001,-0.132 -0.024,-0.264 -0.074,-0.387c-0.05,-0.123 -0.125,-0.234 -0.219,-0.328c-0.093,-0.094 -0.205,-0.169 -0.328,-0.219c-0.123,-0.05 -0.255,-0.075 -0.387,-0.074c-0.133,0.001 -0.264,0.029 -0.386,0.081c-0.122,0.052 -0.233,0.129 -0.325,0.224l-3.643,3.643c-1.529,-0.69 -3.23,-1.053 -5.15,-1.053c-3.329,0 -6.004,1.091 -8.258,3.089c-0.896,0.794 -2.3,2.353 -3.381,4.453l-0.236,0.458l0.236,0.458c1.082,2.1 2.485,3.659 3.381,4.453c0.278,0.246 0.562,0.479 0.853,0.697l-2.802,2.802c-0.096,0.092 -0.172,0.203 -0.224,0.325c-0.053,0.122 -0.08,0.253 -0.081,0.386c-0.001,0.132 0.024,0.264 0.074,0.387c0.05,0.123 0.125,0.235 0.219,0.328c0.093,0.094 0.205,0.169 0.328,0.219c0.123,0.05 0.255,0.075 0.387,0.074c0.133,-0.001 0.264,-0.028 0.386,-0.081c0.122,-0.052 0.233,-0.128 0.325,-0.224l3.126,-3.126l0.003,0.002l1.503,-1.503l-0.004,-0.001l1.73,-1.73l0.004,0.001l1.567,-1.567h-0.004l4.68,-4.681l0.001,0.004l1.595,-1.595l-0.002,-0.003l0.11,-0.109l0.002,0.002l1.444,-1.444l-0.003,-0.002zM15.3215,6.715l-5.57,5.57c-0.383,-0.377 -0.686,-0.828 -0.892,-1.324c-0.206,-0.496 -0.311,-1.029 -0.309,-1.566c0,-2.23 1.761,-4 3.886,-4c1.137,0 2.17,0.506 2.884,1.319zM8.3375,13.699l-1.873,1.873c-0.333,-0.237 -0.652,-0.492 -0.957,-0.763c-0.674,-0.596 -1.77,-1.793 -2.683,-3.414c0.913,-1.62 2.01,-2.818 2.683,-3.414c0.519,-0.46 1.061,-0.863 1.634,-1.204c-0.39,0.818 -0.592,1.712 -0.591,2.618c0,1.681 0.683,3.21 1.787,4.304zM19.9055,8.499l1.415,-1.415c1.099,1.145 2.027,2.443 2.756,3.853l0.236,0.458l-0.236,0.458c-1.082,2.1 -2.485,3.659 -3.381,4.453c-2.254,1.997 -4.93,3.089 -8.258,3.089c-1.037,0.005 -2.071,-0.112 -3.08,-0.348l1.726,-1.726c0.435,0.05 0.886,0.074 1.354,0.074c2.833,0 5.037,-0.907 6.931,-2.586c0.674,-0.596 1.77,-1.793 2.683,-3.414c-0.592,-1.051 -1.313,-2.024 -2.146,-2.896z"
                                        fill="currentColor"/>
                                    <path
                                        d="M18.2805,10.124c-0.328,2.755 -2.494,4.956 -5.24,5.24z"
                                        fill="currentColor"/>
                                </svg>
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

export default InputRegisterWidget;
