import "./AuthForm.css";
import React from "react";
import InputWidget from "../InputWidget/InputWidget";


const AuthForm = () => {
    return (
        <div className="auth-form-container">
            <button className="rounded-blue-button">
                <div className="svg-container">
                    <svg>
                        <path
                            d="M22,12.0187c0,-5.523 -4.477,-10 -10,-10c-5.523,0 -10,4.477 -10,10c0,4.991 3.657,9.128 8.438,9.878v-6.987h-2.54v-2.891h2.54v-2.203c0,-2.506 1.492,-3.89 3.777,-3.89c1.093,0 2.238,0.195 2.238,0.195v2.46h-1.26c-1.243,0 -1.63,0.771 -1.63,1.563v1.875h2.773l-0.443,2.89h-2.33v6.988c4.78,-0.75 8.437,-4.887 8.437,-9.878z"
                            fill="currentColor"/>
                    </svg>
                </div>
                Continue with Facebook
            </button>
            <button className="rounded-dark-button">
                <div className="svg-container">
                    <svg>
                        <path
                            d="M12.1442,6.8927c0.858,0 1.933,-0.58 2.573,-1.353c0.58,-0.701 1.002,-1.679 1.002,-2.658c0,-0.132 -0.012,-0.265 -0.036,-0.374c-0.954,0.036 -2.102,0.64 -2.79,1.449c-0.544,0.616 -1.039,1.583 -1.039,2.573c0,0.145 0.024,0.29 0.036,0.338c0.061,0.013 0.157,0.025 0.254,0.025zM9.1242,21.5077c1.172,0 1.691,-0.785 3.153,-0.785c1.486,0 1.812,0.761 3.116,0.761c1.281,0 2.138,-1.184 2.947,-2.343c0.906,-1.329 1.281,-2.634 1.305,-2.694c-0.085,-0.024 -2.537,-1.027 -2.537,-3.841c0,-2.44 1.933,-3.539 2.042,-3.624c-1.281,-1.836 -3.225,-1.884 -3.757,-1.884c-1.437,0 -2.609,0.87 -3.346,0.87c-0.797,0 -1.848,-0.822 -3.092,-0.822c-2.367,0 -4.771,1.957 -4.771,5.653c0,2.295 0.894,4.723 1.993,6.293c0.942,1.329 1.764,2.416 2.947,2.416z"
                            fill="currentColor"/>
                    </svg>
                </div>
                Continue with Apple
            </button>
            <button className="rounded-white-button">
                <div className="svg-container">
                    <svg viewBox="0 0 64 64">
                        <path
                            d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                            fill="#FBBC05">
                        </path>
                        <path
                            d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                            fill="#EB4335">
                        </path>
                        <path
                            d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                            fill="#34A853">
                        </path>
                        <path
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
            <InputWidget/>
            <div className="login-section-controls">
                <div className="password-reset-section">
                    <a className="password-reset-link-text-style" href="">Forgot your password?</a>
                    <div className="login-section1">
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
                <div className="login-section">
                    <button className="login-button-style">Log In</button>
                </div>
            </div>
            <div className="border-separator"/>
        </div>
    );
}

export default AuthForm;
