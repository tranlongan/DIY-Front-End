import style from "./register2.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useRef, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import INFO_USER from "../../../../../json default/json";

export default function Register2() {
    const navigate = useNavigate()
    const location = useLocation()
    const birthDay_ = useRef(null)
    const inputDate_ = useRef(null)
    const inputMonth_ = useRef(null)
    const inputYear_ = useRef(null)
    const labelDate_ = useRef(null)
    const labelMonth_ = useRef(null)
    const labelYear_ = useRef(null)

    const [date, setDate] = useState('')
    const [month, setMonth] = useState('')
    const [year, setYear] = useState('')
    const [ruleDate, setRuleDate] = useState(false)
    const [ruleMonth, setRuleMonth] = useState(false)
    const [ruleYear, setRuleYear] = useState(false)
    const [isClick, setIsClick] = useState(false)
    const [isClickDate, setIsClickDate] = useState(false)
    const [isClickMonth, setIsClickMonth] = useState(false)
    const [isClickYear, setIsClickYear] = useState(false)
    const [isNull, setIsNull] = useState(true)

    useEffect(() => {
        document.addEventListener('click', (e) => {
            let yes = e.target
            do {
                if (yes === birthDay_.current) {
                    if (!isClick) {
                        birthDay_.current.style.border = "2px solid black"
                    }
                    if (INFO_USER.date !== "" && INFO_USER.month !== "" && INFO_USER.year !==""){
                        setRuleDate(true)
                        setRuleMonth(true)
                        setRuleYear(true)
                    }
                    // else {
                    //     birthDay_.current.style.border = "2px solid rgb(218, 32, 180)"
                    // }
                    return
                }
                yes = yes?.parentNode
            } while (yes);
            birthDay_.current ? birthDay_.current.style.border = "2px solid transparent" : e.preventDefault();
        })
        if (date !== "" || month !== "" || year !== "") {
            setIsNull(false)
        } else {
            setIsNull(true)
        }
    }, [date, month, year, isClick])
    const handleFocusDate = () => {
        labelDate_.current.style.top = "4px"
        labelDate_.current.style.left = "8px"
    }
    const handleFocusMonth = () => {
        labelMonth_.current.style.top = "4px"
        labelMonth_.current.style.left = "8px"
    }
    const handleFocusYear = () => {
        labelYear_.current.style.top = "4px"
        labelYear_.current.style.left = "8px"
    }
    const handleFocusOutDate = () => {
        if (date === '') {
            labelDate_.current.style.top = "20px"
            labelDate_.current.style.left = "24px"
        } else {
            labelDate_.current.style.top = "4px"
            labelDate_.current.style.left = "8px"
        }
    }
    const handleFocusOutMonth = () => {
        if (month === '') {
            labelMonth_.current.style.top = "20px"
            labelMonth_.current.style.left = "24px"
        } else {
            labelMonth_.current.style.top = "4px"
            labelMonth_.current.style.left = "8px"
        }
    }
    const handleFocusOutYear = () => {
        if (year === '') {
            labelYear_.current.style.top = "20px"
            labelYear_.current.style.left = "24px"
        } else {
            labelYear_.current.style.top = "4px"
            labelYear_.current.style.left = "8px"
        }
    }
    const isNumber = (number) => {
        if (isNaN(number)) {
            return false
        } else {
            return true
        }
    }
    const handleChangeDate = (e) => {
        setIsClick(true)
        setIsClickDate(true)
        if (isNumber(e.target.value)) {
            setDate(e.target.value)
            if (parseInt(e.target.value) > 31) {
                setRuleDate(false)
            } else {
                switch (parseInt(month)) {
                    case 1:
                        parseInt(e.target.value) > 31 ? setRuleDate(false) : setRuleDate(true)
                        break
                    case 2:
                        (parseInt(year) % 4 === 0) && (parseInt(year) % 100 !== 0) ? (parseInt(e.target.value) > 29 ? setRuleDate(false) : setRuleDate(true)) : (parseInt(e.target.value) > 28 ? setRuleDate(false) : setRuleDate(true))
                        break
                    case 3:
                        parseInt(e.target.value) > 31 ? setRuleDate(false) : setRuleDate(true)
                        break
                    case 4:
                        parseInt(e.target.value) > 30 ? setRuleDate(false) : setRuleDate(true)
                        break
                    case 5:
                        parseInt(e.target.value) > 31 ? setRuleDate(false) : setRuleDate(true)
                        break
                    case 6:
                        parseInt(e.target.value) > 30 ? setRuleDate(false) : setRuleDate(true)
                        break
                    case 7:
                        parseInt(e.target.value) > 31 ? setRuleDate(false) : setRuleDate(true)
                        break
                    case 8:
                        parseInt(e.target.value) > 31 ? setRuleDate(false) : setRuleDate(true)
                        break
                    case 9:
                        parseInt(e.target.value) > 30 ? setRuleDate(false) : setRuleDate(true)
                        break
                    case 10:
                        parseInt(e.target.value) > 31 ? setRuleDate(false) : setRuleDate(true)
                        break
                    case 11:
                        parseInt(e.target.value) > 30 ? setRuleDate(false) : setRuleDate(true)
                        break
                    case 12:
                        parseInt(e.target.value) > 31 ? setRuleDate(false) : setRuleDate(true)
                        break
                    default:
                        console.log('chưa nhập tháng')
                        setRuleDate(true)
                        break
                }
            }
        } else {
            e.preventDefault()
        }
    }
    const handleChangeMonth = (e) => {
        setIsClick(true)
        setIsClickMonth(true)
        if (isNumber(e.target.value)) {
            setMonth(e.target.value)
            if (parseInt(e.target.value) > 12) {
                setRuleMonth(false)
            } else {
                setRuleMonth(true)
                switch (parseInt(e.target.value)) {
                    case 1:
                        parseInt(date) > 31 ? setRuleDate(false) : setRuleDate(true)
                        break
                    case 2:
                        (parseInt(year) % 4 === 0) && (parseInt(year) % 100 !== 0) ? (parseInt(date) > 29 ? setRuleDate(false) : setRuleDate(true)) : ((parseInt(date) > 28 ? setRuleDate(false) : setRuleDate(true)))
                        break
                    case 3:
                        parseInt(date) > 31 ? setRuleDate(false) : setRuleDate(true)
                        break
                    case 4:
                        parseInt(date) > 30 ? setRuleDate(false) : setRuleDate(true)
                        break
                    case 5:
                        parseInt(date) > 31 ? setRuleDate(false) : setRuleDate(true)
                        break
                    case 6:
                        parseInt(date) > 30 ? setRuleDate(false) : setRuleDate(true)
                        break
                    case 7:
                        parseInt(date) > 31 ? setRuleDate(false) : setRuleDate(true)
                        break
                    case 8:
                        parseInt(date) > 31 ? setRuleDate(false) : setRuleDate(true)
                        break
                    case 9:
                        parseInt(date) > 30 ? setRuleDate(false) : setRuleDate(true)
                        break
                    case 10:
                        parseInt(date) > 31 ? setRuleDate(false) : setRuleDate(true)
                        break
                    case 11:
                        parseInt(date) > 30 ? setRuleDate(false) : setRuleDate(true)
                        break
                    case 12:
                        parseInt(date) > 31 ? setRuleDate(false) : setRuleDate(true)
                        break
                    default:
                        console.log('chưa nhập ngày')
                        break
                }
            }
        } else {
            e.preventDefault()
        }
    }
    const handleChangeYear = (e) => {
        setIsClick(true)
        setIsClickYear(true)
        if (isNumber(e.target.value)) {
            setYear(e.target.value)
            if (parseInt(e.target.value) < 1900 || parseInt(e.target.value) > 2023) {
                setRuleYear(false)
            } else {
                setRuleYear(true)
                if (parseInt(e.target.value) % 4 === 0 && parseInt(e.target.value) % 100 !== 0) {
                    switch (parseInt(month)) {
                        case 2:
                            parseInt(date) > 29 ? setRuleDate(false) : setRuleDate(true)
                            break
                        default:
                            break
                    }
                } else {
                    switch (parseInt(month)) {
                        case 2:
                            parseInt(date) > 28 ? setRuleDate(false) : setRuleDate(true)
                            break
                        default:
                            break
                    }
                }
            }
        } else {
            e.preventDefault()
        }
    }
    const handleNextStep = (e) => {
        navigate('/register/username', {
            state: {
                step: 3,
                email: location.state.email,
                date: date,
                month: month,
                year: year
            }
        })
        INFO_USER.date = date
        INFO_USER.month = month
        INFO_USER.year = year
    }
    useEffect(() => {
        if (INFO_USER.date !== "") {
            setDate(INFO_USER.date)
            labelDate_.current.style.top = "4px"
            labelDate_.current.style.left = "8px"
        }
        if (INFO_USER.month !== "") {
            setMonth(INFO_USER.month)
            labelMonth_.current.style.top = "4px"
            labelMonth_.current.style.left = "8px"
        }
        if (INFO_USER.year !== "") {
            setYear(INFO_USER.year)
            labelYear_.current.style.top = "4px"
            labelYear_.current.style.left = "8px"
        }
    }, [])
    return (<>
        <div className={style.form}>
            <div className={style.titleForm}>
                Ngày sinh của bạn?
            </div>

            <div
                className={isClick && (!ruleDate || !ruleMonth || !ruleYear) ? `${style.birthDay} ${style.err}` : `${style.birthDay} ${style.notErr}`}
                ref={birthDay_}>
                <div className={style.date}>
                    <input type={"text"} id={"inputDate"} ref={inputDate_} style={{backgroundColor: ""}}
                           value={date} maxLength={2}
                           onFocus={handleFocusDate} onBlur={handleFocusOutDate} onChange={handleChangeDate}/>
                    <label className={isClickDate && !ruleDate ? style.err : ""} htmlFor={"inputDate"}
                           ref={labelDate_}>Ngày</label>
                </div>
                <div className={style.month}>
                    <input type={"text"} id={"inputMonth"} ref={inputMonth_} value={month} maxLength={2}
                           onFocus={handleFocusMonth} onBlur={handleFocusOutMonth} onChange={handleChangeMonth}/>
                    <label className={isClickMonth && !ruleMonth ? style.err : ""} htmlFor={"inputMonth"}
                           ref={labelMonth_}>Tháng</label>
                </div>
                <div className={style.year}>
                    <input type={"text"} id={"inputYear"} ref={inputYear_} value={year} maxLength={4}
                           onFocus={handleFocusYear} onBlur={handleFocusOutYear} onChange={handleChangeYear}/>
                    <label className={isClickYear && !ruleYear ? style.err : ""} htmlFor={"inputYear"}
                           ref={labelYear_}>Năm</label>
                </div>
            </div>

            <div className={style.btn}>
                <button className={!isNull && ruleDate && ruleMonth && ruleYear ? style.active : style.notActive}
                        disabled={!ruleDate || !ruleMonth || !ruleYear ? true : false}
                        onClick={handleNextStep}>
                    <i>
                        <FontAwesomeIcon icon={faArrowRight}/>
                    </i>
                </button>
            </div>
        </div>
    </>)
}