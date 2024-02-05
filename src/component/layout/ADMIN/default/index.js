import style from './default.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBars, faChartLine,
    faClipboard,
    faFolder,
    faFolderTree, faGear,
    faHouseChimney, faRankingStar, faRightFromBracket,
    faUsersLine
} from "@fortawesome/free-solid-svg-icons";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

export default function DefaultAdmin({children}) {
    const Children = children.type
    const navigate = useNavigate()
    const [active, setActive] = useState()
    const location = useLocation()

    const handleNextPage = (url) => {
        switch (url) {
            case "user page":
                navigate('/admin/user')
                break
            case "home page":
                navigate('/admin')
                break
            case 'projects page':
                navigate('/admin/projects')
                break
            case 'categories page':
                navigate('/admin/categories')
                break
            case 'posts page':
                navigate('/admin/posts')
                break
            case 'rank page':
                navigate('/admin/rank')
                break
            case 'line page':
                navigate('/admin/line')
                break
            default:
                console.log('Không thể xảy ra trường hợp này')
        }
    }

    useEffect(() => {
        switch (location.pathname) {
            case '/admin':
                setActive(0)
                break
            case '/admin/line':
                setActive(1)
                break
            case '/admin/rank':
                setActive(2)
                break
            case '/admin/user':
                setActive(4)
                break
            case '/admin/projects':
                setActive(5)
                break
            case '/admin/categories':
                setActive(6)
                break
            case  '/admin/posts':
                setActive(7)
                break
            default:
                console.log('Không làm gì hết')
        }
    }, [location.pathname])

    const handleLogOut = () => {
        localStorage.removeItem("sessionProfile1")
        window.location.reload(false)
    }


    return (
        <>
            <div className={"grip"}>
                <div className={"row"}>
                    <div className={"col col-3"}>
                        <div className={style.defaultAdmin}>
                            <nav className={style.nav}>
                                <ul className={style.list1}>
                                    <li>
                                        <div className={style.boxInfoAdmin}>
                                            <div className={style.iconUser}>
                                                <img alt={"icon"} src={"/png/iconUser.png"}/>
                                            </div>
                                            <div className={style.infoUser}>
                                                <label>Chào bạn!</label>
                                                <font>Rất vui khi có bạn ở đây</font>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <i><FontAwesomeIcon icon={faBars}/></i>
                                    </li>
                                    <li className={active === 0 ? style.active : undefined}
                                        onClick={() => handleNextPage('home page')}>
                                        <i><FontAwesomeIcon icon={faHouseChimney}/></i><span>Home</span>
                                    </li>
                                    <li className={active === 1 ? style.active : undefined}
                                        onClick={() => handleNextPage('line page')}>
                                        <i><FontAwesomeIcon icon={faChartLine}/></i><span>Line</span></li>
                                    <li className={active === 2 ? style.active : undefined}
                                        onClick={() => handleNextPage('rank page')}><i><FontAwesomeIcon
                                        icon={faRankingStar}/></i><span>Rank</span></li>
                                </ul>
                                <hr/>
                                <ul>
                                    <li className={active === 4 ? style.active : undefined}
                                        onClick={() => handleNextPage('user page')}><i><FontAwesomeIcon
                                        icon={faUsersLine}/></i><span>Users</span></li>
                                    <li className={active === 5 ? style.active : undefined}
                                        onClick={() => handleNextPage('projects page')}><i><FontAwesomeIcon
                                        icon={faFolder}/></i><span>Projects</span></li>
                                    <li className={active === 6 ? style.active : undefined}
                                        onClick={() => handleNextPage('categories page')}><i><FontAwesomeIcon
                                        icon={faFolderTree}/></i><span>Categories</span></li>
                                    <li className={active === 7 ? style.active : undefined}
                                        onClick={() => handleNextPage('posts page')}><i><FontAwesomeIcon
                                        icon={faClipboard}/></i><span>Posts</span></li>
                                </ul>
                                <hr/>
                                <ul>
                                    <li><i><FontAwesomeIcon icon={faGear}/></i><span>Setting</span></li>
                                    <li onClick={handleLogOut}>
                                        <i><FontAwesomeIcon icon={faRightFromBracket}/></i><span>Log Out</span>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <div className={"col col-9"}>
                        <div className={style.children}>
                            <Children/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}