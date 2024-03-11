import "./style.css";

const EmailInputWidget = () => {
    return (
        <div className="login-form-label-container">
            {/* Input with Label Component is detected here. We've generated code using HTML. See other options in "Component library" dropdown in Settings */}
            <div className="input-label-container">
                <label htmlFor="email address or username" className="email-label-style">
                    Email address or username
                </label>
                <input id="email address or username" placeholder="Email address or username" type="text"
                       className="email-input-style input-style-f62::placeholder"/>
            </div>
        </div>
    );
}

export default EmailInputWidget;
