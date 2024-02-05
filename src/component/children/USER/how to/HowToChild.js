import style from './howToChild.module.css'
import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faArrowRight, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {useRef} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import Paging from "../../../default/paging/Paging";

export default function HowToChild(callback, deps) {
    useEffect(() => {
        window.scrollTo(0, 0)
    })
    const form_ = useRef(null)
    const navigate = useNavigate()

    const handlePrev = () => {
        const getWidth = document.querySelector(`.${style.slide}`).offsetWidth;
        form_.current.scrollLeft -= (getWidth + 16) * 5
    }

    const handleNext = () => {
        const getWidth = document.querySelector(`.${style.slide}`).offsetWidth;
        form_.current.scrollLeft += (getWidth + 16) * 5
    }

    const location = useLocation()
    const [howTo, setHowTo] = useState([])
    const [categories, setCategories] = useState([])
    const [postsByIdCtg, setPostsByIdCtg] = useState([])
    console.log(location.state.nameProject,location.state.childOfProject,location.state.id, location.state.idProject)
    useEffect(() => {
        axios.get(`http://localhost:3001/howTo?id_category=${location.state.id}`)
            .then(res => {
                setHowTo(res.data.howTo)
            })
            .catch(err => {
                console.log(err)
            })
        setCategories([])
        axios.get(`http://localhost:3001/exploreProject?id_project=${location.state.idProject}`)
            .then(res => {
                res.data.exploreProject[0].categories.forEach(data => {
                    if (data.id_prj_category !== location.state.id) {
                        setCategories(value => [...value, data])
                    }
                })
            })
            .catch(err => {
                console.log(err)
            })

        axios.get(`http://localhost:3001/getPostsByIdCategory?idCategory=${location.state.id}`)
            .then(res => {
                setPostsByIdCtg(res.data.postsByIdCategory)
            })
            .catch(err => console.log(err))
    }, [location.state])
    return (
        <>
            <div className={style.howTo}>
                <ul className={style.navBar}>
                    <li>
                        Home
                    </li>
                    <li>
                        <i><FontAwesomeIcon icon={faChevronRight}/></i>
                    </li>
                    <li>
                        How to
                    </li>
                    <li>
                        <i><FontAwesomeIcon icon={faChevronRight}/></i>
                    </li>
                    <li>
                        {location.state.nameProject}
                    </li>
                    <li>
                        <i><FontAwesomeIcon icon={faChevronRight}/></i>
                    </li>
                    <li>
                        {location.state.childOfProject}
                    </li>
                </ul>
                <div className={style.titleHowTo}>
                    {howTo[0]?.howTo.title_how_to}
                </div>
                <div className={style.descriptionHowTo}>
                    {howTo[0]?.howTo.desc_how_to}
                </div>
                <div className={style.bannerTutorial}>
                    <div className={style.bannerImg}>
                        <img alt={"banner"}
                             src={howTo[0]?.howTo.img_how_to}/>
                        <div className={style.coatingBanner}>
                            <div className={style.nameProject}>
                                {
                                    location.state.childOfProject
                                }
                            </div>
                        </div>
                    </div>
                    <div className={style.tutorial}>
                        <div className={style.titleTutorial}>
                            {howTo[0]?.howTo.title_stage}
                        </div>
                        <ul>
                            {
                                howTo[0]?.stages.map((data, index) => (
                                    <li key={index}>
                                        <span>{index + 1}</span>
                                        <div className={style.itemTutorial}>
                                            <div className={style.itemTitle}>
                                                {data.title_step}
                                            </div>
                                            <div className={style.itemContent}>
                                                {data.step_content}
                                            </div>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
                <div className={style.slider}>
                    <div className={style.sliderNav}>
                        <div className={style.titleNav}>
                            What do you want to decorate?
                        </div>
                        <div className={style.navDashLine}></div>
                        <div className={style.buttons}>
                            <button className={style.prev} onClick={handlePrev}>
                                <i><FontAwesomeIcon icon={faArrowLeft}/></i>
                            </button>
                            <button className={style.next} onClick={handleNext}>
                                <i><FontAwesomeIcon icon={faArrowRight}/></i>
                            </button>
                        </div>
                    </div>
                    <div className={style.form} ref={form_}>
                        <div className={style.slides}>
                            {
                                categories.map((data, index) => (
                                    <div onClick={() => {
                                        navigate(`/diy/howTo/${data.name_category}`, {
                                            state: {
                                                nameProject: location.state.nameProject,
                                                childOfProject: data.name_category,
                                                id: data.id_prj_category,
                                                idProject: location.state.idProject
                                            }
                                        })
                                    }} className={style.slide}
                                         key={index}>
                                        <img alt={"slide"}
                                             src={data.img_category}/>
                                        <div className={style.coating}></div>
                                        <div className={style.titleSlide}>
                                            {
                                                data.name_category
                                            }
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className={style.title}>
                    <div className={style.dashLineLeft}></div>
                    <font>
                        posts
                    </font>
                    <div className={style.dashLineRight}></div>
                </div>
                <div className={style.posts}>
                    {
                        postsByIdCtg?.map((data, index) => (
                            <div className={style.post} key={index}>
                                <img alt={"imgPost"}
                                     onClick={() => navigate(`/diy/${data.id_of_project}/${data.title_post}`, {
                                         state: {
                                             idPost: data.id_post,
                                             idUser: data.id_of_user
                                         }
                                     })}
                                     src={data.illustration_post}/>
                                <div className={style.content}>
                                    <div className={style.titlePost}>
                                        <font>
                                            {data.title_post}
                                        </font>
                                    </div>
                                    <div className={style.infPost}>
                                        <img alt={"avatar"}
                                             src={data.avatar}/>
                                        <font>{data.fullName}</font>
                                    </div>
                                </div>
                            </div>
                        ))
                    }

                </div>
                <Paging/>
            </div>
        </>
    )
}