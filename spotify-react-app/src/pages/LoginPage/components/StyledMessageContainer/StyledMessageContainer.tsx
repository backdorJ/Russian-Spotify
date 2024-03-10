import "./style.css";
import messages from "./messages.json";

const StyledMessageContainer = () => {
  return (
    <div className="google-login-container">
      <div className="center-aligned-text-container">
        <p className="google-sign-in-button-style">{messages["continue_google"]}</p>
      </div>
    </div>
  );
}

export default StyledMessageContainer;
