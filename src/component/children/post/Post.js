import style from './post.module.css'
import {useEffect, useRef, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faArrowLeft,
    faArrowRight,
    faBookmark,
    faClock,
    faLink,
    faReply,
    faThumbsUp
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {useLocation} from "react-router-dom";

export default function Post() {
    const [post, setPost] = useState([])
    const [idPost, setIdPost] = useState("")
    const location = useLocation()
    const drawCanvas = (canvas) => {
        if (canvas) {
            for (let i = 0; i < canvas.length; i++) {
                const ctx = canvas[i].getContext("2d")

                ctx.beginPath()
                ctx.lineTo(0, 0)
                ctx.lineTo(1024, 0)
                ctx.lineTo(1080, 56)
                ctx.lineTo(1080, 812)
                ctx.lineTo(0, 812)
                ctx.lineTo(0, 0)
                ctx.strokeStyle = "#e8b057"
                ctx.stroke()
                ctx.closePath()
            }
        }
    }

    const drawCanvas1 = (canvas1) => {
        if (canvas1) {
            for (let i = 0; i < canvas1.length; i++) {
                const ctx = canvas1[i].getContext("2d")
                ctx.beginPath()
                ctx.lineTo(0, 0)
                ctx.lineTo(0, 320)
                ctx.lineTo(207, 320)
                ctx.lineTo(207, 32)
                ctx.lineTo(175, 0)
                ctx.lineTo(0, 0)
                ctx.strokeStyle = "#e8b057"
                ctx.stroke()
                ctx.closePath()

                ctx.beginPath()
                ctx.lineTo(52.5, 318)
                ctx.lineTo(99.5, 318)
                ctx.lineTo(146.5, 318)
                ctx.lineWidth = 2
                ctx.stroke()
                ctx.closePath()
            }
        } else {
            return
        }

    }
    const drawCanvas2 = (canvas2) => {
        if (canvas2) {
            for (let i = 0; i < canvas2.length; i++) {
                const ctx = canvas2[i].getContext("2d")
                ctx.beginPath()
                ctx.lineTo(0, 0)
                ctx.lineTo(0, 304)
                ctx.lineTo(259.2, 304)
                ctx.lineTo(259.2, 32)
                ctx.lineTo(227.2, 0)
                ctx.lineTo(0, 0)
                ctx.strokeStyle = "#e8b057"
                ctx.stroke()
                ctx.closePath()
            }
        } else {
            return
        }
    }
    useEffect(() => {
        const canvas = document.querySelectorAll('#canvas')
        const canvas1 = document.querySelectorAll('#canvas1')
        const canvas2 = document.querySelectorAll('#canvas2')
        drawCanvas(canvas)
        drawCanvas1(canvas1)
        drawCanvas2(canvas2)
    })

    const products_ = useRef(null)
    const handlePrev = () => {
        const getWidth = document.querySelector(`.${style.product}`).offsetWidth;
        products_.current.scrollLeft -= (getWidth + 10) * 4
    }
    const handleNext = () => {
        const getWidth = document.querySelector(`.${style.product}`).offsetWidth;
        products_.current.scrollLeft += (getWidth + 10) * 4
    }
    const MOUNT = [
        {
            id: 1,
            name: "Wood sticks",
            imgSrc: "https://m.media-amazon.com/images/I/51LLSEH2gYL._AC_SL1000_.jpg",
            link: "https://www.amazon.com/gp/product/B01C6BMJ72/ref=as_li_tl?ie=UTF8&camp"
        },
        {
            id: 2,
            name: "Spray paint",
            imgSrc: "https://m.media-amazon.com/images/I/81LqqrQUYbL._AC_SL1500_.jpg",
            link: "https://www.amazon.com/gp/product/B002BWORSG/ref=as_li_tl?ie=UTF8&camp"
        },
        {
            id: 3,
            name: "Silicon gun",
            imgSrc: "https://m.media-amazon.com/images/I/71NhmGV4jrL._AC_SL1500_.jpg",
            link: "https://www.amazon.com/gp/product/B002YC3W48/ref=as_li_tl?ie=UTF8&camp"
        },
        {
            id: 4,
            name: "Silicon",
            imgSrc: "https://m.media-amazon.com/images/I/61Ok27ras7L._AC_SL1500_.jpg",
            link: "https://www.amazon.com/gp/product/B01NCSN5AS/ref=as_li_tl?ie=UTF8&camp"
        },
        {
            id: 5,
            name: "Hand saw",
            imgSrc: "https://m.media-amazon.com/images/I/61whusUxK0L._AC_SL1500_.jpg",
            link: "https://www.amazon.com/gp/product/B000B3AR04/ref=as_li_tl?ie=UTF8&camp"
        },
        {
            id: 6,
            name: "Leveler",
            imgSrc: "https://m.media-amazon.com/images/I/61KBSL-PyeL._AC_SL1500_.jpg",
            link: "https://www.amazon.com/gp/product/B00002N5NT/ref=as_li_tl?ie=UTF8&camp"
        }
    ]
    const COMMENTS = [
        {
            id: 1,
            avatar: "https://cdn-fastly.hometalk.com/media/profile/2020/01/01/21567748_1.jpg?size=50x50",
            name: "Shuganne",
            content: "What are the dimensions of the sticks? Did you measure the room to place the mirrors centered evenly on the wall? What if you have a small gap at the ceiling or adjoining walls, i.e., less than the measurement of a full mirror? Did you leave the gap? Did you cut the mirrors to fill the entire wall?",
            date: "14/1/2023",
            like: "6"
        },
        {
            id: 2,
            avatar: "https://cdn-fastly.hometalk.com/media/profile/2016/08/28/10871682_1.jpg?size=50x50",
            name: "Sue Wilson Ford",
            content: "How did you work around electric outlets and wall switches?",
            date: "14/1/2023",
            like: "3",
        },
        {
            id: 3,
            avatar: "https://cdn-fastly.hometalk.com/media/profile/2016/08/20/10463397_1.jpg?size=50x50",
            name: "Lori Ward-Laatsch",
            content: "Love love love it!",
            date: "21/2/2023",
            like: "4"
        }
    ]
    const RELATED = [
        {
            id: 1,
            illustration: "https://cdn-fastly.hometalk.com/media/2016/11/15/3610529/diy-wall-mirror.jpg?size=350x220",
            title: "DIY Wall Mirror",
            avatar: "https://cdn-fastly.hometalk.com/media/profile/2023/05/05/14583166_4.jpg?size=50x50",
            nameUser: "Tresha Armstrong",
        },
        {
            id: 2,
            illustration: "https://cdn-fastly.hometalk.com/media/2020/03/31/6105264/create-your-own-diy-decorative-wall-mirror-in-a-few-easy-steps.jpg?size=350x220",
            title: "Create Your Own DIY Decorative Wall Mirror in a Few Easy Steps!",
            avatar: "https://cdn-fastly.hometalk.com/media/profile/2023/05/05/14583166_4.jpg?size=50x50",
            nameUser: "Tresha Armstrong",
        },
        {
            id: 3,
            illustration: "https://cdn-fastly.hometalk.com/media/2017/10/19/4390823/a-new-way-to-use-doormat-as-a-faux-mirror-wall-art.jpg?size=350x220",
            title: "A New Way To Use Doormat As A Faux Mirror Wall Art",
            avatar: "https://cdn-fastly.hometalk.com/media/profile/2017/03/28/22245231_1.jpg?size=50x50",
            nameUser: "MojisStyle",
        },
        {
            id: 4,
            illustration: "https://cdn-fastly.hometalk.com/media/2014/09/12/948399/mirror-builders-grade-turned-trumeau-bathroom-ideas-diy-repurposing-upcycling.jpg?size=350x220",
            title: "Builder's Grade Mirror Turned Trumeau Mirror",
            avatar: "https://cdn-fastly.hometalk.com/media/profile/2014/08/10/728672.jpg?size=50x50",
            nameUser: "Victoria Kirton",
        },
        {
            id: 5,
            illustration: "https://cdn-fastly.hometalk.com/media/2018/06/12/4889664/pretty-sliding-barn-door-it-slides-behind-a-dresser.jpg?size=350x220",
            title: "Pretty Sliding Barn Door. It Slides Behind a Dresser.",
            avatar: "https://cdn-fastly.hometalk.com/media/profile/2021/08/13/32537901_3.jpg?size=50x50",
            nameUser: "Debbie",
        },
        {
            id: 6,
            illustration: "https://cdn-fastly.hometalk.com/media/2018/06/27/4924589/easy-way-to-hang-a-heavy-mirror-or-piece-of-art.jpg?size=350x220",
            title: "Hang Art or Mirrors With Two Key Holes on the Back",
            avatar: "https://cdn-fastly.hometalk.com/media/profile/2017/07/26/28380472_1.jpg?size=50x50",
            nameUser: "Porch Daydreamer",
        },
    ]
    useEffect(() => {
        setIdPost(location.state.idPost)
        axios.get('http://localhost:3001/getPost')
            .then(res => {
                setPost(res.data.posts)
            })
            .catch(err => {
                console.log(err)
            })
    }, [location.state.idPost])
    console.log(post)
    return (
        <>
            {
                idPost !== "" &&
                post.map((data, index) => (
                    <div className={style.post} key={index}>
                        <div className={style.banner}>
                            <div className={style.backgroundBanner}
                                 style={{backgroundImage: `url(${data.post.illustration_post})`}}></div>
                            <div className={style.titlePhoto}>
                                <img alt={"title"}
                                     src={data.post.illustration_post}/>
                                <div className={style.boxCanvas}>
                                    <canvas className={style.canvas} id={"canvas"} width={"1080"} height={"812"}/>
                                    <div className={style.titlePost}>
                                        {
                                            data.post.title_post
                                        }
                                    </div>
                                    <div className={style.infPost}>
                                        <div className={style.dateOfWriting}>2 tháng trước</div>
                                        <div className={style.nameAuthor}>
                                            <span>Author: </span> <font>{data.infoUser[0].username}</font>
                                        </div>
                                        <div className={style.listBtn}>
                                            <div className={style.itemBtn}><FontAwesomeIcon icon={faThumbsUp}/>Like
                                            </div>
                                            <div className={style.itemBtn}><i><FontAwesomeIcon icon={faBookmark}/></i>Save
                                            </div>
                                            <div className={style.itemBtn}><i><FontAwesomeIcon icon={faLink}/></i>Share
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={style.contentPost}>
                            <div className={style.content} dangerouslySetInnerHTML={{__html: data.post.ckeditor}}></div>
                            <div className={style.line}>
                                <img alt={"line"}
                                     src={"https://universe.leagueoflegends.com/images/t1HeaderDivider.png"}/>
                            </div>
                            <div className={style.listProducts}>
                                <div className={style.sliderNav}>
                                    <div className={style.titleNav}>
                                        Products used in the article ?
                                    </div>
                                    <div className={style.navDashLine}></div>
                                    <div className={style.buttons}>
                                        <button className={style.prev} onClick={handlePrev}>
                                            <i><FontAwesomeIcon icon={faArrowLeft}/></i>
                                        </button>
                                        <button className={style.next} onClick={handleNext}>
                                            <i><FontAwesomeIcon icon={faArrowRight}/></i>
                                        </button>
                                    </div>
                                </div>
                                <div className={style.products} ref={products_}>
                                    <div className={style.boxProducts} style={{"--numberProduct": MOUNT.length}}>
                                        {
                                            data.productsInPosts.map((data, index) => (
                                                <div className={style.product} key={index}>
                                                    <div className={style.boxCanvas1}>
                                                        <canvas id={"canvas1"} width={"207"} height={"320"}
                                                                className={style.canvas1}/>
                                                        <div className={style.titlePhotoProduct}>
                                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                                 viewBox="0 0 93.3 100"
                                                                 className={style.frameImage}>
                                                                <path
                                                                    d="M36.8 7.8C11.6 13.2-4.4 38 1.1 63.2s30.2 41.2 55.4 35.7c25.2-5.4 41.2-30.2 35.7-55.4-3.8-17.9-17.8-31.9-35.7-35.7l-9.8 9.8-9.9-9.8zM46.6 22l6.9-6.9c21.1 3.8 35.2 24 31.4 45.1s-24 35.2-45.1 31.4-35.2-24-31.4-45.1c2.9-16 15.4-28.5 31.4-31.4l6.8 6.9zm0 74.9c-24 0-43.5-19.5-43.5-43.5 0-19.9 13.5-37.3 32.7-42.2l2.6 2.6C16.6 18.3 2.5 39.7 7.1 61.6S33 97.5 54.9 92.9 90.8 67 86.2 45.1C82.9 29.3 70.6 17 54.9 13.8l2.6-2.6c23.3 6 37.3 29.7 31.4 53-5 19.2-22.4 32.7-42.3 32.7z"></path>
                                                                <path
                                                                    d="M52.1 5.4l-5.4 5.4-5.4-5.4L46.6 0l5.5 5.4z"></path>
                                                            </svg>
                                                            <div className={style.imgProduct}>
                                                                <img alt={"product"}
                                                                     src={data.illustration_product}/>
                                                            </div>

                                                        </div>
                                                        <div className={style.nameProduct}>
                                                            {data.name_product}
                                                        </div>
                                                        <div className={style.nameProduct}>
                                                            {data.product_price}<sup>đ</sup>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className={style.line}>
                                <img alt={"line"}
                                     src={"https://universe.leagueoflegends.com/images/t1HeaderDivider.png"}/>
                            </div>
                            <div className={style.boxComments}>
                                <div className={style.titleComments}>
                                    Have a question about this project?
                                </div>
                                <ul className={style.comments}>
                                    {
                                        COMMENTS.map((data, index) => (
                                            <li className={style.comment} key={index}>
                                                <div className={style.commentator}>
                                                    <div className={style.avatarCommentator}>
                                                        <img alt={"commentator"}
                                                             src={data.avatar}/>
                                                    </div>
                                                    <div className={style.box1}>
                                                        <div className={style.nameCommentator}>
                                                            {data.name}
                                                        </div>
                                                        <div className={style.dateComment}>
                                                            <i><FontAwesomeIcon icon={faClock}/></i>
                                                            <font>
                                                                {data.date}
                                                            </font>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className={style.contentComment}>
                                                    {data.content}
                                                </div>
                                                <div className={style.listBtnCmt}>
                                                    <div className={style.likeCmt}>
                                                        <i><FontAwesomeIcon
                                                            icon={faThumbsUp}/></i><font>{data.like}</font>
                                                    </div>
                                                    <div className={style.replyCmt}>
                                                        <i><FontAwesomeIcon icon={faReply}/></i><font>Reply</font>
                                                    </div>
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className={style.boxRelatedProjects}>
                            <div className={style.backgroundRelatedProjects}></div>
                            <div className={style.titleRelatedPrj}>
                                Related DIY Projects ---
                            </div>
                            <div className={style.relatedProjects}>
                                {
                                    RELATED.map((data, index) => (
                                        <div className={style.relatedProject} key={index}>
                                            <canvas id={'canvas2'} className={style.canvas2} width={"275.200"}
                                                    height={"304"}/>
                                            <img alt={"related Project"} className={style.illustration}
                                                 src={data.illustration}/>
                                            <div className={style.infRelatedPrj}>
                                                <div className={style.nameRelatedPrj}>
                                                    {data.title}
                                                </div>
                                                <div className={style.authorRelatedPrj}>
                                                    <div className={style.avatarAuthorRelatedPrj}>
                                                        <img alt={"avatar"}
                                                             src={data.avatar}/>
                                                    </div>
                                                    <div className={style.nameAuthorRelatedPrj}>{data.nameUser}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                ))
            }
            {
                idPost === "" &&
                <div className={style.post}>
                    <div className={style.banner}>
                        <div className={style.backgroundBanner}
                             style={{backgroundImage: 'url(https://cdn-fastly.hometalk.com/media/2023/01/10/8674840/this-easy-mirror-wall-diy-hack-uses-cheap-mirrors-from-ikea.jpg?size=720x845&nocrop=1)'}}></div>
                        <div className={style.titlePhoto}>
                            <img alt={"title"}
                                 src={"https://cdn-fastly.hometalk.com/media/2023/01/10/8674840/this-easy-mirror-wall-diy-hack-uses-cheap-mirrors-from-ikea.jpg?size=720x845&nocrop=1"}/>
                            <div className={style.boxCanvas}>
                                <canvas className={style.canvas} id={"canvas"} width={"1080"} height={"812"}/>
                                <div className={style.titlePost}>
                                    This Easy Mirror Wall DIY Hack Uses Cheap Mirrors From IKEA
                                </div>
                                <div className={style.infPost}>
                                    <div className={style.dateOfWriting}>2 tháng trước</div>
                                    <div className={style.nameAuthor}>
                                        <span>Author: </span> <font>Norman</font>
                                    </div>
                                    <div className={style.listBtn}>
                                        <div className={style.itemBtn}><FontAwesomeIcon icon={faThumbsUp}/>Like</div>
                                        <div className={style.itemBtn}><i><FontAwesomeIcon icon={faBookmark}/></i>Save
                                        </div>
                                        <div className={style.itemBtn}><i><FontAwesomeIcon icon={faLink}/></i>Share
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={style.contentPost}>
                        <div className={style.content}>
                            <font>
                                Today I want to share a mirror wall DIY. Industrial mirrors can make your space look a
                                lot
                                bigger, so they are excellent for small rooms. This is a very easy, cheap, and fun DIY
                                to
                                do, so
                                let’s dive in.
                            </font>
                            <h3>Tools and materials:</h3>
                            <ul>
                                <li>
                                    IKEA LOTS mirrors
                                </li>
                                <li>
                                    Wood sticks
                                </li>
                                <li>
                                    Spray paint
                                </li>
                                <li>
                                    Silicon
                                </li>
                                <li>
                                    Silicon gun
                                </li>
                                <li>
                                    Hand saw
                                </li>
                                <li>
                                    Leveler
                                </li>
                            </ul>
                            <h3>1. Measure the wall</h3>
                            <font>Clear the entire wall of anything you have hanging on it. Measure your wall and do the
                                calculations of how many LOTS mirrors to order.</font>
                            <img alt={""}
                                 src={"https://cdn-fastly.hometalk.com/media/2023/01/10/8674810/this-easy-mirror-wall-diy-hack-uses-cheap-mirrors-from-ikea.jpg?size=720x845&nocrop=1"}/>
                            <h3>2. Stick the mirrors on the walls</h3>
                            <font>The LOTS mirrors come with rectangular stickers of double tape. Place two of them on
                                the
                                back
                                of the mirror, one on each side.</font>
                            <img alt={""}
                                 src={"https://cdn-fastly.hometalk.com/media/2023/01/10/8674813/this-easy-mirror-wall-diy-hack-uses-cheap-mirrors-from-ikea.jpg?size=720x845&nocrop=1"}/>
                            <font>Using one of the sticks as your base, place the mirrors on the wall. Make sure to
                                leave
                                space
                                for the wood in between the mirrors. In order to do that simply and without making
                                unnecessary
                                measurements, just place the second stick vertically between the mirrors each time you
                                stick
                                a
                                new one on the wall. You can break the stick to make it more convenient to use.</font>
                            <img alt={""}
                                 src={"https://cdn-fastly.hometalk.com/media/2023/01/10/8674816/this-easy-mirror-wall-diy-hack-uses-cheap-mirrors-from-ikea.jpg?size=720x845&nocrop=1"}/>
                            <font>
                                For the second row, use a piece of the same double tape to secure a stick on the wall
                                horizontally, to mark the space between the first and second row. Once you are done with
                                the
                                first mirror of the second row, you can move the stick to the side to continue.
                            </font>
                            <img alt={""}
                                 src={"https://cdn-fastly.hometalk.com/media/2023/01/10/8674819/this-easy-mirror-wall-diy-hack-uses-cheap-mirrors-from-ikea.jpg?size=720x845&nocrop=1"}/>
                            <font>Just continue to make as many rows as you find suitable. I recommend going to the very
                                ceiling
                                as it will create a visual illusion of a higher ceiling. Use your knee to keep mirrors
                                in
                                place
                                when needed.</font>
                            <img alt={""}
                                 src={"https://cdn-fastly.hometalk.com/media/2023/01/10/8674822/this-easy-mirror-wall-diy-hack-uses-cheap-mirrors-from-ikea.jpg?size=720x845&nocrop=1"}/>
                            <h3>3. Prepare the sticks</h3>
                            <font>We are done with the mirrors! The next step is to chop the wood sticks as needed.
                                Place
                                the
                                sticks vertically first, and then place the rest horizontally right on top. Mark where
                                you
                                need
                                to cut them.</font>
                            <img alt={""}
                                 src={"https://cdn-fastly.hometalk.com/media/2023/01/10/8674825/this-easy-mirror-wall-diy-hack-uses-cheap-mirrors-from-ikea.jpg?size=720x845&nocrop=1"}/>
                            <font>Chop the sticks! You may use a jigsaw or a handsaw for this.</font>
                            <img alt={""}
                                 src={"https://cdn-fastly.hometalk.com/media/2023/01/10/8674828/this-easy-mirror-wall-diy-hack-uses-cheap-mirrors-from-ikea.jpg?size=720x845&nocrop=1"}/>
                            <font>Spray paint all the sticks. You could also leave them in their natural color, but I
                                think
                                it
                                looks more industrial. I am painting mine black.</font>
                            <img alt={""}
                                 src={"https://cdn-fastly.hometalk.com/media/2023/01/10/8674831/this-easy-mirror-wall-diy-hack-uses-cheap-mirrors-from-ikea.jpg?size=720x845&nocrop=1"}/>
                            <h3>4. Place the sticks on the wall</h3>
                            <font>Fix the sticks on the wall in between the mirrors using silicone. Start with the long
                                vertical
                                sticks. Make sure to put silicone on the gaps on the wall, not on the sticks themselves
                                -
                                that
                                way it will be much less messy.</font>
                            <br/>
                            <font>Put the silicone inside, put in the stick, press on it, and repeat between all the
                                mirrors.
                                Make
                                sure to also get the sticks on the outside, to create a sort of frame.</font>
                            <img alt={""}
                                 src={"https://cdn-fastly.hometalk.com/media/2023/01/10/8674834/this-easy-mirror-wall-diy-hack-uses-cheap-mirrors-from-ikea.jpg?size=720x845&nocrop=1"}/>
                            <font>Fill the horizontal gaps in with the shorter sticks, using the same technique.</font>
                            <img alt={""}
                                 src={"https://cdn-fastly.hometalk.com/media/2023/01/10/8674837/this-easy-mirror-wall-diy-hack-uses-cheap-mirrors-from-ikea.jpg?size=720x845&nocrop=1"}/>
                            <img alt={""}
                                 src={"https://cdn-fastly.hometalk.com/media/2023/01/10/8674840/this-easy-mirror-wall-diy-hack-uses-cheap-mirrors-from-ikea.jpg?size=720x845&nocrop=1"}/>
                            <h3>Mirror wall DIY</h3>
                            <font>This is it! Let’s see the before and after. My room looks so much more spacious now,
                                as
                                well
                                as brighter and taller. Have fun installing your own industrial mirror wall and let me
                                know
                                how
                                it goes in the comments!</font>
                        </div>
                        <div className={style.line}>
                            <img alt={"line"} src={"https://universe.leagueoflegends.com/images/t1HeaderDivider.png"}/>
                        </div>
                        <div className={style.listProducts}>
                            <div className={style.sliderNav}>
                                <div className={style.titleNav}>
                                    Products used in the article ?
                                </div>
                                <div className={style.navDashLine}></div>
                                <div className={style.buttons}>
                                    <button className={style.prev} onClick={handlePrev}>
                                        <i><FontAwesomeIcon icon={faArrowLeft}/></i>
                                    </button>
                                    <button className={style.next} onClick={handleNext}>
                                        <i><FontAwesomeIcon icon={faArrowRight}/></i>
                                    </button>
                                </div>
                            </div>
                            <div className={style.products} ref={products_}>
                                <div className={style.boxProducts} style={{"--numberProduct": MOUNT.length}}>
                                    {
                                        MOUNT.map((data, index) => (
                                            <div className={style.product} key={index}>
                                                <div className={style.boxCanvas1}>
                                                    <canvas id={"canvas1"} width={"207"} height={"320"}
                                                            className={style.canvas1}/>
                                                    <div className={style.titlePhotoProduct}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 93.3 100"
                                                             className={style.frameImage}>
                                                            <path
                                                                d="M36.8 7.8C11.6 13.2-4.4 38 1.1 63.2s30.2 41.2 55.4 35.7c25.2-5.4 41.2-30.2 35.7-55.4-3.8-17.9-17.8-31.9-35.7-35.7l-9.8 9.8-9.9-9.8zM46.6 22l6.9-6.9c21.1 3.8 35.2 24 31.4 45.1s-24 35.2-45.1 31.4-35.2-24-31.4-45.1c2.9-16 15.4-28.5 31.4-31.4l6.8 6.9zm0 74.9c-24 0-43.5-19.5-43.5-43.5 0-19.9 13.5-37.3 32.7-42.2l2.6 2.6C16.6 18.3 2.5 39.7 7.1 61.6S33 97.5 54.9 92.9 90.8 67 86.2 45.1C82.9 29.3 70.6 17 54.9 13.8l2.6-2.6c23.3 6 37.3 29.7 31.4 53-5 19.2-22.4 32.7-42.3 32.7z"></path>
                                                            <path d="M52.1 5.4l-5.4 5.4-5.4-5.4L46.6 0l5.5 5.4z"></path>
                                                        </svg>
                                                        <div className={style.imgProduct}>
                                                            <img alt={"product"}
                                                                 src={data.imgSrc}/>
                                                        </div>

                                                    </div>
                                                    <div className={style.nameProduct}>
                                                        {data.name}
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        <div className={style.line}>
                            <img alt={"line"} src={"https://universe.leagueoflegends.com/images/t1HeaderDivider.png"}/>
                        </div>
                        <div className={style.boxComments}>
                            <div className={style.titleComments}>
                                Have a question about this project?
                            </div>
                            <ul className={style.comments}>
                                {
                                    COMMENTS.map((data, index) => (
                                        <li className={style.comment} key={index}>
                                            <div className={style.commentator}>
                                                <div className={style.avatarCommentator}>
                                                    <img alt={"commentator"}
                                                         src={data.avatar}/>
                                                </div>
                                                <div className={style.box1}>
                                                    <div className={style.nameCommentator}>
                                                        {data.name}
                                                    </div>
                                                    <div className={style.dateComment}>
                                                        <i><FontAwesomeIcon icon={faClock}/></i>
                                                        <font>
                                                            {data.date}
                                                        </font>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className={style.contentComment}>
                                                {data.content}
                                            </div>
                                            <div className={style.listBtnCmt}>
                                                <div className={style.likeCmt}>
                                                    <i><FontAwesomeIcon icon={faThumbsUp}/></i><font>{data.like}</font>
                                                </div>
                                                <div className={style.replyCmt}>
                                                    <i><FontAwesomeIcon icon={faReply}/></i><font>Reply</font>
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                    <div className={style.boxRelatedProjects}>
                        <div className={style.backgroundRelatedProjects}></div>
                        <div className={style.titleRelatedPrj}>
                            Related DIY Projects ---
                        </div>
                        <div className={style.relatedProjects}>
                            {
                                RELATED.map((data, index) => (
                                    <div className={style.relatedProject} key={index}>
                                        <canvas id={'canvas2'} className={style.canvas2} width={"275.200"}
                                                height={"304"}/>
                                        <img alt={"related Project"} className={style.illustration}
                                             src={data.illustration}/>
                                        <div className={style.infRelatedPrj}>
                                            <div className={style.nameRelatedPrj}>
                                                {data.title}
                                            </div>
                                            <div className={style.authorRelatedPrj}>
                                                <div className={style.avatarAuthorRelatedPrj}>
                                                    <img alt={"avatar"}
                                                         src={data.avatar}/>
                                                </div>
                                                <div className={style.nameAuthorRelatedPrj}>{data.nameUser}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            }
        </>)
}