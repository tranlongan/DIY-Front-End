import {useEffect} from "react";
import Navbar from "../../../default/navbar/Navbar";
import style from "./setting.module.css";

export default function Setting({children}) {
    useEffect(() => {
        window.scrollTo(0, 0)

        // document.addEventListener('scroll', (e) => {
        //     console.log(document.documentElement.scrollTop)
        // })
    })

    return (
        <>
            <header>
                <Navbar/>
            </header>
            <div className={style.container}>
                <div className={style.background}></div>
                {
                    children
                }
            </div>
        </>
    )
}