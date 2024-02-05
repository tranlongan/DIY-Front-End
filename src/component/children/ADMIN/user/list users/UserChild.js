import style from './userChild.module.css'
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function UserChild() {
    const navigate = useNavigate()
    const [users, setUsers] = useState([])
    const [searchContent, setSearchContent] = useState('')
    useEffect(() => {
        axios.get(`http://localhost:3001/admin/getUser`)
            .then(res => {
                setUsers(res.data.users)
            }).catch(err => console.log(err))
    }, [])

    const handleView = (username, idUser) => {
        navigate(`/admin/user/${username}`, {state: {idUser: idUser}})
    }

    const handleSearch = (e) => {
        setSearchContent(e.target.value)
    }
    const results = !searchContent
        ? users
        : users.filter(user =>
            user.username.toLowerCase().includes(searchContent.toLocaleLowerCase())
        );


    return (
        <>
            <div className={style.container}>
                <div>
                    <h1>Total number of users : {results.length}</h1>
                </div>
                <div className={style.search}>
                    <input type={"text"} placeholder={"Enter username"} value={searchContent} onChange={handleSearch}/>
                </div>
                <div className={style.listCard}>
                    {
                        results?.map((data, index) => (
                            <div key={index} className={style.card}>
                                <div className={style.boxAvatar}>
                                    <img alt={"img"} src={data.avatar}/>
                                </div>
                                <div className={style.boxInfo}>
                                    <div className={style.nameUser}>{data.username}</div>
                                    <button onClick={() => handleView(data.username, data.id_account)}>Xem</button>
                                </div>
                            </div>
                        ))
                    }

                </div>
            </div>
        </>
    )
}