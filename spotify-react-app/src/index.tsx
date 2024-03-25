import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import UserStore from "./stores/userStore";

export const SpotifyContext = createContext(new UserStore())

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <SpotifyContext.Provider value={new UserStore()}>
            <App/>
        </SpotifyContext.Provider>
    </React.StrictMode>
);
