import style from "./defaultChild.module.css";
import {useNavigate} from "react-router-dom";

export default function DefaultChild() {
    const navigate = useNavigate()
    return (
        <>
            <div className={`${style.banner} wide`}>
                <div className={style.background1} style={{backgroundImage: 'url(background/background11.jpg)'}}></div>
                <div className={style.box}>
                    <div className={style.title}>
                        <div className={style.dashLineLeft}></div>
                        New DIY Projects
                        <div className={style.dashLineRight}></div>
                    </div>
                    <div className={style.posts}>
                        <div className={style.post}>
                            <img alt={"img"} onClick={() => navigate('/diy/decorate/post1')}
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
                        Browse new projects
                        <div className={style.dashLineRight}></div>
                    </div>
                    <div className={style.posts1}>
                        <div className={style.post}>
                            <img alt={"img"}
                                 src={"https://i.pinimg.com/originals/e9/10/85/e910855a2ef11963a05a263b0dec6344.jpg"}/>
                            <div className={style.content}>
                                <div className={style.description}>
                                    <font>
                                        Descriptionnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn
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
                                 src={"https://i.pinimg.com/originals/f1/1a/90/f11a903cafdf47ebee7f0e6966fa10c0.jpg"}/>
                            <div className={style.content}>
                                <div className={style.description}>
                                    <font>
                                        Descriptionnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn
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
                                 src={"https://i.pinimg.com/originals/d5/59/39/d55939d5d9671d8dde726a2804899662.jpg"}/>
                            <div className={style.content}>
                                <div className={style.description}>
                                    <font>
                                        Descriptionnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn
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
                                 src={"https://i.pinimg.com/originals/9e/8b/72/9e8b7243831d4511f7d8d2a5b8b9bdf0.jpg"}/>
                            <div className={style.content}>
                                <div className={style.description}>
                                    <font>
                                        Descriptionnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn
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
                                 src={"https://i.pinimg.com/originals/d4/55/70/d455701cde12416d65394475875a9244.jpg"}/>
                            <div className={style.content}>
                                <div className={style.description}>
                                    <font>
                                        Descriptionnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn
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
