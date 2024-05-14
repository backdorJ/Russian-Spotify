import {createContext} from 'react';
import './index.css';
import UserStore from "./stores/adminStore";
import ReactDOM from "react-dom/client";
import App from "./App";

export const UserContext = createContext(new UserStore());

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <UserContext.Provider value={new UserStore()}>
        <App/>
    </UserContext.Provider>
);
