import style from './exploreProjectChild.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faArrowRight, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {useRef, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {arr} from './json'
import axios from "axios";
import Paging from "../../default/paging/Paging";

export default function ExploreProjectChild() {
    const form_ = useRef(null)
    const navigate = useNavigate()

    const [exploreProject, setExploreProject] = useState([])
    useEffect(() => {
        window.scrollTo(0, 0)
    })
    const handlePrev = () => {
        const getWidth = document.querySelector(`.${style.slide}`).offsetWidth;
        form_.current.scrollLeft -= (getWidth + 16) * 5
    }
    const handleNext = () => {
        const getWidth = document.querySelector(`.${style.slide}`).offsetWidth;
        form_.current.scrollLeft += (getWidth + 16) * 5
    }
    const location = useLocation()
    const [project, setProject] = useState([])

    useEffect(() => {
        arr.forEach((data, index) => {
            if (data.nameProject === location.state.name) {
                setProject(data)
            }
        })
    }, [location.state])

    useEffect(() => {
        axios.get(`http://localhost:3001/exploreProject?id_project=${location.state.id}`)
            .then(res => {
                setExploreProject(res.data.exploreProject)
            })
            .catch(err => {
                console.log(err)
            })
    }, [location.state.id])
    return (
        <>
            <div className={style.exploreProject}>
                <div className={style.navigationBar}>
                    <div className={style.navList1}>
                        <div className={style.link}>
                            <div className={style.logo}>
                                Home
                            </div>
                            <i><FontAwesomeIcon icon={faChevronRight}/></i>
                            <div className={style.nameProject}>{exploreProject[0]?.projects?.name_project}</div>
                        </div>
                        <ul className={style.navList2}>
                            {/*<li className={style.navItem}></li>*/}
                        </ul>
                    </div>

                </div>
                <div className={style.background}
                     style={{backgroundImage: `url(${exploreProject[0]?.projects?.img_project})`}}></div>
                <div className={style.titleProject}>
                    <div className={style.backgroundTitle}></div>
                    <div className={style.top}>
                        {exploreProject[0]?.projects?.name_project}
                    </div>
                    <div className={style.bottom}>
                        <img alt={"line"} src={"https://universe.leagueoflegends.com/images/t1HeaderDivider.png"}/>
                    </div>
                    <div className={style.descriptionTitle}>
                        {exploreProject[0]?.projects?.description_project}
                    </div>
                </div>
                <div className={"grip"}>
                    <div className={`${style.container}`}>
                        <div className={style.title}>
                            <div className={style.dashLineLeft}></div>
                            <font>
                                {exploreProject[0]?.projects?.name_project} Ideas
                            </font>
                            <div className={style.dashLineRight}></div>
                        </div>
                        <div className={style.slider}>
                            <div className={style.sliderNav}>
                                <div className={style.titleNav}>
                                    What do you want to {exploreProject[0]?.projects?.name_project}?
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
                                        exploreProject[0]?.categories?.map((data, index) => (
                                            <div
                                                onClick={() => navigate(`/diy/howTo/${data.name_category}`, {
                                                    state: {
                                                        nameProject: project.nameProject,
                                                        childOfProject: data.name_category,
                                                        id: data.id_prj_category,
                                                        idProject: location.state.id
                                                    }
                                                })}
                                                className={style.slide} key={index}>
                                                <img alt={"slide"}
                                                     src={data.img_category}/>
                                                <div className={style.coating}></div>
                                                <div className={style.titleSlide}>
                                                    {data.name_category}
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
                                project.posts?.map((data, index) => (
                                    <div className={style.post} key={index}>
                                        <img alt={"imgPost"}
                                             src={data.illustration}/>
                                        <div className={style.content}>
                                            <div className={style.titlePost}>
                                                <font>
                                                    {data.namePost}
                                                </font>
                                            </div>
                                            <div className={style.infPost}>
                                                <img alt={"avatar"}
                                                     src={data.avatar}/>
                                                <font>{data.nameUser}</font>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <Paging/>
                </div>
            </div>
        </>
    )
}