import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";

export default [
    {
        path: '/',
        element: HomePage
    },
    {
        path: '/login',
        element: LoginPage
    },
    {
        path: '/register',
        element: RegisterPage
    }
]