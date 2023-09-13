import style from "./defaultChild.module.css";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

export default function DefaultChild() {
    const navigate = useNavigate()
    const [posts, setPosts] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3001/getPosts')
            .then(res => {
                setPosts(res.data.infoPosts)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    console.log(posts)
    return (
        <>
            {
                posts.length > 0 &&
                <div className={`${style.banner} wide`}>
                    <div className={style.background1}
                         style={{backgroundImage: 'url(background/background11.jpg)'}}></div>
                    <div className={style.box}>
                        <div className={style.title}>
                            <div className={style.dashLineLeft}></div>
                            new projects
                            <div className={style.dashLineRight}></div>
                        </div>
                        <div className={style.posts}>
                            {
                                posts.map((data, index) => (
                                    <div key={index} className={style.post}>
                                        <img alt={"img"}
                                             onClick={() => navigate(`/diy/decorate/${data.post.title_post}`, {state: {idPost: data.post.id_post}})}
                                             src={data.post.illustration_post}/>
                                        <div className={style.content}>
                                            <div className={style.description}>
                                                <font>
                                                    {data.post.title_post}
                                                </font>
                                            </div>
                                            <div className={style.viewPost}>
                                                Chi tiết
                                            </div>
                                            <div className={style.avatar} onClick={() => navigate('/member/norman')}>
                                                <img alt={"avatar"}
                                                     src={data.avatar}/>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            }
            <div className={`${style.banner} wide`}>
                <div className={style.background1} style={{backgroundImage: 'url(background/background11.jpg)'}}></div>
                <div className={style.box}>
                    <div className={style.title}>
                        <div className={style.dashLineLeft}></div>
                        popular projects
                        <div className={style.dashLineRight}></div>
                    </div>
                    <div className={style.posts}>
                        <div className={style.post}>
                            <img alt={"img"} onClick={() => navigate('/diy/decorate/post1', {state: {idPost: ""}})}
                                 src={"https://cdn-fastly.hometalk.com/media/2023/01/10/8674840/this-easy-mirror-wall-diy-hack-uses-cheap-mirrors-from-ikea.jpg?size=720x845&nocrop=1"}/>
                            <div className={style.content}>
                                <div className={style.description}>
                                    <font>
                                        This Easy Mirror Wall DIY Hack Uses Cheap Mirrors From IKEA
                                    </font>
                                </div>
                                <div className={style.viewPost}>
                                    Chi tiết
                                </div>
                                <div className={style.avatar} onClick={() => navigate('/member/norman')}>
                                    <img alt={"avatar"}
                                         src={"https://cdn-fastly.hometalk.com/media/profile/2020/10/28/49829403_1.jpg?size=91x91"}/>
                                </div>
                            </div>
                        </div>
                        <div className={style.post}>
                            <img alt={"img"}
                                 src={"https://cdn-fastly.hometalk.com/media/2022/08/08/8444824/upcycling-cans-using-wooden-slotted-peg-clothespins.jpg?size=350x220"}/>
                            <div className={style.content}>
                                <div className={style.description}>
                                    <font>
                                        UPCYCLING CANS USING WOODEN SLOTTED PEG CLOTHESPINS
                                    </font>
                                </div>
                                <div className={style.viewPost}>
                                    Chi tiết
                                </div>
                                <div className={style.avatar}>
                                    <img alt={"avatar"}
                                         src={"https://cdn-fastly.hometalk.com/media/profile/2021/11/17/54895017_1.jpg?size=50x50"}/>
                                </div>
                            </div>
                        </div>
                        {/*ảnh phải có kích thước to*/}
                        <div className={style.post}>
                            <img alt={"img"}
                                 src={"https://cdn-fastly.hometalk.com/media/2021/08/11/7637152/how-to-make-an-ombre-paper-flower-shadow-box-with-cricut.jpg?size=720x845&nocrop=1"}/>
                            <div className={style.content}>
                                <div className={style.description}>
                                    <font>
                                        How to Make an Ombre Paper Flower Shadow Box With Cricut
                                    </font>
                                </div>
                                <div className={style.viewPost}>
                                    Chi tiết
                                </div>
                                <div className={style.avatar}>
                                    <img alt={"avatar"}
                                         src={"https://cdn-fastly.hometalk.com/media/profile/2021/08/11/52014106_1.jpg?size=50x50"}/>
                                </div>
                            </div>
                        </div>
                        <div className={style.post}>
                            <img alt={"img"}
                                 src={"https://cdn-fastly.hometalk.com/media/2021/12/17/8077899/how-i-made-my-baseboard-heat-covers-look-brand-new.1.jpg?size=350x220"}/>
                            <div className={style.content}>
                                <div className={style.description}>
                                    <font>
                                        How I Made My Baseboard Heat Covers Look Brand New!
                                    </font>
                                </div>
                                <div className={style.viewPost}>
                                    Chi tiết
                                </div>
                                <div className={style.avatar}>
                                    <img alt={"avatar"}
                                         src={"https://cdn-fastly.hometalk.com/media/profile/2019/12/22/48542730_1.jpg?size=50x50"}/>
                                </div>
                            </div>
                        </div>
                        <div className={style.post}>
                            <img alt={"img"}
                                 src={"https://cdn-fastly.hometalk.com/media/2023/02/07/16321/diy-bench-made-from-a-door.jpg?size=720x845&nocrop=1"}/>
                            <div className={style.content}>
                                <div className={style.description}>
                                    <font>
                                        DIY Bench Made From A Door
                                    </font>
                                </div>
                                <div className={style.viewPost}>
                                    Chi tiết
                                </div>
                                <div className={style.avatar}>
                                    <img alt={"avatar"}
                                         src={"https://cdn-fastly.hometalk.com/media/profile/2022/10/24/185276_4.jpg?size=50x50"}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${style.banner1} wide`}>
                <div className={style.background2} style={{backgroundImage: 'url(background/background12.jpg)'}}></div>
                <div className={style.box}>
                    <div className={style.title}>
                        <div className={style.dashLineLeft}></div>
                        DIY Projects
                        <div className={style.dashLineRight}></div>
                    </div>
                    <div className={style.posts1}>
                        <div className={style.post}>
                            <img alt={"img"}
                                 src={"https://cdn-fastly.hometalk.com/media/2023/09/07/9087565/ornamentini.jpg?size=720x845&nocrop=1"}/>
                            <div className={style.content}>
                                <div className={style.description}>
                                    <font>
                                        How to Make Ornamentini Drinks That Will WOW Your Guests
                                    </font>
                                </div>
                                <div className={style.viewPost}>
                                    Chi tiết
                                </div>
                                <div className={style.avatar}>
                                    <img alt={"avatar"}
                                         src={"https://cdn-fastly.hometalk.com/media/profile/2021/10/24/51225826_1.jpg?size=91x91"}/>
                                </div>
                            </div>
                        </div>
                        <div className={style.post}>
                            <img alt={"img"}
                                 src={"https://cdn-fastly.hometalk.com/media/2023/09/05/09571/diy-fall-pumpkin-decor.jpg?size=720x845&nocrop=1"}/>
                            <div className={style.content}>
                                <div className={style.description}>
                                    <font>
                                        How to Make Cute DIY Fall Pumpkin Decor in a Few Easy Steps
                                    </font>
                                </div>
                                <div className={style.viewPost}>
                                    Chi tiết
                                </div>
                                <div className={style.avatar}>
                                    <img alt={"avatar"}
                                         src={"https://cdn-fastly.hometalk.com/media/profile/2023/06/14/84166996_4.jpg?size=91x91"}/>
                                </div>
                            </div>
                        </div>
                        <div className={style.post}>
                            <img alt={"img"}
                                 src={"https://cdn-fastly.hometalk.com/media/2023/09/06/9085936/makeover-diy-mirror-frame.jpg?size=720x845&nocrop=1"}/>
                            <div className={style.content}>
                                <div className={style.description}>
                                    <font>
                                        Old Mirror Makeover: How to Upgrade a DIY Mirror Frame
                                    </font>
                                </div>
                                <div className={style.viewPost}>
                                    Chi tiết
                                </div>
                                <div className={style.avatar}>
                                    <img alt={"avatar"}
                                         src={"https://cdn-fastly.hometalk.com/resources/imgs-responsive/avatar-letters/avatar-H-69E0FF.png?size=91x91"}/>
                                </div>
                            </div>
                        </div>
                        <div className={style.post}>
                            <img alt={"img"}
                                 src={"https://cdn-fastly.hometalk.com/media/2023/09/01/05551/diy-picture-ledge.jpg?size=720x845&nocrop=1"}/>
                            <div className={style.content}>
                                <div className={style.description}>
                                    <font>
                                        How to Build a DIY Picture Ledge in a Few Simple Steps
                                    </font>
                                </div>
                                <div className={style.viewPost}>
                                    Chi tiết
                                </div>
                                <div className={style.avatar}>
                                    <img alt={"avatar"}
                                         src={"https://i.pinimg.com/originals/54/42/d7/5442d7cbe6c5da8c1cf63b1648033304.jpg"}/>
                                </div>
                            </div>
                        </div>
                        <div className={style.post}>
                            <img alt={"img"}
                                 src={"https://cdn-fastly.hometalk.com/media/2020/10/23/6391261/upcycled-book-halloween-jacks.jpg?size=720x845&nocrop=1"}/>
                            <div className={style.content}>
                                <div className={style.description}>
                                    <font>
                                        Upcycled Book Halloween Jacks
                                    </font>
                                </div>
                                <div className={style.viewPost}>
                                    Chi tiết
                                </div>
                                <div className={style.avatar}>
                                    <img alt={"avatar"}
                                         src={"https://i.pinimg.com/originals/54/42/d7/5442d7cbe6c5da8c1cf63b1648033304.jpg"}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
