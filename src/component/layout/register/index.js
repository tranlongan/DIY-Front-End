import style from './register.module.css'
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import INFO_USER from "../../../json default/json";

export default function Register({children}) {
    const location = useLocation()
    const [stage, setStage] = useState(0)
    const navigate = useNavigate()
    useEffect(() => {
        window.scrollTo(0, 0)
    })
    console.log(INFO_USER)
    useEffect(() => {
        switch (location.state.step) {
            case 1:
                setStage(1)
                break
            case 2:
                setStage(2)
                break
            case 3:
                setStage(3)
                break
            case 4:
                setStage(4)
                break
            default:
                return
        }
    }, [location.state])
    return (
        <>
            <div className={style.register}>
                <div className={style.background} style={{backgroundImage: `url(/background/making.jpg)`}}></div>
                <div className={style.boxRegister}>
                    <div className={style.titleRegister}>tạo 1 tài khoản</div>
                    <div className={style.boxLogo}>
                        <div className={style.box} onClick={() => navigate('/')}>
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
                        </div>
                    </div>
                    <div className={style.pagination}>
                        <ul className={style.boxPagination}>
                            <li className={stage === 1 ? `${style.paginationStage} ${style.active}` : style.paginationStage}></li>
                            <li className={stage === 2 ? `${style.paginationStage} ${style.active}` : style.paginationStage}></li>
                            <li className={stage === 3 ? `${style.paginationStage} ${style.active}` : style.paginationStage}></li>
                            <li className={stage === 4 ? `${style.paginationStage} ${style.active}` : style.paginationStage}></li>
                        </ul>
                    </div>
                    {children}
                    <ul className={style.footer}>
                        <li className={style.item}>Hỗ trợ</li>
                        <li className={style.item}>Chính sách quyền riêng tư</li>
                        <li className={style.item}>Điều khoản sử dụng</li>
                        <li className={style.item}>Tùy chọn cookie</li>
                    </ul>
                </div>
            </div>
        </>
    )
}