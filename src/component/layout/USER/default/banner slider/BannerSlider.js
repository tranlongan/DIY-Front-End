import style from './bannerSlider.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {useRef, useState} from "react";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export default function BannerSlider() {
    const navigate = useNavigate();
    const slides_ = useRef(null)
    const sliderButtons_ = useRef(null)
    const [projects, setProjects] = useState([])

    const handleNextSlide = () => {
        const slides = document.querySelectorAll(`.slide`)
        const polygons = document.querySelectorAll(`.${style.polygon}`)
        const mid = document.querySelector(`.${style.polygon}:nth-child(3)`)
        const right = document.querySelector(`.${style.polygon}:nth-child(4)`)
        slides.forEach(slide => {
            slides_.current.appendChild(slides[0])
        })
        polygons.forEach(polygon => {
            sliderButtons_.current.appendChild(polygons[0])
        })
        if (mid.children[0].id === "canvas") {
            const canvas = document.querySelectorAll("#canvas")
            const context = canvas[0].getContext('2d')
            context.clearRect(0, 0, canvas[0].width, canvas[0].height);

            mid.children[0].id = "canvas1"
            mid.children[0].removeAttribute("width");
            mid.children[0].removeAttribute("height");
            mid.children[0].classList.add(`${style.canvas1}`)
            const canvas1 = document.querySelectorAll("#canvas1")
            drawCanvas1(canvas1)
        }
        if (right.children[0].id === "canvas1") {
            const canvas1 = document.querySelectorAll("#canvas1")
            const context = canvas1[2].getContext('2d')
            context.clearRect(0, 0, canvas1[2].width, canvas1[2].height);
            right.children[0].id = "canvas"
            right.children[0].setAttribute("width", "552");
            right.children[0].setAttribute("height", "290");
            right.children[0].classList.remove(`${style.canvas1}`)
            const canvas = document.querySelectorAll("#canvas")
            drawCanvas(canvas)
        }
    }
    const handlePrevSlide = () => {
        const slides = document.querySelectorAll(`.slide`)
        const polygons = document.querySelectorAll(`.${style.polygon}`)
        const head = document.querySelector(`.${style.polygon}:nth-child(1)`)
        const left = document.querySelector(`.${style.polygon}:nth-child(2)`)
        const mid = document.querySelector(`.${style.polygon}:nth-child(3)`)

        slides.forEach(slide => {
            slides_.current.prepend(slides[slides.length - 1])
        })
        polygons.forEach(polygon => {
            sliderButtons_.current.prepend(polygons[polygons.length - 1])
        })

        if (mid.children[0].id === "canvas") {
            const canvas = document.querySelectorAll("#canvas")
            const context = canvas[0].getContext('2d')
            context.clearRect(0, 0, canvas[0].width, canvas[0].height);

            mid.children[0].id = "canvas1"
            mid.children[0].removeAttribute("width");
            mid.children[0].removeAttribute("height");
            mid.children[0].classList.add(`${style.canvas1}`)
            const canvas1 = document.querySelectorAll("#canvas1")
            drawCanvas1(canvas1)
        }
        if (left.children[0].id === "canvas1") {
            const canvas1 = document.querySelectorAll("#canvas1")
            const context = canvas1[1].getContext('2d')
            context.clearRect(0, 0, canvas1[1].width, canvas1[1].height);
            left.children[0].id = "canvas"
            left.children[0].setAttribute("width", "552");
            left.children[0].setAttribute("height", "290");
            left.children[0].classList.remove(`${style.canvas1}`)
            const canvas = document.querySelectorAll("#canvas")
            drawCanvas(canvas)
        }
        if (head.children[0].id === 'canvas1') {
            const canvas1 = document.querySelectorAll("#canvas1")
            drawCanvas1(canvas1)
        }
    }
    const handleOpenSlide = () => {
        const name = sliderButtons_.current?.children[2].children[1].children[1].textContent
        const id = sliderButtons_.current?.children[2].children[1].children[2].textContent
        navigate(`/diy/${name}?idProject=${id}`, {state: {name: name, id: id}})
    }
    const drawCanvas = (canvas) => {
        if (canvas) {
            for (let i = 0; i < canvas.length; i++) {
                const ctx = canvas[i].getContext("2d");
                canvas[i].style.transition = "0.8s"
                ctx.beginPath();
                ctx.lineTo(0, 31)
                ctx.lineTo(276, 6);
                ctx.lineTo(552, 31);
                ctx.strokeStyle = "#937341"
                ctx.lineWidth = 4.5;
                ctx.stroke()
                ctx.closePath()

                ctx.beginPath();
                ctx.fillStyle = "#232020"
                ctx.lineTo(276, 8);
                ctx.lineTo(0, 32);
                ctx.lineTo(0, 258);
                ctx.lineTo(276, 290);
                ctx.lineTo(552, 258);
                ctx.lineTo(552, 32);
                ctx.lineTo(276, 8);
                ctx.fill();
                ctx.closePath()

                ctx.beginPath();
                ctx.moveTo(276, 24);
                ctx.lineTo(24, 48);
                ctx.lineTo(24, 242);
                ctx.lineTo(276, 274);
                ctx.lineTo(528, 242);
                ctx.lineTo(528, 48);
                ctx.lineTo(276, 24);
                ctx.fillStyle = "#937341"
                ctx.lineWidth = 0.3;
                ctx.stroke();
                ctx.closePath()
            }
        } else {
            return;
        }
    }
    const drawCanvas1 = (canvas1) => {
        if (canvas1) {
            for (let i = 0; i < canvas1.length; i++) {

                const ctx = canvas1[i].getContext('2d');
                ctx.beginPath()
                ctx.fillStyle = "#232020"
                ctx.rect(0, 0, 552, 210)
                ctx.fill()
                ctx.closePath()

                ctx.beginPath()
                ctx.moveTo(0, 0)
                ctx.lineTo(552, 0)
                ctx.strokeStyle = "#937341"
                ctx.lineWidth = 4;
                ctx.stroke()
                ctx.closePath()
            }
        } else {
            return;
        }

    }

    useEffect(() => {
        const canvas = document.querySelectorAll("#canvas")
        const canvas1 = document.querySelectorAll("#canvas1")
        drawCanvas(canvas)
        drawCanvas1(canvas1)
    })

    useEffect(() => {
        axios.get('http://localhost:3001/getProjects')
            .then(res => {
                setProjects(res.data.projects)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    return (
        <>
            <div className={style.box}>
                <div className={style.backgroundSlider}></div>
                <div className={style.slider}>
                    <div className={style.slides} id={style.slides} ref={slides_}>
                        {
                            projects?.map((data, index) => (
                                <div key={index} className={`${style.slide} slide`} id={"item1"}
                                     style={{backgroundImage: `url(${data.projects[0].img_project})`}}>
                                </div>
                            ))
                        }
                    </div>
                    <div className={style.sliderButtons} ref={sliderButtons_}>
                        {
                            projects?.map((data, index) => (
                                <div className={style.polygon} key={index}>
                                    <canvas id={index !== 2 ? "canvas1" : "canvas"}
                                            className={index !== 2 ? style.canvas1 : ""}
                                            width={index === 2 ? "552" : ""} height={index === 2 ? "290" : ""}/>
                                    <div className={style.content}>
                                        <div className={style.title}>explore project</div>
                                        <div className={style.description}>{data.projects[0].name_project}</div>
                                        <div style={{opacity: '0'}}
                                             className={style.note}>{data.projects[0].id_project}</div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    <div className={style.buttons}>
                        <button className={style.btnPrev} onClick={handlePrevSlide}>
                            <i><FontAwesomeIcon icon={faArrowLeft}/></i>
                        </button>
                        <button className={style.btnNext} onClick={handleNextSlide}>
                            <i><FontAwesomeIcon icon={faArrowRight}/></i>
                        </button>
                    </div>
                    <div className={style.buttons1}>
                        <button className={style.btnPrev1} onClick={handlePrevSlide}></button>
                        <div className={style.boxBtnMid}>
                            <button className={style.btnMid} onClick={handleOpenSlide}></button>
                        </div>
                        <button className={style.btnNext1} onClick={handleNextSlide}></button>
                    </div>
                </div>
            </div>
        </>
    )
}