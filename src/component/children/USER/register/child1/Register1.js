import style from "./register1.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import INFO_USER from "../../../../../json default/json";

export default function Register1() {
    const navigate = useNavigate()
    const [checkClick, setCheckClick] = useState(false)
    // trước dấu @ thì chuỗi phải dài hơn hoặc bằng 6 ký tự
    const [rule1, setRule1] = useState(false)
    // phải kết thúc bằng '@gmail.com'
    const [rule2, setRule2] = useState(false)
    const [email, setEmail] = useState("")
    const labelEmail_ = useRef(null)
    const handleFocusUsername = () => {
        labelEmail_.current.style.top = "4px"
        labelEmail_.current.style.left = "8px"
    }
    const handleFocusOutUsername = () => {
        if (email === '') {
            labelEmail_.current.style.top = "20px"
            labelEmail_.current.style.left = "24px"
        } else {
            labelEmail_.current.style.top = "4px"
            labelEmail_.current.style.left = "8px"
        }
    }
    const handleCheckEmail = (e) => {
        setCheckClick(true)
        setEmail(e.target.value)
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
    useEffect(() => {
       if (INFO_USER.email !== ""){
           setEmail(INFO_USER.email)
           labelEmail_.current.style.top = "4px"
           labelEmail_.current.style.left = "8px"
       }
    },[])
    return (
        <>
            <div className={style.form}>
                <div className={style.titleForm}>
                    What's your email?
                </div>
                <div className={style.email}>
                    <input type={"email"} id={"inputEmail"} name={"inputEmail"}
                           value={email}
                           onChange={handleCheckEmail}
                           className={(checkClick) && (!rule1 || !rule2) ? style.err : style.notErr}
                           onFocus={handleFocusUsername} onBlur={handleFocusOutUsername}/>
                    <label htmlFor={"inputEmail"} className={style.temp} ref={labelEmail_}>email</label>
                </div>
                <div className={style.btn}>
                    <button className={!rule1 || !rule2 ? style.notActive : style.active}
                            disabled={!rule1 || !rule2 ? true : false}
                            onClick={() => {
                                navigate('/register/birthDay', {state: {step: 2, email: email}})
                                INFO_USER.email = email
                            }}>
                        <i>
                            <FontAwesomeIcon icon={faArrowRight}/>
                        </i>
                    </button>
                </div>
                <div className={style.hasAccount}>
                    <font>Already have an account?</font>
                </div>
            </div>
        </>
    )
}