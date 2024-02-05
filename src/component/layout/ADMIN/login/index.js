import style from './login.module.css'
import '../../../../css default/base.css'
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function AdminLogin() {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async () => {
        try {
            const err = document.getElementById("err")
            if (username.length <= 0 || password.length <= 0) {
                return
            } else {
                const res = await axios.post(`http://localhost:3001/admin/login`, {
                    username: username,
                    password: password
                })

                if (res.data.msg === 'login success') {
                    const profile = {
                        id_account: res.data.profile[0]?.id_admin,
                        username: res.data.profile[0]?.username
                    }
                    navigate('/admin', {replace: true})
                    navigate(0)
                    localStorage.setItem('sessionProfile1', JSON.stringify(profile));
                } else {
                    err.style.display = "block"
                }
            }

        } catch (e) {
            console.log(e)
        }
    }
    return (
        <>
            <div className={style.adminLogin}>
                <div className={style.card}>
                    <div className={style.titleCard}>Admin login</div>
                    <div>
                        <input className={"input-outline"} type={"text"} placeholder={"Username"}
                               value={username} onChange={e => setUsername(e.target.value)}/>
                        <input className={"input-outline"} type={"password"} placeholder={"Password"}
                               value={password} onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <div className={style.err} id={"err"}>
                        Account or password is incorrect
                    </div>
                    <div className={style.boxBtnLogin}>
                        <button onClick={handleLogin}>
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}