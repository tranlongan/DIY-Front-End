import Navbar from "../../default/navbar/Navbar";
import BannerSlider from "./banner slider/BannerSlider";
import style from './layoutDefault.module.css'
import Footer from "../../default/footer/Footer";
import {useEffect} from "react";
import Paging from "../../default/paging/Paging";

export default function LayoutDefault({children}) {
    useEffect(()=>{
        window.scrollTo(0, 0)
    })
    return (
        <>
            <header>
                <Navbar/>
            </header>
            <div className={`${style.grip} grip`}>
                <BannerSlider/>
                <div className={style.children}>
                    {
                        children
                    }
                </div>
                <Paging/>
            </div>
            <footer>
                <Footer/>
            </footer>
        </>
    )
}