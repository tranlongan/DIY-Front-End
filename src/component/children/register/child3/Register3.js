import style from "./register3.module.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useRef, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import INFO_USER from "../../../../json default/json";

export default function Register3() {
    const navigate = useNavigate()
    const location = useLocation()
    const [username, setUsername] = useState('')
    const [rule1, setRule1] = useState(false)
    const [isClick, setIsClick] = useState(false)
    const inputUsername_ = useRef(null)
    const labelUsername_ = useRef(null)

    const handleFocusUsername = () => {
        labelUsername_.current.style.top = "4px"
        labelUsername_.current.style.left = "8px"
    }
    const handleFocusOutUsername = () => {
        if (username === '') {
            labelUsername_.current.style.top = "20px"
            labelUsername_.current.style.left = "24px"
        } else {
            labelUsername_.current.style.top = "4px"
            labelUsername_.current.style.left = "8px"
        }
    }
    const handleChangeUsername = (e) => {
        setIsClick(true)
        setUsername(e.target.value)
        if (e.target.value.length >= 4 && /^[A-Za-z\d]+$/.test(e.target.value)) {
            setRule1(true);
        } else {
            setRule1(false);
        }
    }
    const handleNextStep = () => {
        navigate('/register/password', {
            state: {
                step: 4,
                email: location.state.email,
                date: location.state.date,
                month: location.state.month,
                year: location.state.year,
                username: username
            }
        })
        INFO_USER.username = username
    }

    useEffect(() => {
        if (INFO_USER.username !== "") {
            labelUsername_.current.style.top = "4px"
            labelUsername_.current.style.left = "8px"
            setUsername(INFO_USER.username)
        }
    }, [])
    return (
        <>
            <div className={style.form}>
                <div className={style.titleForm}>
                    Chọn tên người dùng
                </div>
                <div
                    className={isClick && !rule1 ? `${style.username} ${style.err}` : `${style.username} ${style.notErr}`}>
                    <input type={"text"} id={"inputUsername"} ref={inputUsername_}
                           onFocus={handleFocusUsername} onBlur={handleFocusOutUsername}
                           onChange={handleChangeUsername} value={username}/>
                    <label htmlFor={"inputUsername"} ref={labelUsername_}>
                        tên người dùng
                    </label>
                </div>
                <div className={style.btn}>
                    <button className={!rule1 ? style.notActive : style.active}
                            disabled={!rule1 ? true : false}
                            onClick={handleNextStep}>
                        <i>
                            <FontAwesomeIcon icon={faArrowRight}/>
                        </i>
                    </button>
                </div>
            </div>
        </>
    )
}