import style from './settingChild.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCircleCheck,
    faComments,
    faEnvelope, faEye, faEyeSlash,
    faKey,
    faLock, faRectangleXmark,
    faShield,
    faUser
} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useRef, useState} from "react";
import {useLocation} from "react-router-dom";
import axios from "axios";

export default function SettingChild() {
    const location = useLocation()
    const [stage, setStage] = useState(0)
    const [infoUser, setInfoUser] = useState([])
    const [isChange, setIsChange] = useState(false)
    const [email, setEmail] = useState("")
    const [currentPass, setCurrentPass] = useState("")
    const [newPass, setNewPass] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const [rule1, setRule1] = useState(false)
    const [rule2, setRule2] = useState(false)

    const [rule3, setRule3] = useState(false)
    const [rule4, setRule4] = useState(false)
    const [rule5, setRule5] = useState(false)
    const [rule6, setRule6] = useState(false)
    const [isChange1, setIsChange1] = useState(false)

    const [isLock1, setIsLock1] = useState(true)
    const [isLock2, setIsLock2] = useState(true)
    const [isLock3, setIsLock3] = useState(true)

    const [openCondition, setOpenCondition] = useState(false)
    const labelCurrentPass_ = useRef(null)
    const labelNewPass_ = useRef(null)
    const labelConfirmPass_ = useRef(null)
    const iconLockCurrentPass_ = useRef(null)
    const iconUnlockCurrentPass_ = useRef(null)
    const iconLockConfirmPass_ = useRef(null)
    const iconLockNewPass_ = useRef(null)
    const iconUnlockConfirmPass_ = useRef(null)
    const iconUnlockNewPass_ = useRef(null)
    const inputConfirmPass_ = useRef(null)
    const inputNewPass_ = useRef(null)
    const inputCurrentPass_ = useRef(null)
    useEffect(() => {
        document.addEventListener('scroll', (e) => {
            if (Math.round(document.documentElement.scrollTop) === 0 && Math.round(document.documentElement.scrollTop) < 80) {
                setStage(0)
            }
            if (Math.round(document.documentElement.scrollTop) > 80) {
                setStage(1)
            }
            if (Math.round(document.documentElement.scrollTop) > 851) {
                setStage(2)
            }
            if (Math.round(document.documentElement.scrollTop) > 1118) {
                setStage(3)
            }
            if (Math.round(document.documentElement.scrollTop) > 1126 && Math.round(document.documentElement.scrollTop) < 1180) {
                setStage(3)
            }
            if (Math.round(document.documentElement.scrollTop) > 1255) {
                setStage(4)
            }
        })
    })
    const scrolling = (y) => {
        window.scrollTo(0, y)
    }
    useEffect(() => {
        axios.post(`http://localhost:3001/getInfoUser`, {id_account: location.state.id_user})
            .then(res => {
                setInfoUser(res.data.infoUser)
                setEmail(res.data.infoUser[0]?.email)
            })
    }, [location.state.id_user])

    useEffect(() => {
        let hasLetter = false;
        let hasNumber = false;
        if (currentPass.length >= 8) {
            setRule6(true)
        } else {
            setRule6(false)
        }
        if (newPass.length >= 8) {
            setRule3(true)
        } else {
            setRule3(false)
            setRule4(false)
        }

        for (let i = 0; i < newPass.length; i++) {
            if (newPass[i] >= '0' && newPass[i] <= '9') {
                hasNumber = true;
            } else if ((newPass[i] >= 'a' && newPass[i] <= 'z') || (newPass[i] >= 'A' && newPass[i] <= 'Z')) {
                hasLetter = true;
            }
            if (hasLetter && hasNumber) {
                setRule4(true)
            } else {
                setRule4(false)
            }
        }

        if (confirmPass === newPass && newPass !== '') {
            setRule5(true)
            inputConfirmPass_.current.style.outline = "1px solid white"
        }
        if (confirmPass !== newPass) {
            setRule5(false)
            inputConfirmPass_.current.style.outline = "2px solid rgb(241,5,5)"
        }
    }, [newPass, confirmPass, currentPass])
    const handleChangeMail = (e) => {
        setEmail(e.target.value)
        setIsChange(true)
        // kiểm tra xem đã nhập gì vào chưa?
        if (e.target.value.length > 0) {
            // kiểm tra xem kết thúc chuỗi có phải là cụm '@gmail.com'
            if (e.target.value.endsWith('@gmail.com')) {
                setRule2(true)
                // bắt đầu xem xét từ cụm '@gmail.com'
                const index = e.target.value.indexOf('@gmail.com');
                const temp = e.target.value.slice(0, index)
                // kiểm tra xem chuỗi đứng trước cụm '@gmail.com' có thỏa mãn điều kiện ở dưới k
                // if (temp.length >= 6 && /[A-Za-z]/.test(temp) && /\d/.test(temp)) {
                if (temp.length >= 6 && /[A-Za-z]/.test(temp) && /\d/.test(temp) && /^[A-Za-z\d]+$/.test(temp)) {
                    setRule1(true);
                } else {
                    setRule1(false);
                }
            } else {
                setRule2(false)
            }

        }
    }
    const handleChangeCurrentPass = (e) => {
        setCurrentPass(e.target.value)
        setIsChange1(true)
    }
    const handleChangeNewPass = (e) => {
        setNewPass(e.target.value)
        setIsChange1(true)
    }
    const handleChangeConfirmPass = (e) => {
        setConfirmPass(e.target.value)
        setIsChange1(true)
    }
    const handleFocusCurrentPass = () => {
        if (isLock1) {
            iconLockCurrentPass_.current.style.display = "block"
        } else {
            iconLockCurrentPass_.current.style.display = "none"
            iconUnlockCurrentPass_.current.style.display = "block"
        }
        labelCurrentPass_.current.style.top = "4px"
        labelCurrentPass_.current.style.left = "8px"
    }
    const handleFocusNewPass = () => {
        setOpenCondition(true)
        if (isLock2) {
            iconLockNewPass_.current.style.display = "block"
        } else {
            iconLockNewPass_.current.style.display = "none"
            iconUnlockNewPass_.current.style.display = "block"
        }
        labelNewPass_.current.style.top = "4px"
        labelNewPass_.current.style.left = "8px"
    }
    const handleFocusConfirmPass = () => {
        if (isLock3) {
            iconLockConfirmPass_.current.style.display = "block"
        } else {
            iconLockConfirmPass_.current.style.display = "none"
            iconUnlockConfirmPass_.current.style.display = "block"
        }
        labelConfirmPass_.current.style.top = "4px"
        labelConfirmPass_.current.style.left = "8px"
    }

    const handleFocusOutCurrentPass = () => {
        iconUnlockCurrentPass_.current.style.display = "none"
        iconLockCurrentPass_.current.style.display = "none"
        if (currentPass === "") {
            labelCurrentPass_.current.style.top = "18px"
            labelCurrentPass_.current.style.left = "24px"
        } else {
            labelCurrentPass_.current.style.top = "4px"
            labelCurrentPass_.current.style.left = "8px"
        }
    }
    const handleFocusOutNewPass = () => {
        setOpenCondition(false)
        iconLockNewPass_.current.style.display = "none"
        iconUnlockNewPass_.current.style.display = "none"
        if (newPass === "") {
            labelNewPass_.current.style.top = "18px"
            labelNewPass_.current.style.left = "24px"
        } else {
            labelNewPass_.current.style.top = "4px"
            labelNewPass_.current.style.left = "8px"
        }
    }
    const handleFocusOutConfirmPass = () => {
        iconLockConfirmPass_.current.style.display = "none"
        iconUnlockConfirmPass_.current.style.display = "none"
        if (confirmPass === "") {
            labelConfirmPass_.current.style.top = "18px"
            labelConfirmPass_.current.style.left = "24px"
        } else {
            labelConfirmPass_.current.style.top = "4px"
            labelConfirmPass_.current.style.left = "8px"
        }
    }

    const handleLockCurrentPass = (e) => {
        e.preventDefault();
        inputCurrentPass_.current.type = "password"
        iconLockCurrentPass_.current.style.display = "block"
        iconUnlockCurrentPass_.current.style.display = "none"
        setIsLock1(true)
    }
    const handleLockNewPass = (e) => {
        e.preventDefault();
        iconLockNewPass_.current.style.display = "block"
        iconUnlockNewPass_.current.style.display = "none"
        inputNewPass_.current.type = "password"
        setIsLock2(true)
    }
    const handleLockConfirmPass = (e) => {
        e.preventDefault();
        iconLockConfirmPass_.current.style.display = "block"
        iconUnlockConfirmPass_.current.style.display = "none"
        inputConfirmPass_.current.type = "password"
        setIsLock3(true)
    }
    const handleUnlockCurrentPass = (e) => {
        e.preventDefault();

        inputCurrentPass_.current.type = "text"
        iconLockCurrentPass_.current.style.display = "none"
        iconUnlockCurrentPass_.current.style.display = "block"
        setIsLock1(false)
    }
    const handleUnlockNewPass = (e) => {
        e.preventDefault();
        iconLockNewPass_.current.style.display = "none"
        iconUnlockNewPass_.current.style.display = "block"
        inputNewPass_.current.type = "text"
        setIsLock2(false)
    }
    const handleUnlockConfirmPass = (e) => {
        e.preventDefault();
        iconLockConfirmPass_.current.style.display = "none"
        iconUnlockConfirmPass_.current.style.display = "block"
        inputConfirmPass_.current.type = "text"
        setIsLock3(false)
    }
    return (
        <>
            <div className={style.setting}>
                <div className={style.boxSetting}>
                    <nav>
                        <div className={style.tittleNav}>
                            Account
                            <br/>
                            Management
                        </div>
                        <ul className={style.list}>
                            <li onClick={() => scrolling(0)}>
                                <i className={stage === 0 ? style.active : ""}><FontAwesomeIcon icon={faUser}/></i>
                                <font>personal information</font>
                            </li>
                            <li onClick={() => scrolling(350)}>
                                <i className={stage === 1 ? style.active : ""}><FontAwesomeIcon icon={faKey}/></i>
                                <font>diy account sign-in</font>
                            </li>
                            <li onClick={() => scrolling(867)}>
                                <i className={stage === 2 ? style.active : ""}><FontAwesomeIcon icon={faShield}/></i>
                                <font>two-factor authentication</font>
                            </li>
                            <li onClick={() => scrolling(1126)}>
                                <i className={stage === 3 ? style.active : ""}><FontAwesomeIcon icon={faLock}/></i>
                                <font>login management</font>
                            </li>
                            <li onClick={() => scrolling(1558)}>
                                <i className={stage === 4 ? style.active : ""}><FontAwesomeIcon icon={faComments}/></i>
                                <font>communication preferences</font>
                            </li>
                        </ul>
                    </nav>
                    <div className={style.form}>
                        <div className={style.card}>
                            <div className={style.head}>
                                <div className={style.titleCard}>
                                    Personal Information
                                </div>
                                <div className={style.description}>
                                    This information is private and will not be shared with other players. Read
                                    the
                                    <font>
                                        DIY
                                    </font>
                                    Notice anytime!
                                </div>
                            </div>
                            <div className={style.tail}>
                                <div className={style.boxEmail}>
                                    <input type={"text"} id={"inputEmail"} name={"inputEmail"}
                                           value={email}
                                           onChange={handleChangeMail}/>
                                    <label htmlFor={"inputEmail"}>email</label>
                                </div>
                                <div className={style.boxInput}>
                                    <div className={style.boxCountry}>
                                        <input type={"text"} id={"inputCountry"} name={"inputCountry"}
                                               defaultValue={"VNM"}
                                               disabled={true}/>
                                        <label htmlFor={"inputCountry"}>country/region</label>
                                    </div>
                                    <div className={style.boxBirthday}>
                                        <div className={style.boxDate}>
                                            <input type={"password"} id={"inputDate"} name={"inputDate"}
                                                   style={{backgroundColor: ""}} maxLength={2} disabled={true}
                                                   defaultValue={infoUser[0]?.birthday.slice(8, 10)}/>
                                            <label htmlFor={"inputDate"}>Date</label>
                                        </div>
                                        <div className={style.boxMonth}>
                                            <input type={"password"} id={"inputMonth"} name={"inputMonth"}
                                                   style={{backgroundColor: ""}} maxLength={2} disabled={true}
                                                   defaultValue={infoUser[0]?.birthday.slice(5, 7)}/>
                                            <label htmlFor={"inputMonth"}>Month</label>
                                        </div>
                                        <div className={style.boxYear}>
                                            <input type={"text"} id={"inputYear"} name={"inputYear"}
                                                   style={{backgroundColor: ""}} maxLength={4} disabled={true}
                                                   defaultValue={infoUser[0]?.birthday.slice(0, 4)}/>
                                            <label htmlFor={"inputMonth"}>Year</label>
                                        </div>
                                    </div>
                                </div>
                                <div className={style.btn1}>
                                    {
                                        isChange && <button className={style.btnCancel}>cancel</button>
                                    }
                                    <button className={!rule1 || !rule2 ? style.no : style.yes}
                                            disabled={!rule1 || !rule2 ? true : false}>
                                        save and vertify
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className={style.card}>
                            <div className={style.head}>
                                <div className={style.titleCard}>
                                    DIY Account Sign-In
                                </div>
                                <div className={style.description}>
                                    We recommend that you periodically update your password to help prevent unauthorized
                                    access to your account.
                                </div>
                            </div>
                            <div className={style.tail}>
                                <div className={`${style.boxUsername} ${style.disable}`}>
                                    <input type={"text"} id={"inputUsername"} name={"inputUsername"}
                                           defaultValue={infoUser[0]?.username} disabled={true}/>
                                    <label htmlFor={"inputUsername"}>username</label>
                                </div>
                                <div className={style.boxInput1}>
                                    <div className={style.titleBoxInput1}>
                                        Change Password
                                    </div>
                                    <div className={style.boxCurrentPass}>
                                        <i className={style.lockCurrentPass} ref={iconLockCurrentPass_}
                                           onMouseDown={handleUnlockCurrentPass}>
                                            <FontAwesomeIcon icon={faEyeSlash}/>
                                        </i>
                                        <i className={style.unlockCurrentPass} ref={iconUnlockCurrentPass_}
                                           onMouseDown={handleLockCurrentPass}>
                                            <FontAwesomeIcon icon={faEye}/>
                                        </i>
                                        <input type={"password"} id={"inputCurrentPass"} name={"inputCurrentPass"}
                                               value={currentPass} ref={inputCurrentPass_}
                                               onChange={handleChangeCurrentPass}
                                               onFocus={handleFocusCurrentPass} onBlur={handleFocusOutCurrentPass}/>
                                        <label htmlFor={"inputCurrentPass"} ref={labelCurrentPass_}>
                                            Current Password
                                        </label>
                                    </div>
                                    <div className={style.boxNewPass}>
                                        <i className={style.lockPass} ref={iconLockNewPass_}
                                           onMouseDown={handleUnlockNewPass}>
                                            <FontAwesomeIcon icon={faEyeSlash}/>
                                        </i>
                                        <i className={style.unlockPass} ref={iconUnlockNewPass_}
                                           onMouseDown={handleLockNewPass}>
                                            <FontAwesomeIcon icon={faEye}/>
                                        </i>
                                        <input type={"password"} id={"inputNewPass"} name={"inputNewPass"}
                                               value={newPass} onChange={handleChangeNewPass} ref={inputNewPass_}
                                               onFocus={handleFocusNewPass} onBlur={handleFocusOutNewPass}/>
                                        <label htmlFor={"inputNewPass"} ref={labelNewPass_}>
                                            New Password
                                        </label>
                                    </div>
                                    {
                                        openCondition &&
                                        <ul className={style.condition}>
                                            <li>
                                                {
                                                    rule3 ? <i style={{color: "#3df177"}}>
                                                            <FontAwesomeIcon icon={faCircleCheck}/></i> :
                                                        <i><FontAwesomeIcon icon={faRectangleXmark}/></i>
                                                }
                                                <font style={rule3 ? {color: "#4c4c4c"} : {color: "#7e7e7e"}}>
                                                    Mật khẩu phải dài ít nhất 8 ký tự
                                                </font>
                                            </li>
                                            <li>
                                                {rule4 ? <i style={{color: "#3df177"}}><FontAwesomeIcon
                                                        icon={faCircleCheck}/></i> :
                                                    <i><FontAwesomeIcon icon={faRectangleXmark}/></i>}
                                                <font style={rule4 ? {color: "#4c4c4c"} : {color: "#7e7e7e"}}>
                                                    Mật khẩu chứa ít nhất 1 chữ cái hoặc số
                                                </font>
                                            </li>
                                        </ul>
                                    }
                                    <div className={style.boxConfirmNewPass}>
                                        <i className={style.lockConfirmPass} ref={iconLockConfirmPass_}
                                           onMouseDown={handleUnlockConfirmPass}>
                                            <FontAwesomeIcon icon={faEyeSlash}/>
                                        </i>
                                        <i className={style.unlockConfirmPass} ref={iconUnlockConfirmPass_}
                                           onMouseDown={handleLockConfirmPass}>
                                            <FontAwesomeIcon icon={faEye}/>
                                        </i>

                                        <input type={"password"} id={"inputConfirmNewPass"} name={"inputConfirmNewPass"}
                                               value={confirmPass} ref={inputConfirmPass_}
                                               onChange={handleChangeConfirmPass}
                                               onFocus={handleFocusConfirmPass} onBlur={handleFocusOutConfirmPass}/>
                                        <label htmlFor={"inputConfirmNewPass"} ref={labelConfirmPass_}>
                                            Confirm New Password
                                        </label>
                                    </div>
                                </div>
                                <div className={style.btn1}>
                                    {
                                        isChange1 && <button className={style.btnCancel}>cancel</button>
                                    }
                                    <button className={!rule3 || !rule4 || !rule5 || !rule6 ? style.no : style.yes}
                                            disabled={!rule3 || !rule4 || !rule5 || !rule6 ? true : false}>
                                        save and vertify
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className={style.card}>
                            <div className={style.head}>
                                <div className={style.titleCard}>
                                    Two-Factor Authentication
                                </div>
                                <div className={style.description}>
                                    Protect your account from unauthorized access by requiring a secure code when
                                    signing in.
                                    <br/><br/>
                                    Have questions? Learn more about <font>two-factor authentication.</font>
                                </div>
                            </div>
                            <div className={style.tail}>
                                <div className={style.protectAccount}>
                                    <div className={style.iconEmail}>
                                        <i><FontAwesomeIcon icon={faEnvelope}/></i>
                                    </div>
                                    <div style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        width: "90%"
                                    }}>
                                        <div className={style.statusProtect}>
                                            <font>Email</font>
                                            <font>Disable</font>
                                        </div>
                                        <div className={style.btnProtect}>
                                            <button>
                                                enable
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={style.card}>
                            <div className={style.head}>
                                <div className={style.titleCard}>
                                    Login Management
                                </div>
                                <div className={style.description}>
                                    Worried that your account or password has been compromised? You can forcibly log out
                                    from all Riot apps, sites, and games.
                                </div>
                            </div>
                            <div className={style.tail}>
                                <div className={style.btnLogOutEvr}>
                                    <button>log out everywhere</button>
                                </div>
                            </div>
                        </div>
                        <div className={style.card}>
                            <div className={style.head}>
                                <div className={style.titleCard}>
                                    Communication Preferences
                                </div>
                                <div className={style.description}></div>
                            </div>
                            <div className={style.tail}>
                                <div className={style.notification}>
                                    <input type={"checkbox"} id={"checkbox"} name={"checkbox"}/>
                                    <div className={style.boxTitleNtf}>
                                        <label htmlFor={"checkbox"}>Communication from Riot Games</label>
                                        <div>Receive news and updates from DIY. This can include special offers,
                                            beta invites, and news relating to the company.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={style.communicationPreferences}>
                            <div className={style.support}>
                                <font>
                                    Support
                                </font>
                            </div>
                            <div className={style.boxLogo}>
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
                                    <div className={style.nameWeb}>Do It<br/>Yourself</div>
                                </div>
                            </div>
                            <div className={style.review}>
                                <font>
                                    DIY, Inc. is a family of DIY lifestyle brands, spanning the home & garden, food,
                                    and fashion verticals, reaching tens of millions of people each month.
                                </font>
                            </div>
                            <div className={style.boxDiv}>
                                <div className={style.div1}>
                                    privacy notice
                                </div>
                                <div className={style.div2}>
                                    term of service
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}