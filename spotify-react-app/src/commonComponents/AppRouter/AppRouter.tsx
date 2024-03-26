import {Route, Routes} from "react-router-dom";
import {routes, authRoutes, notAuthRoutes} from "../../utils/routes";
import {useContext} from "react";
import {SpotifyContext} from "../../index";
import {observer} from "mobx-react-lite";
import HomePage from "../../pages/HomePage/HomePage";
import LoginPage from "../../pages/LoginPage/LoginPage";



const AppRouter = observer(() => {
    const userStore = useContext(SpotifyContext)

    return (
        <Routes>
            {
                !userStore.isAuth && notAuthRoutes.map(({path, Component}) => (
                    <Route path={path} element=<Component/> key={path}/>
                ))
            }
            {
                userStore.isAuth && authRoutes.map(({path, Component}) => (
                    <Route path={path} element=<Component/> key={path}/>
                ))
            }
            {
                userStore.isAuth
                    ? <Route path="*" element=<HomePage/>/>
                    : <Route path="*" element=<LoginPage/>/>
            }
        </Routes>
    )
})

export default AppRouter