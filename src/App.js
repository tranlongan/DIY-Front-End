import {privateRoutes, privateRoutesAdmin, publicRoutes, publicRoutesAdmin} from "./routes";
import {Route, Routes, useLocation} from "react-router-dom";
import {Fragment, useEffect, useState} from "react";
import LayoutDefault from "./component/layout/USER/default";

function App() {
    const [loggedInSuccess, setLoggedInSuccess] = useState(localStorage.getItem(`sessionProfile${window.location.href.slice(17, 21).trim()}`) !== null)
    const [loggedInSuccess1, setLoggedInSuccess1] = useState(localStorage.getItem('sessionProfile1') !== null)

    const location = useLocation()
    useEffect(() => {
        setLoggedInSuccess(localStorage.getItem(`sessionProfile${window.location.href.slice(17, 21).trim()}`) !== null)
        setLoggedInSuccess1(localStorage.getItem('sessionProfile1') !== null)
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
                    console.log('private routes')
                    return (
                        <Route key={index} path={routes.path} element={<Layout><Page/></Layout>}/>
                    )
                })
            }
            {
                loggedInSuccess1 === false &&
                publicRoutesAdmin.map((routes, index) => {
                    const Page = routes.component
                    let Layout = LayoutDefault
                    if (routes.layout) {
                        Layout = routes.layout
                    } else if (routes.layout === null) {
                        routes.layout = Fragment
                    }
                    console.log('public admin routes')
                    return (
                        <Route
                            key={index}
                            path={routes.path}
                            element={(<Layout><Page/></Layout>)}/>
                    )
                })
            }
            {
                loggedInSuccess1 === true &&
                privateRoutesAdmin.map((routes, index) => {
                    const Page = routes.component
                    let Layout = LayoutDefault
                    if (routes.layout) {
                        Layout = routes.layout
                    } else if (routes.layout === null) {
                        routes.layout = Fragment
                    }
                    console.log('public admin routes')
                    return (
                        <Route
                            key={index}
                            path={routes.path}
                            element={(<Layout><Page/></Layout>)}/>
                    )
                })
            }
        </Routes>
    )
}

export default App;
