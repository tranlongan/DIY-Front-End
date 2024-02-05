import style from './homeChild.module.css'
import {useEffect, useState} from "react";
import axios from "axios";

export default function HomeChild() {
    const [total, setTotal] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:3001/admin/getTotal`)
            .then(res => {
                setTotal(res.data.total)
            })
    }, [])
    return (
        <>
            <h1>Home</h1>
            <div className={"grip"}>
                <div className={"row"}>
                    <div className={"col col-5"}>Review</div>
                    <div className={"col col-7"}>
                        <div className={style.listCard}>
                            <div className={style.card}>
                                <div className={style.head}>
                                    <div className={style.title}>
                                        <img alt={"icon"} src={"/png/iconUser1.png"}/>
                                        <div>Accounts</div>
                                    </div>
                                </div>
                                <div className={style.tail}>
                                    {total[0]?.totalAccounts}
                                </div>
                            </div>
                            <div className={style.card}>
                                <div className={style.head}>
                                    <div className={style.title}>
                                        <img alt={"icon"} src={"/png/iconPost.png"}/>
                                        <div>Posts</div>
                                    </div>
                                </div>
                                <div className={style.tail}>
                                    {total[0]?.totalPosts}
                                </div>
                            </div>
                            <div className={style.card}>
                                <div className={style.head}>
                                    <div className={style.title}>
                                        <img alt={"icon"} src={"/png/iconProject.png"}/>
                                        <div>Projects</div>
                                    </div>
                                </div>
                                <div className={style.tail}>
                                    {total[0]?.totalProjects}
                                </div>
                            </div>
                            <div className={style.card}>
                                <div className={style.head}>
                                    <div className={style.title}>
                                        <img alt={"icon"} src={"/png/iconCategory.png"}/>
                                        <div>Categories</div>
                                    </div>
                                </div>
                                <div className={style.tail}>
                                    {total[0]?.totalCategories}
                                </div>
                            </div>
                        </div>
                        <div className={style.listCard1}>
                            <div className={style.item}>
                                <div className={style.boxItem}>
                                    <div className={style.title1}>Chart</div>
                                    <div className={style.title2}>
                                        <font>
                                            Graph representing user rankings
                                        </font>
                                        <div>
                                            <button>View</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={style.item}>
                                <div className={style.boxItem}>
                                    <div className={style.title1}>Chart</div>
                                    <div className={style.title2}>
                                        <font>The chart represents the number of posts by week</font>
                                        <div>
                                            <button>View</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}