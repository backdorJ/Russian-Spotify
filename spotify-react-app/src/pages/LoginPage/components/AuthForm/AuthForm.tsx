import StyledMessageContainer from "../StyledMessageContainer/StyledMessageContainer";
import EmailInputWidget from "../EmailInputWidget/EmailInputWidget";
import PasswordInputWidget from "../PasswordInputWidget/PasswordInputWidget";
import SvgIcon1 from "./icons/SvgIcon1";
import SvgIcon2 from "./icons/SvgIcon2";
import "./style.css";
import messages from "./messages.json";

const AuthForm = () => {
  return (
    <div className="auth-form-container">
      {/* Button Component is detected here. We've generated code using HTML. See other options in "Component library" dropdown in Settings */}
      <button className="rounded-blue-button">
        <SvgIcon1 className="svg-container" />
        {messages["continue_facebook"]}
      </button>
      {/* Button Component is detected here. We've generated code using HTML. See other options in "Component library" dropdown in Settings */}
      <button className="rounded-dark-button">
        <SvgIcon2 className="svg-container" />
        {messages["continue_apple"]}
      </button>
      <StyledMessageContainer />
      <div className="separator-line" />
      <div className="border-separator-horizontal" />
      <p className="header-text-styles">or</p>
      <EmailInputWidget />
      <PasswordInputWidget />
      <div className="login-section-controls">
        <div className="password-reset-section">
          <p className="password-reset-link-text-style">{messages["forgot_password"]}</p>
          {/* Checkbox with Label Component is detected here. We've generated code using HTML. See other options in "Component library" dropdown in Settings */}
          <div className="login-section1">
            <div className="checkbox-container">
              <input id="remember me" type="checkbox" defaultChecked={true} className="hidden-input" />
            </div>
            <label htmlFor="remember me" className="remember-me-label">
              {messages["remember_me"]}
            </label>
          </div>
        </div>
        <div className="login-section">
          {/* Button Component is detected here. We've generated code using HTML. See other options in "Component library" dropdown in Settings */}
          <button className="login-button-style">{messages["log"]}</button>
        </div>
      </div>
      <div className="border-separator" />
    </div>
  );
}

export default AuthForm;
