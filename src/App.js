import {privateRoutes, publicRoutes} from "./routes";
import {Route, Routes, useLocation} from "react-router-dom";
import {Fragment, useEffect, useState} from "react";
import LayoutDefault from "./component/layout/default";

function App() {
    const [loggedInSuccess, setLoggedInSuccess] = useState(localStorage.getItem('sessionProfile') !== null)
    const location = useLocation()
    useEffect(() => {
        setLoggedInSuccess(localStorage.getItem('sessionProfile') !== null)
    }, [location.pathname])
    return (
        <Routes>
            {
                loggedInSuccess === false &&
                publicRoutes.map((routes, index) => {
                    const Page = routes.component
                    let Layout = LayoutDefault
                    if (routes.layout) {
                        Layout = routes.layout
                    } else if (routes.layout === null) {
                        routes.layout = Fragment
                    }
                    console.log('public routes')
                    return (
                        <Route
                            key={index}
                            path={routes.path}
                            element={(<Layout><Page/></Layout>)}/>
                    )
                })
            }
            {
                loggedInSuccess === true &&
                privateRoutes.map((routes, index) => {
                    const Page = routes.component
                    let Layout = LayoutDefault
                    if (routes.layout) {
                        Layout = routes.layout
                    } else if (routes.layout === null) {
                        routes.layout = Fragment
                    }
                    console.log('public private')
                    return (
                        <Route key={index} path={routes.path} element={<Layout><Page/></Layout>}/>
                    )
                })
            }
        </Routes>
    )
}

export default App;
