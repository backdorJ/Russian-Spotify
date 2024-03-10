import "./style.css";
import messages from "./messages.json";

const AccountSignupBox = () => {
  return (
    <div className="signup-section">
      <p className="signup-prompt-text-style">{messages["dont_account"]}</p>
      {/* Button Component is detected here. We've generated code using HTML. See other options in "Component library" dropdown in Settings */}
      <button className="sign-up-button-style">{messages["sign_up_spotify"]}</button>
    </div>
  );
}

export default AccountSignupBox;
