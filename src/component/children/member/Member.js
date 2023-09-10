import style from './member.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faChevronRight,
    faGraduationCap,
    faHouseFlag,
    faLocationDot,
    faUserPlus
} from "@fortawesome/free-solid-svg-icons";
import Paging from "../../default/paging/Paging";

export default function Member() {
    return (
        <>
            <div className={style.member}>
                <div className={style.navigationBar}>
                    <div className={style.navList1}>
                        <div className={style.link}>
                            <div className={style.logo}>
                                DIY
                            </div>
                            <i><FontAwesomeIcon icon={faChevronRight}/></i>
                            <div className={style.nameMember}>Norman</div>
                        </div>
                        <ul className={style.navList2}>
                            {/*<li className={style.navItem}></li>*/}
                        </ul>
                    </div>
                </div>
                <div className={style.background}
                     style={{backgroundImage: `url(/sliderImage/img1.jpg)`}}></div>
                <div className={style.memberTitle}>
                    <div className={style.backgroundTitle}></div>
                    <div className={style.top}>
                        norman
                    </div>
                    <div className={style.bottom}>
                        <img alt={"line"} src={"https://universe.leagueoflegends.com/images/t1HeaderDivider.png"}/>
                    </div>
                    <div className={style.descriptionTitle}>
                        Có lẽ t nên viết gì đó ở đây?
                    </div>
                </div>
                <div className={"grip"}>
                    <div className={style.container}>
                        <div className={style.banner}>
                            <div className={style.item}>
                                <div className={style.introTitle}>
                                    <font>giới thiệu</font>
                                </div>
                                <div className={style.introduceYourselfInDetail}>
                                    <div className={style.itemInf}>
                                        <i><FontAwesomeIcon icon={faGraduationCap}/></i>
                                        <font>Đã từng học ở..........</font>
                                    </div>
                                    <div className={style.itemInf}>
                                        <i><FontAwesomeIcon icon={faHouseFlag}/></i>
                                        <font>Sống tại..........</font>
                                    </div>
                                    <div className={style.itemInf}>
                                        <i><FontAwesomeIcon icon={faLocationDot}/></i>
                                        <font>Đến từ..........</font>
                                    </div>
                                </div>
                            </div>
                            <div className={style.item}>
                                <div className={style.avatar}>
                                    <img alt={"avatar"}
                                         src={"https://i.pinimg.com/564x/c2/8f/4e/c28f4ef1e7fc374ee893af320d7ce755.jpg"}/>
                                </div>
                                <div className={style.introduceYourself}>
                                    Đây là phần tự giới thiệu bản thân, đây là phần sẽ giúp cho người khác hiểu về bản
                                    thân của mình
                                </div>
                                <div className={style.signature}>Norman</div>
                            </div>
                            <div className={style.item}>
                                <div className={style.follow}>
                                    <i><FontAwesomeIcon icon={faUserPlus}/></i>
                                </div>
                                <div className={style.followers}>
                                    110k
                                </div>
                            </div>
                            <div className={style.item}>4</div>
                            <div className={style.item}>
                                <div className={style.backgroundStore}
                                     style={{backgroundImage: 'url(/background/696.jpg)'}}></div>
                                <div className={style.infStore}>
                                    Tài khoản này chưa đăng ký cửa hàng, người anh em hãy thông cảm.
                                </div>
                                <div className={style.viewStore}>
                                    <button>View</button>
                                </div>
                            </div>
                        </div>
                        <div className={style.title}>
                            <div className={style.dashLineLeft}></div>
                            BÀI VIẾT
                            <div className={style.dashLineRight}></div>
                        </div>
                        <div className={style.posts}>
                            <div className={style.post}>
                                <img alt={"imgPost"}
                                     src={"https://cdn-fastly.hometalk.com/media/2015/06/16/2890133/here-are-10-gorgeous-designer-tricks-for-your-dollar-store-pots.jpg?size=720x845&nocrop=1"}/>
                                <div className={style.content}>
                                    <div className={style.titlePost}>
                                        <font>
                                            Here Are 10 Gorgeous Designer Tricks for Your Dollar Store Pots
                                        </font>
                                    </div>
                                    <div className={style.infPost}>
                                        <img alt={"avatar"}
                                             src={"https://i.pinimg.com/originals/c2/8f/4e/c28f4ef1e7fc374ee893af320d7ce755.jpg"}/>
                                        <font>Norman</font>
                                    </div>
                                </div>
                            </div>
                            <div className={style.post}>
                                <img alt={"imgPost"}
                                     src={"https://cdn-fastly.hometalk.com/media/2020/02/09/6047296/diy-abstract-art-plate-wall.1.jpg?size=720x845&nocrop=1"}/>
                                <div className={style.content}>
                                    <div className={style.titlePost}>
                                        <font>
                                            DIY Abstract Art Plate Wall
                                        </font>
                                    </div>
                                    <div className={style.infPost}>
                                        <img alt={"avatar"}
                                             src={"https://i.pinimg.com/originals/c2/8f/4e/c28f4ef1e7fc374ee893af320d7ce755.jpg"}/>
                                        <font>Norman</font>
                                    </div>
                                </div>
                            </div>
                            <div className={style.post}>
                                <img alt={"imgPost"}
                                     src={"https://cdn-fastly.hometalk.com/media/2023/01/10/8674840/this-easy-mirror-wall-diy-hack-uses-cheap-mirrors-from-ikea.jpg?size=720x845&nocrop=1"}/>
                                <div className={style.content}>
                                    <div className={style.titlePost}>
                                        <font>
                                            This Easy Mirror Wall DIY Hack Uses Cheap Mirrors From IKEA
                                        </font>
                                    </div>
                                    <div className={style.infPost}>
                                        <img alt={"avatar"}
                                             src={"https://i.pinimg.com/originals/c2/8f/4e/c28f4ef1e7fc374ee893af320d7ce755.jpg"}/>
                                        <font>Norman</font>
                                    </div>
                                </div>
                            </div>
                            <div className={style.post}>
                                <img alt={"imgPost"}
                                     src={"https://cdn-fastly.hometalk.com/media/2023/01/10/8674840/this-easy-mirror-wall-diy-hack-uses-cheap-mirrors-from-ikea.jpg?size=720x845&nocrop=1"}/>
                                <div className={style.content}>
                                    <div className={style.titlePost}>
                                        <font>
                                            This Easy Mirror Wall DIY Hack Uses Cheap Mirrors From IKEA
                                        </font>
                                    </div>
                                    <div className={style.infPost}>
                                        <img alt={"avatar"}
                                             src={"https://i.pinimg.com/originals/c2/8f/4e/c28f4ef1e7fc374ee893af320d7ce755.jpg"}/>
                                        <font>Norman</font>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Paging/>
                    </div>
                </div>
            </div>
        </>
    )
}