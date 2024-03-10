import SvgIcon1 from "./icons/SvgIcon1";
import "./style.css";
import messages from "./messages.json";

const PasswordInputWidget = () => {
  return (
    <div className="password-field-container">
      {/* Input with Label Component is detected here. We've generated code using HTML. See other options in "Component library" dropdown in Settings */}
      <div className="input-label-container">
        <label htmlFor="password" className="email-label-style">
          {messages["password"]}
        </label>
        <div className="password-input-container">
          <input id="password" placeholder="Password" type="text" className="input-container input-style-f62::placeholder" />
          <SvgIcon1 className="svg-container1" />
        </div>
      </div>
    </div>
  );
}

export default PasswordInputWidget;
