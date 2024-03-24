import {Route, Routes} from "react-router-dom";
import {routes, authRoutes} from "../../utils/routes";
import {useContext} from "react";
import {SpotifyContext} from "../../index";


export default function AppRouter() {
    const userStore = useContext(SpotifyContext)

    return (
        <Routes>
            {
                routes.map(({path, element}) => (
                    <Route path={path} element={element({})} key={path}/>
                ))
            }
            {
                userStore.getIsAuth() && authRoutes.map(({path, element}) => (
                    <Route path={path} element={element({})} key={path}/>
                ))
            }
        </Routes>
    )
}