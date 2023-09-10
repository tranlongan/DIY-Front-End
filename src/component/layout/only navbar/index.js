import Navbar from "../../default/navbar/Navbar";
import Footer from "../../default/footer/Footer";
import style from './onlyNavbar.module.css'
import {useEffect} from "react";

export default function OnlyNavbar({children}) {
    useEffect(()=>{
        window.scrollTo(0, 0)
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
            <footer>
                <Footer/>
            </footer>
        </>
    )
}