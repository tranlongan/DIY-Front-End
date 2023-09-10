import style from "./layout/default/banner slider/bannerSlider.module.css";

function f() {
    return(
        <>
            <div className={style.slides} id={style.slides} ref={slides_}>
                <div className={`${style.slide} slide`} id={"item 1"}
                     style={{backgroundImage: `url("/sliderImage/img1.jpg")`}}>
                </div>
                <div className={`${style.slide} slide`} id={"item 2"}
                     style={{backgroundImage: `url("/sliderImage/img2.jpg")`}}>
                </div>
                <div className={`${style.slide} slide`} id={"item 3"}
                     style={{backgroundImage: `url("https://luctuyetkytuyetme.files.wordpress.com/2022/07/1-luc-tuyet-ky.jpg")`}}>
                </div>
                <div className={`${style.slide} slide`} id={"item 4"}
                     style={{backgroundImage: `url("https://i.pinimg.com/originals/73/a5/37/73a5373b1124f2acdd6331646eb72d0d.jpg")`}}>
                </div>
                <div className={`${style.slide} slide`} id={"item 5"}
                     style={{backgroundImage: `url("https://w.forfun.com/fetch/56/5622c2f5d1aa506e2da6850cd3c2b04a.jpeg?w=1470&r=0.5625")`}}>
                </div>
            </div>
        </>
    )
}