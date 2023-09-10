import style from './NavBar.module.css'
import {useLocation, useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretDown, faMagnifyingGlass, faXmark} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useRef, useState} from "react";
import axios from "axios";

export default function Navbar() {
    const navigate = useNavigate()
    const location = useLocation()
    const formProject_ = useRef([])
    const iconsDown_ = useRef([])
    const boxSearch_ = useRef(null)
    const iconClose_ = useRef(null)

    const [search, setSearch] = useState('')
    const [infoUser, setInfoUser] = useState("")
    const [projects, setProjects] = useState([])

    const handleAppend = (index) => {
        formProject_.current[index].classList.toggle('hidden')
        iconsDown_.current[index].classList.toggle(`${style.up}`)
    }
    const handleOpen = () => {
        boxSearch_.current.style.width = "72%"
        iconClose_.current.style.opacity = "1"
    }
    const handleClose = () => {
        if (search.length === 0) {
            boxSearch_.current.style.width = "44px"
            iconClose_.current.style.opacity = "0"
        } else {
            setSearch('')
        }
    }
    const handleLogOut = () => {
        localStorage.removeItem("sessionProfile")
        window.location.reload(false)
    }
    useEffect(() => {
        if (localStorage.getItem('sessionProfile') !== null) {
            try {
                axios.post(`http://localhost:3001/getInfoUser`, {id_account: JSON.parse(localStorage.getItem('sessionProfile')).id_account})
                    .then(res => {
                        setInfoUser(res.data.infoUser)
                    })
            } catch (e) {
                console.log(e)
            }
        } else {
            return
        }

        axios.get('http://localhost:3001/getProjects')
            .then(res => {
                setProjects(res.data.projects)
            })
            .catch(err => {
                console.log(err)
            })
    }, [location.pathname])
    return (
        <>
            <nav className={style.navBar}>
                <ul className={style.listItems1}>
                    <li className={style.item1} onClick={() => navigate('/')}>
                        <div className={style.logo}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="league" width="32" height="32"
                                 viewBox="0 0 30 32" fill="none">
                                <g>
                                    <path
                                        d="M1.80644 9.75049C0.655032 11.8373 0 14.2271 0 16.7683C0 19.3095 0.655032 21.7015 1.80644 23.7883V9.75049Z"
                                        fill="#C28F2C"></path>
                                    <path
                                        d="M15 2.02222C13.7829 2.02222 12.602 2.16921 11.4688 2.43647V4.75718C12.5907 4.44093 13.7738 4.26721 15 4.26721C22.0218 4.26721 27.7153 9.84627 27.7153 16.7305C27.7153 19.8307 26.5571 22.6659 24.6464 24.8463L24.2838 26.118L23.4814 28.9331C27.4184 26.2761 30.0023 21.8195 30.0023 16.7705C30 8.62355 23.2843 2.02222 15 2.02222Z"
                                        fill="#C28F2C"></path>
                                    <path
                                        d="M11.4688 24.4209H22.9737H23.2253C25.1723 22.4209 26.3713 19.7126 26.3713 16.7305C26.3713 10.5746 21.2806 5.58569 15 5.58569C13.767 5.58569 12.5816 5.78168 11.4688 6.1358V24.4209Z"
                                        fill="#C28F2C"></path>
                                    <path
                                        d="M10.1088 0H1.55029L3.16634 3.29844V28.7038L1.55029 32H21.1922L22.9737 25.7572H10.1088V0Z"
                                        fill="#C28F2C"></path>
                                </g>
                            </svg>
                        </div>
                        <div className={style.nameWeb}>D.I.Y</div>
                    </li>
                </ul>
                <div className={style.search}>
                    <div className={style.boxSearch} ref={boxSearch_}>
                        <input value={search} onChange={e => setSearch(e.target.value)} className={style.inputSearch}/>
                        <div onClick={handleOpen} className={style.iconSearch}>
                            <i><FontAwesomeIcon icon={faMagnifyingGlass}/></i>
                        </div>
                        <div onClick={handleClose} className={style.iconCloseSearch} ref={iconClose_}>
                            <i><FontAwesomeIcon icon={faXmark}/></i>
                        </div>
                    </div>
                </div>
                <ul className={style.listItems}>
                    <li className={style.item}>
                        <font>Explore Projects</font>
                        <i className={style.iconMore}>
                            <FontAwesomeIcon icon={faCaretDown}/>
                        </i>
                        <div className={style.formExplorePrj}>
                            <div className={style.titleExplorePrj}>
                                this is title
                            </div>
                            <ul className={style.projects}>
                                {
                                    projects?.map((data, index) => (
                                        <li key={index} className={style.project}>
                                            <div className={style.nameProject} onClick={() => handleAppend(index)}>
                                                <font>{data.projects[0].name_project}</font>
                                                <i className={`${style.iconDown}`}
                                                   ref={el => {
                                                       iconsDown_.current[index] = el
                                                   }}>
                                                    <FontAwesomeIcon icon={faCaretDown}/>
                                                </i>
                                            </div>
                                            <div className={`${style.formProject} hidden`}
                                                 ref={el => {
                                                     formProject_.current[index] = el
                                                 }}>
                                                <ul className={style.listProject}>
                                                    {
                                                        data.categories?.map((category, index) => (
                                                            <li key={index}>{category.name_category}</li>
                                                        ))
                                                    }
                                                </ul>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </li>
                    <li className={style.item} onClick={() => navigate('/postProject/stage1')}>Post Project</li>
                    <li className={style.item}>Ask DIY Question</li>
                    {
                        infoUser === "" &&
                        <li className={style.item}>
                            <button onClick={() => navigate('/login')}>Join Now</button>
                        </li>
                    }
                    {
                        infoUser !== "" &&
                        <li className={`${style.item} ${style.boxProfile}`}>
                            <div className={style.profile}>
                                <font>
                                    {infoUser[0]?.username}
                                </font>
                                <i>
                                    <FontAwesomeIcon icon={faCaretDown}/>
                                </i>
                            </div>
                            <div className={style.optionForUser}>
                                <div className={style.inFoUser}>
                                    <img alt={"avatar"} src={infoUser[0]?.avatar}/>
                                    <font>{infoUser[0]?.username}</font>
                                </div>
                                <ul className={style.listOption}>
                                    <li onClick={() => navigate('/setting', {state: {id_user: infoUser[0]?.id_user}})}>
                                        Setting
                                    </li>
                                    <li onClick={handleLogOut}>Log Out</li>
                                </ul>
                            </div>
                        </li>
                    }
                </ul>
            </nav>
        </>
    )
}