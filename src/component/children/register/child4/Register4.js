import style from "./register4.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faArrowRight,
    faCircleCheck, faEye,
    faEyeSlash,
    faRectangleXmark
} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useRef, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import INFO_USER from "../../../../json default/json";

export default function Register4() {
    const location = useLocation()
    const navigate = useNavigate()
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [rule1, setRule1] = useState(false)
    const [rule2, setRule2] = useState(false)
    const [rule3, setRule3] = useState(false)

    const confirmPassword_ = useRef(null)
    const inputPassword_ = useRef(null)
    const inputConfirmPassword_ = useRef(null)
    const labelPassword_ = useRef(null)
    const labelConfirmPassword = useRef(null)
    const iconUnlockPass_ = useRef(null)
    const iconLockPass_ = useRef(null)
    const iconUnlockConfirmPass_ = useRef(null)
    const iconLockConfirmPass_ = useRef(null)

    useEffect(() => {
        let hasLetter = false;
        let hasNumber = false;

        if (password.length >= 8) {
            setRule1(true)
        } else {
            setRule1(false)
            setRule2(false)
        }

        for (let i = 0; i < password.length; i++) {
            if (password[i] >= '0' && password[i] <= '9') {
                hasNumber = true;
            } else if ((password[i] >= 'a' && password[i] <= 'z') || (password[i] >= 'A' && password[i] <= 'Z')) {
                hasLetter = true;
            }
            if (hasLetter && hasNumber) {
                setRule2(true)
            } else {
                setRule2(false)
            }
        }

        if (confirmPassword === password && password !== '') {
            setRule3(true)
            confirmPassword_.current.style.backgroundColor = "#e8e6e6"
            inputConfirmPassword_.current.style.outline = "2px solid black"
        }
        if (confirmPassword !== password) {
            setRule3(false)
            confirmPassword_.current.style.backgroundColor = "rgba(236,128,128,0.5)"
            inputConfirmPassword_.current.style.outline = "2px solid rgb(241,5,5)"
        }
    }, [password, confirmPassword])

    const handleFocusPass = () => {
        labelPassword_.current.style.top = "4px"
        labelPassword_.current.style.left = "8px"
        iconLockPass_.current.style.display = "block"
    }
    const handleFocusOutPass = () => {
        if (password === '') {
            labelPassword_.current.style.top = "20px"
            labelPassword_.current.style.left = "24px"
        } else {
            labelPassword_.current.style.top = "4px"
            labelPassword_.current.style.left = "8px"
        }
        iconLockPass_.current.style.display = "none"
    }
    const handleFocusConfirmPass = () => {
        labelConfirmPassword.current.style.top = "4px"
        labelConfirmPassword.current.style.left = "8px"
        iconLockConfirmPass_.current.style.display = "block"
        inputConfirmPassword_.current.style.outline = "2px solid #000000"
    }
    const handleFocusOutConFirmPass = () => {
        if (password === '') {
            labelConfirmPassword.current.style.top = "20px"
            labelConfirmPassword.current.style.left = "24px"
        } else {
            labelConfirmPassword.current.style.top = "4px"
            labelConfirmPassword.current.style.left = "8px"
        }
        iconLockConfirmPass_.current.style.display = "none"
        inputConfirmPassword_.current.style.outline = "2px solid transparent"
    }
    const handleUnlockPass = (e) => {
        e.preventDefault();
        iconLockPass_.current.style.display = "none"
        iconUnlockPass_.current.style.display = "block"
        inputPassword_.current.type = "text"
    }
    const handleLockPass = (e) => {
        e.preventDefault();
        iconLockPass_.current.style.display = "block"
        iconUnlockPass_.current.style.display = "none"
        inputPassword_.current.type = "password"
    }
    const handleUnlockConfirmPass = (e) => {
        e.preventDefault();
        iconLockConfirmPass_.current.style.display = "none"
        iconUnlockConfirmPass_.current.style.display = "block"
        inputConfirmPassword_.current.type = "text"
    }
    const handleLockConfirmPass = (e) => {
        e.preventDefault();
        iconLockConfirmPass_.current.style.display = "block"
        iconUnlockConfirmPass_.current.style.display = "none"
        inputConfirmPassword_.current.type = "password"
    }

    const infoUser = {
        email: location.state.email,
        username: location.state.username,
        password: confirmPassword,
        date: location.state.date,
        month: location.state.month,
        year: location.state.year
    }
    const handleSubmit = async (url, data) => {
        try {
            const res = await axios.post(url, data)
            if (res.data.msg === "register success") {
                navigate('/login')
            }
            INFO_USER.email = ""
            INFO_USER.date = ""
            INFO_USER.month = ""
            INFO_USER.year = ""
            INFO_USER.username = ""
            INFO_USER.password = ""
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <>
            <div className={style.form}>
                <div className={style.titleForm}>
                    Thiết lập mật khẩu
                </div>
                <div className={style.password}>
                    <i className={style.lockPass} ref={iconLockPass_} onMouseDown={handleUnlockPass}>
                        <FontAwesomeIcon icon={faEyeSlash}/>
                    </i>
                    <i className={style.unlockPass} ref={iconUnlockPass_} onMouseDown={handleLockPass}>
                        <FontAwesomeIcon icon={faEye}/>
                    </i>
                    <input type={"password"} id={"inputPassword"} ref={inputPassword_}
                           onFocus={handleFocusPass} onBlur={handleFocusOutPass}
                           onChange={e => setPassword(e.target.value)} value={password}/>
                    <label htmlFor={"inputPassword"} ref={labelPassword_}>
                        mật khẩu
                    </label>
                </div>
                <ul className={style.condition}>
                    <li>
                        {
                            rule1 ? <i style={{color: "#3df177"}}>
                                    <FontAwesomeIcon icon={faCircleCheck}/></i> :
                                <i><FontAwesomeIcon icon={faRectangleXmark}/></i>
                        }
                        <font style={rule1 ? {color: "#4c4c4c"} : {color: "#7e7e7e"}}>
                            Mật khẩu phải dài ít nhất 8 ký tự
                        </font>
                    </li>
                    <li>
                        {rule2 ? <i style={{color: "#3df177"}}><FontAwesomeIcon icon={faCircleCheck}/></i> :
                            <i><FontAwesomeIcon icon={faRectangleXmark}/></i>}
                        <font style={rule1 ? {color: "#4c4c4c"} : {color: "#7e7e7e"}}>
                            Mật khẩu chứa ít nhất 1 chữ cái hoặc số
                        </font>
                    </li>
                </ul>

                <div className={style.confirmPassword} ref={confirmPassword_}>
                    <i className={style.lockConfirmPass} ref={iconLockConfirmPass_}
                       onMouseDown={handleUnlockConfirmPass}>
                        <FontAwesomeIcon icon={faEyeSlash}/>
                    </i>
                    <i className={style.unlockConfirmPass} ref={iconUnlockConfirmPass_}
                       onMouseDown={handleLockConfirmPass}>
                        <FontAwesomeIcon icon={faEye}/>
                    </i>

                    <input type={"password"} id={"inputConfirmPassword"} ref={inputConfirmPassword_}
                           onFocus={handleFocusConfirmPass} onBlur={handleFocusOutConFirmPass}
                           onChange={e => setConfirmPassword(e.target.value)} value={confirmPassword}/>
                    <label htmlFor={"inputConfirmPassword"} ref={labelConfirmPassword}>
                        xác nhận mật khẩu
                    </label>
                </div>
                <div className={style.btn}>
                    <button className={!rule1 || !rule2 || !rule3 ? style.notActive : style.active}
                            disabled={!rule1 || !rule2 || !rule3 ? true : false}
                            onClick={() => handleSubmit('http://localhost:3001/registerAnAccount', infoUser)}>
                        <i>
                            <FontAwesomeIcon icon={faArrowRight}/>
                        </i>
                    </button>
                </div>
            </div>
        </>
    )
}