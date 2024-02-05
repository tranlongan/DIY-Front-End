import Navbar from "../../../default/navbar/Navbar";
import BannerSlider from "./banner slider/BannerSlider";
import style from './layoutDefault.module.css'
import Footer from "../../../default/footer/Footer";
import {useEffect} from "react";
import {useSearchParams} from "react-router-dom";

export default function LayoutDefault({children}) {
    const [searchParams] = useSearchParams();

    useEffect(() => {
        if (searchParams.get('page') === null) {
            window.scrollTo(0, 0)
        } else {
            return
        }
    })
    return (
        <>
            <header>
                <Navbar/>
            </header>
            <div className={`${style.grip} grip`}>
                <BannerSlider/>
                <div className={style.children}>
                    <div className={style.background}></div>
                    {
                        children
                    }
                </div>
            </div>
            <footer>
                <Footer/>
            </footer>
        </>
    )
}