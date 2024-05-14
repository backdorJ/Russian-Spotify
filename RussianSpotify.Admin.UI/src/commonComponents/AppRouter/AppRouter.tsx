import {Route, Routes} from "react-router-dom";
import {authRoutes, notAuthRoutes} from "../../utils/routes";
import {useContext} from "react";
import {UserContext} from "../../index";
import {observer} from "mobx-react-lite";
import HomePage from "../../pages/HomePage/HomePage";
import LoginPage from "../../pages/LoginPage/LoginPage";

const AppRouter = observer(() => {
    const adminStore = useContext(UserContext)

    return (
        <Routes>
            {
                !adminStore.isAuth && notAuthRoutes.map(({path, Component}) => (
                    <Route path={path} element={<Component/>} key={path}/>
                ))
            }
            {
                adminStore.isAuth && authRoutes.map(({path, Component}) => (
                    <Route path={path} element={<Component/>} key={path}/>
                ))
            }
            {
                adminStore.isAuth
                    ? <Route path="*" element=<HomePage/>/>
                    : <Route path="*" element=<LoginPage/>/>
            }
        </Routes>
    )
})

export default AppRouter