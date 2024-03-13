import "./styles/AuthForm.css";
import React from "react";
import InputLoginWidget from "../InputLoginWidget/InputLoginWidget";

const AuthForm = () => {
    return (
        <div className="auth-form-container">
            <button className="rounded-blue-button">
                <div className="svg-container">
                    <svg viewBox="0,5,250,250">
                        <g transform="scale(5.33333,5.33333)">
                            <path
                                d="M35.937,18.041c0.046,-0.151 0.068,-0.291 0.062,-0.416c-0.015,-0.362 -0.264,-0.625 -0.85,-0.625h-2.618c-0.661,0 -0.966,0.4 -1.144,0.801c0,0 -1.632,3.359 -3.513,5.574c-0.61,0.641 -0.92,0.625 -1.25,0.625c-0.177,0 -0.624,-0.214 -0.624,-0.801v-5.185c0,-0.694 -0.173,-1.014 -0.732,-1.014h-4.649c-0.407,0 -0.619,0.32 -0.619,0.641c0,0.667 0.898,0.827 1,2.696v3.623c0,0.88 -0.153,1.04 -0.483,1.04c-0.89,0 -2.642,-3 -3.815,-6.932c-0.254,-0.774 -0.508,-1.068 -1.169,-1.068h-2.643c-0.763,0 -0.89,0.374 -0.89,0.774c0,0.721 0.6,4.619 3.875,9.101c2.375,3.25 5.504,5.125 8.274,5.125c1.678,0 1.85,-0.427 1.85,-1.094v-2.972c0.001,-0.801 0.184,-0.934 0.718,-0.934c0.381,0 1.158,0.25 2.658,2c1.73,2.018 2.044,3 3.036,3h2.618c0.608,0 0.957,-0.255 0.971,-0.75c0.003,-0.126 -0.015,-0.267 -0.056,-0.424c-0.194,-0.576 -1.084,-1.984 -2.194,-3.326c-0.615,-0.743 -1.222,-1.479 -1.501,-1.879c-0.187,-0.261 -0.258,-0.445 -0.249,-0.621c0.009,-0.185 0.105,-0.361 0.249,-0.607c-0.026,0 3.358,-4.751 3.688,-6.352z"
                                fill="white"
                                className="vk-button-svg"/>
                        </g>
                    </svg>
                </div>
                Continue with VK
            </button>
            <button className="rounded-red-button">
                <div className="svg-container">
                    <svg viewBox="-2 0 24 24">
                        <path
                            d="M13.32 7.666h-.924c-1.694 0-2.585.858-2.585 2.123 0 1.43.616 2.1 1.881 2.959l1.045.704-3.003 4.487H7.49l2.695-4.014c-1.55-1.111-2.42-2.19-2.42-4.015 0-2.288 1.595-3.85 4.62-3.85h3.003v11.868H13.32V7.666z"
                            fill="#fff"
                            className="yandex-button-svg"/>
                    </svg>
                </div>
                Continue with Yandex
            </button>
            <button className="rounded-white-button">
                <div className="svg-container">
                    <svg viewBox="0 -8 64 64">
                        <path className="google-button-svg"
                              d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                              fill="#FBBC05">
                        </path>
                        <path className="google-button-svg"
                              d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                              fill="#EB4335">
                        </path>
                        <path className="google-button-svg"
                              d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                              fill="#34A853">
                        </path>
                        <path className="google-button-svg"
                              d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                              fill="#4285F4">
                        </path>
                    </svg>
                </div>
                Continue with Google
            </button>
            <div className="separator-line"/>
            <div className="border-separator-horizontal"/>
            <p className="header-text-styles">or</p>
            <form>
                <InputLoginWidget/>
                <div className="login-section-controls">
                    <div className="password-reset-section">
                        <a className="password-reset-link-text-style">Forgot your password?</a>
                        <div className="login-section">
                            <div className="checkbox-container">
                                <label className="switch">
                                    <input type="checkbox"/>
                                    <span className="slider round"/>
                                </label>
                            </div>
                            <label htmlFor="remember me" className="remember-me-label">
                                Remember me
                            </label>
                        </div>
                    </div>
                    <div className="login-section1">
                        <button className="purple-button-style">Log In</button>
                    </div>
                </div>
                <div className="border-separator"/>
            </form>
        </div>
    )
}

export default AuthForm;
