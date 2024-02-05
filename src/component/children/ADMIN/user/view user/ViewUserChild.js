import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarDay, faChevronLeft, faClipboard} from "@fortawesome/free-solid-svg-icons";
import style from './ViewUser.module.css'
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

export default function ViewUserChild() {
    const navigate = useNavigate()
    const location = useLocation()
    const [user, setUser] = useState([])
    const [posts, setPosts] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:3001/admin/getUserById?idUser=${location.state.idUser}`)
            .then(res => {
                setUser(res.data.user)
                setPosts(res.data.posts)
            })
    }, [location.state.idUser])

    const handleDelete = async (e, idUser) => {
        try {
            const answer = window.confirm('Are you sure?')
            if (!answer) {
                e.preventDefault()
            } else {
                const res = await axios.post(`http://localhost:3001/admin/deleteAccount?idUser=${idUser}`)
                if (res.data.msg === 'delete success') {
                    navigate('/admin/user', {replace: true})
                }
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <div className={style.viewUserChild}>
                <div className={style.boxBack} onClick={() => navigate(-1)}>
                    <i><FontAwesomeIcon icon={faChevronLeft}/></i>
                    <span>Back</span>
                </div>
                <div className={style.listBtn}>
                    <button onClick={e => handleDelete(e, user[0]?.id_account)}>Delete</button>
                </div>
                {
                    user?.map((data, index) => (
                        <div key={index} className={style.infoPart1}
                             style={{backgroundImage: `url(${data.background})`}}>
                            <div className={"coating"}></div>
                            <div className={style.avatar}>
                                <img alt={"avatar"}
                                     src={data.avatar}/>
                            </div>
                            <div className={style.info}>
                                <div className={style.fullName}>Norman</div>
                                <div className={style.birthday}>
                                    <i><FontAwesomeIcon icon={faCalendarDay}/></i>
                                    <span>
                                {data.birthday.slice(0, 10)}
                            </span>
                                </div>
                                <div className={style.totalPost}>
                                    <i><FontAwesomeIcon icon={faClipboard}/></i><span>{posts.length} post</span>
                                </div>
                                <div className={style.description}>
                                    We are Rob and Courtney, husband and wife duo, and former in-house creators for the
                                    Hometalk
                                    project team. We love working together to create any and everything, from home décor
                                    to
                                    furniture primarily made from reclaimed materials.
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}