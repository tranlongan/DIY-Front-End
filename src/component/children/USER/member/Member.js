import style from './member.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCamera,
    faChevronRight,
    faGraduationCap,
    faHouseFlag,
    faLocationDot, faPenToSquare,
    faUserPlus, faXmark
} from "@fortawesome/free-solid-svg-icons";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

export default function Member() {
    const navigate = useNavigate()
    const location = useLocation()
    const [profile, setProfile] = useState([])
    const [posts, setPosts] = useState([])
    const [avatar, setAvatar] = useState(undefined)
    const [background, setBackground] = useState(undefined)
    const [name, setName] = useState('')
    const port = window.location.port;
    const ID_SELF = JSON.parse(localStorage.getItem(`sessionProfile${port}`))?.id_account

    useEffect(() => {
        axios.get(`http://localhost:3001/getProfiles?idUser=${location.state.idUser}`)
            .then(res => {
                setProfile(res.data.profile)
            })
            .catch(e => console.log(e))

        axios.get(`http://localhost:3001/getPostsById?idUser=${location.state.idUser}`)
            .then(res => {
                setPosts(res.data.posts)
            })
            .catch(e => console.log(e))
    }, [location.state.idUser])

    const handleChangeBackground = (e) => {
        const inputEditBackground = document.getElementById('background')
        const btnChangeBg = document.getElementById('btnChangeBg')
        const btnStopChangeBg = document.getElementById('btnStopChangeBg')
        const [file] = e.target.files
        if (file) {
            inputEditBackground.style.backgroundImage = `url(${URL.createObjectURL(file)})`
            setBackground(file)
            btnChangeBg.style.display = "block"
            btnStopChangeBg.style.display = "block"
        }
    }

    const handleConfirmBackground = async () => {
        try {
            const formData = new FormData()
            formData.append("idUser", ID_SELF)
            formData.append('background', background)
            const res = await axios.post(`http://localhost:3001/editBackground`, formData)
            if (res.data.msg === 'edit success') {
                navigate(0)
            }
        } catch (e) {
            console.log(e)
        }
    }

    const handleChangeAvatar = (e) => {
        try {
            const avatar = document.getElementById('avatar')
            const btnCloseAvatar = document.getElementById('btnCloseAvatar')
            const btnConfirmAvatar = document.getElementById('btnConfirmAvatar')
            const [file] = e.target.files
            if (file) {
                avatar.src = URL.createObjectURL(file)
                setAvatar(file)
                btnCloseAvatar.style.display = "block"
                btnConfirmAvatar.style.display = "block"
            }
        } catch (e) {
            console.log(e)
        }
    }

    const handleCloseBackground = () => {
        navigate(0)
    }

    const handleConfirmAvatar = async () => {
        try {
            const formData = new FormData()
            formData.append("idUser", ID_SELF)
            formData.append('avatar', avatar)
            const res = await axios.post(`http://localhost:3001/editAvatar`, formData)
            if (res.data.msg === 'edit success') {
                navigate(0)
            }
        } catch (e) {
            console.log(e)
        }
    }

    const handleCloseAvatar = async () => {
        navigate(0)
    }

    const handleOpenEdit = () => {
        const boxEdit = document.getElementById('boxEdit')
        const boxNameUser = document.getElementById('boxNameUser')
        boxEdit.style.display = "block"
        boxNameUser.style.opacity = '0'
        boxNameUser.style.zIndex = '-10'
    }

    const handleCloseInput = () => {
        if (name.length > 0) {
            setName('')
        } else {
            navigate(0)
        }
    }

    const handleChangeName = (e) => {
        setName(e.target.value)
    }

    const handleEditName = async () => {
        const res = await axios.post(`http://localhost:3001/editName?idUser=${ID_SELF}&name=${name}`)
        if (res.data.msg === 'edit success') {
            navigate(0)
        }
    }

    console.log(posts)
    return (
        <>
            <div className={style.member}>
                <div className={style.navigationBar}>
                    <div className={style.navList1}>
                        <div className={style.link}>
                            <div className={style.logo}>
                                DIY
                            </div>
                            <i><FontAwesomeIcon icon={faChevronRight}/></i>
                            <div className={style.nameMember}>{profile[0]?.fullName}</div>
                        </div>
                        <ul className={style.navList2}>
                            {/*<li className={style.navItem}></li>*/}
                        </ul>
                    </div>
                </div>
                <div className={style.background} id={'background'}
                     style={{backgroundImage: `url(${profile[0]?.background})`}}>
                    <label htmlFor={"inputEditBackground"} id={"labelEditBackground"}>
                        <span><i><FontAwesomeIcon icon={faCamera}/></i></span>
                        Edit Background
                    </label>
                    <input type={"file"} id={"inputEditBackground"} style={{display: "none"}} accept={"image/*"}
                           onChange={handleChangeBackground}/>
                    <div className={style.boxBtn}>
                        <button className={style.btnChangeBg} id={"btnChangeBg"} onClick={handleConfirmBackground}>
                            Xác nhận
                        </button>
                        <button className={style.btnStopChangeBg} id={"btnStopChangeBg"}
                                onClick={handleCloseBackground}>
                            Hủy bỏ
                        </button>
                    </div>

                </div>
                <div className={style.memberTitle}>
                    <div className={style.backgroundTitle}></div>
                    <div id={"boxEdit"} className={style.boxEdit}>
                        <input id={"inputEditNameUser"} className={style.inputEditNameUser} type={"text"}
                               onChange={handleChangeName} placeholder={profile[0]?.fullName} value={name}/>
                        <i style={{zIndex: "3"}} onClick={handleCloseInput}>
                            <FontAwesomeIcon icon={faXmark}/>
                        </i>
                        <button onClick={handleEditName} className={style.btnConfirmName}>Xác nhận</button>
                    </div>
                    <div className={style.top} id={"boxNameUser"}>
                        {profile[0]?.fullName}
                        <span>
                            <i onClick={handleOpenEdit}><FontAwesomeIcon icon={faPenToSquare}/></i>
                        </span>
                    </div>
                    <div className={style.bottom}>
                        <img alt={"line"} src={"https://universe.leagueoflegends.com/images/t1HeaderDivider.png"}/>
                    </div>
                    <div className={style.descriptionTitle}>
                        TRANG CÁ NHÂN
                    </div>
                </div>
                <div className={"grip"}>
                    <div className={style.container}>
                        <div className={style.banner}>
                            <div className={style.item}>
                                <div className={style.introTitle}>
                                    <font>giới thiệu</font>
                                </div>
                                <div className={style.introduceYourselfInDetail}>
                                    <div className={style.itemInf}>
                                        <i><FontAwesomeIcon icon={faGraduationCap}/></i>
                                        <font>Đã từng học ở..........</font>
                                    </div>
                                    <div className={style.itemInf}>
                                        <i><FontAwesomeIcon icon={faHouseFlag}/></i>
                                        <font>Sống tại..........</font>
                                    </div>
                                    <div className={style.itemInf}>
                                        <i><FontAwesomeIcon icon={faLocationDot}/></i>
                                        <font>Đến từ..........</font>
                                    </div>
                                </div>
                            </div>
                            <div className={style.item}>
                                <button id={"btnCloseAvatar"} className={style.btnCloseAvatar}
                                        onClick={handleCloseAvatar}>Hủy bỏ
                                </button>
                                <button id={"btnConfirmAvatar"} className={style.btnConfirmAvatar}
                                        onClick={handleConfirmAvatar}>Xác nhận
                                </button>
                                <div className={style.avatar}>
                                    <div className={style.boxImage}>
                                        <img id={"avatar"} alt={"avatar"}
                                             src={profile[0]?.avatar}/>
                                        <label className={style.boxIconCamera} htmlFor={"inputEditAvatar"}>
                                            <div className={style.coating}></div>
                                            <i className={style.iconCamera}>
                                                <FontAwesomeIcon icon={faCamera}/>
                                            </i>
                                        </label>
                                    </div>
                                    <input type={"file"} accept={"image/*"} id={"inputEditAvatar"}
                                           style={{display: "none"}} onChange={handleChangeAvatar}/>
                                </div>
                                <div className={style.introduceYourself}>
                                    {
                                        profile[0]?.introduce === null ? 'Đây là phần tự giới thiệu bản thân, đây là phần sẽ giúp cho người khác hiểu về bản thân của mình' : profile[0]?.introduce
                                    }
                                </div>
                                <div className={style.signature}>{profile[0]?.fullName}</div>
                            </div>
                            <div className={style.item}>
                                <div className={style.follow}>
                                    <i><FontAwesomeIcon icon={faUserPlus}/></i>
                                </div>
                                <div className={style.followers}>
                                    110k
                                </div>
                            </div>
                            <div className={style.item}>4</div>
                            <div className={style.item}>
                                <div className={style.backgroundStore}
                                     style={{backgroundImage: 'url(/background/696.jpg)'}}></div>
                                <div className={style.infStore}>
                                    Tài khoản này chưa đăng ký cửa hàng, người anh em hãy thông cảm.
                                </div>
                                <div className={style.viewStore}>
                                    <button>View</button>
                                </div>
                            </div>
                        </div>
                        <div className={style.title}>
                            <div className={style.dashLineLeft}></div>
                            BÀI VIẾT
                            <div className={style.dashLineRight}></div>
                        </div>
                        <div className={style.posts}>
                            {
                                posts?.map((data, index) => (
                                    <div key={index} className={style.post}>
                                        <img alt={"imgPost"} src={data.illustration_post}
                                             onClick={() => navigate(`/diy/${data.id_of_project}/${data.title_post}`, {
                                                 state: {
                                                     idPost: data.id_post,
                                                     idUser: data.id_of_user
                                                 }
                                             })}/>
                                        <div className={style.content}>
                                            <div className={style.titlePost}>
                                                <font>
                                                    {data.title_post}
                                                </font>
                                            </div>
                                            <div className={style.infPost}>
                                                <img alt={"avatar"}
                                                     src={"https://i.pinimg.com/originals/c2/8f/4e/c28f4ef1e7fc374ee893af320d7ce755.jpg"}/>
                                                <font>Norman</font>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        {/*<Paging/>*/}
                    </div>
                </div>
            </div>
        </>
    )
}