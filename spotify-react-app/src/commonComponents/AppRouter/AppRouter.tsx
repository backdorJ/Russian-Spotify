import {Route, Routes} from "react-router-dom";
import routes from "../../utils/routes";


export default function AppRouter() {

    return (
        <Routes>
            {
                routes.map(({path, element}) => (
                    <Route path={path} element={element({})} />
                ))
            }
        </Routes>
    )
}