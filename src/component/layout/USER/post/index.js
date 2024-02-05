import style from './post.module.css'
import Navbar from "../../../default/navbar/Navbar";
import Footer from "../../../default/footer/Footer";
import {Fragment, useEffect, useRef, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faArrowLeft,
    faArrowRight,
    faBookmark,
    faLink, faPenToSquare,
    faThumbsUp, faTrash
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import io from 'socket.io-client';
import {formatDistanceToNow, parseISO} from "date-fns";
import socket from "../../../../json default/json1";

export default function OnlyPost({children}) {
    const [post, setPost] = useState([])
    const location = useLocation()
    const navigate = useNavigate()
    const [editorData, setEditorData] = useState({})
    const API_URl = "http://localhost:3001"
    const UPLOAD_ENDPOINT = "uploadImgOfEditor";
    const port = window.location.port;

    const ID_SELF = JSON.parse(localStorage.getItem(`sessionProfile${port}`))?.id_account
    const MY_NAME = JSON.parse(localStorage.getItem(`sessionProfile${port}`))?.fullName

    const jump_ = useRef(null)
    const Children = children.type
    const [key, setKey] = useState(0);
    const products_ = useRef(null)
    const product_ = useRef(null)
    const [related, setRelated] = useState([])

    function uploadAdapter(loader) {
        return {
            upload: () => {
                return new Promise((resolve, reject) => {
                    const body = new FormData();
                    loader.file.then((file) => {
                        body.append("ckEditorImage", file);
                        fetch(`${API_URl}/${UPLOAD_ENDPOINT}`, {
                            method: "post",
                            body: body
                        })
                            .then((res => res.json()))
                            .then((res) => {
                                resolve({default: `${API_URl}/${res.url}`})
                            })
                            .catch((err) => {
                                reject(err);
                            })
                    })
                })
            }
        }
    }

    function uploadPlugin(editor) {
        editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
            return uploadAdapter(loader);
        }
    }

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

    const handlePrev = () => {
        const getWidth = product_.current?.offsetWidth;
        products_.current.scrollLeft -= (getWidth + 10) * 4
    }

    const handleNext = () => {
        const getWidth = product_.current?.offsetWidth;
        products_.current.scrollLeft += (getWidth + 10) * 4
    }

    useEffect(() => {
        axios.get(`http://localhost:3001/getPost?idPost=${location.state.idPost}`)
            .then(res => {
                setPost(res.data.posts)
            })
            .catch(err => {
                console.log(err)
            })

        axios.get(`http://localhost:3001/getPostsByIdUser?idUser=${location.state.idUser}`)
            .then(res => {
                setRelated(res.data.postsByIdUser)
            })
            .catch(err => console.log(err))
    }, [location.state.idPost, location.state.idUser])

    const handleDeleteProject = async (e, idPost) => {
        const answer = window.confirm("Are you sure?");
        if (!answer) {
            e.preventDefault();
        } else {
            try {
                const res = await axios.post(`http://localhost:3001/deleteProject?idPost=${idPost}`)
                if (res.data.msg === 'delete success') {
                    navigate('/', {replace: true})
                }
            } catch (e) {
                console.log(e)
            }
        }
    }

    // const socket = io('http://localhost:3002');

    const handleComment = async (idSender, myName, idPost, titlePost, idAuthor) => {
        const now = new Date();
        const dateComment = now.getFullYear() + '-' +
            ('0' + (now.getMonth() + 1)).slice(-2) + '-' +
            ('0' + now.getDate()).slice(-2) + ' ' +
            ('0' + now.getHours()).slice(-2) + ':' +
            ('0' + now.getMinutes()).slice(-2) + ':' +
            ('0' + now.getSeconds()).slice(-2);
        try {
            const commentData = {
                idSender: idSender,
                fullName: myName,
                editorData: editorData,
                idPost: idPost,
                idAuthor: idAuthor,
                titlePost: titlePost,
                dateComment: dateComment
            };
            socket.emit('new-comment', commentData);
            // handleEdit()
            const ntfCmtData = {
                idSender: idSender,
                idPost: idPost,
                idAuthor: idAuthor,
                titlePost: titlePost,
                dateComment: dateComment
            }
            socket.emit('add-notification-comment', ntfCmtData)
            // return () => {
            //     socket.off('new-comment');
            // };
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const scrollToMyRef = (idComment) => {
        const jump_ = document.getElementById(`comment${idComment}`)
        if (jump_) {
            let position = jump_.getBoundingClientRect();
            window.scrollTo({
                top: position.top + window.scrollY - 80,
                behavior: 'smooth'
            });
        }
    }

    useEffect(() => {
        if (location.state.idJump === 0) {
            scrollToMyRef(0)
        } else if (location.state.idJump !== 0) {
            scrollToMyRef(location.state.idJump)
        }
    })

    const handleEdit = () => {
        setKey(prevKey => prevKey + 1);
    }

    const convertDate = (dateString) => {
        const date = parseISO(dateString);
        return formatDistanceToNow(date, {addSuffix: true});
    }

    return (
        <>
            <header>
                <Navbar/>
            </header>
            <div className={style.container}>
                <div className={style.background}></div>
                <div className={style.boxPost}>
                    {
                        post.map((data, index) => (
                            <Fragment key={index}>
                                <div className={style.post}>
                                    <div className={style.banner}>
                                        <div className={style.backgroundBanner}
                                             style={{backgroundImage: `url(${data.post.illustration_post})`}}></div>
                                        <div className={style.titlePhoto}>
                                            <img alt={"title"}
                                                 src={data.post.illustration_post}/>
                                            <div className={style.boxCanvas}>
                                                <canvas className={style.canvas} id={"canvas"} width={"1080"}
                                                        height={"812"}/>
                                                <div className={style.titlePost}>
                                                    {
                                                        data.post.title_post
                                                    }
                                                </div>
                                                <div className={style.infPost}>
                                                    <div
                                                        className={style.dateOfWriting}>{convertDate(data.post.date_post)}</div>
                                                    <div className={style.nameAuthor}>
                                                        <span>Author: </span> <font>{data.infoUser[0].fullName}</font>
                                                    </div>
                                                    <div className={style.listBtn}>
                                                        {/*<div className={style.itemBtn}>*/}
                                                        {/*    <i><FontAwesomeIcon icon={faThumbsUp}/></i>Like*/}
                                                        {/*</div>*/}
                                                        {
                                                            data.post.id_of_user !== ID_SELF &&
                                                            <div className={style.itemBtn}>
                                                                <i><FontAwesomeIcon icon={faBookmark}/></i>Save
                                                            </div>
                                                        }
                                                        <div className={style.itemBtn}>
                                                            <i><FontAwesomeIcon icon={faLink}/></i>Share
                                                        </div>
                                                        {
                                                            data.post.id_of_user === ID_SELF &&
                                                            <div className={style.itemBtn}
                                                                 onClick={() => navigate('/editPost/stage1', {
                                                                     state: {
                                                                         idPost: data.post.id_post,
                                                                         idUser: data.infoUser[0].id_account
                                                                     }
                                                                 })}>
                                                                <i><FontAwesomeIcon icon={faPenToSquare}/></i>Edit
                                                            </div>
                                                        }
                                                        {
                                                            data.post.id_of_user === ID_SELF &&
                                                            <div className={style.itemBtn}
                                                                 onClick={e => handleDeleteProject(e, data.post.id_post)}>
                                                                <i><FontAwesomeIcon icon={faTrash}/></i>Delete
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={style.contentPost}>
                                        <div className={style.content}
                                             dangerouslySetInnerHTML={{__html: data.post.ckeditor}}></div>
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
                                                <div className={style.boxProducts}
                                                     style={{"--numberProduct": data.productsInPosts.length}}>
                                                    {
                                                        data.productsInPosts.map((data, index) => (
                                                            <div id={"product"} className={style.product} key={index}
                                                                 ref={product_}>
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
                                                                        {Intl.NumberFormat().format(data.product_price)}<sup>đ</sup>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div id={"jump_"} className={style.line} ref={jump_}>
                                            <img alt={"line"}
                                                 src={"https://universe.leagueoflegends.com/images/t1HeaderDivider.png"}/>
                                        </div>
                                        <div className={style.boxComments}>
                                            <div className={style.titleComments}>
                                                Have a question about this project?
                                            </div>
                                            {
                                                ID_SELF &&
                                                <div className={style.boxCmt}>
                                                    <CKEditor
                                                        config={{
                                                            extraPlugins: [uploadPlugin]
                                                        }}
                                                        editor={ClassicEditor}
                                                        data={""}
                                                        onReady={editor => {
                                                            console.log('Editor is ready to use!', editor);
                                                        }}
                                                        onChange={(event, editor) => {
                                                            const data = editor.getData();
                                                            setEditorData(data)
                                                        }}
                                                        onBlur={(event, editor) => {
                                                        }}
                                                        onFocus={(event, editor) => {
                                                        }}/>
                                                    <div className={style.btnComment}>
                                                        <button
                                                            onClick={() => {
                                                                handleComment(ID_SELF, MY_NAME, data.post.id_post, data.post.title_post, data.post.id_of_user)
                                                            }}>
                                                            Comment
                                                        </button>
                                                    </div>
                                                </div>
                                            }
                                            <Children key={key} onEdit={handleEdit} idPost={post[0]?.post.id_post}
                                                      titlePost={post[0]?.post.title_post}/>
                                        </div>
                                    </div>
                                    <div className={style.boxRelatedProjects}>
                                        <div className={style.backgroundRelatedProjects}></div>
                                        <div className={style.titleRelatedPrj}>
                                            Related DIY Projects ---
                                        </div>
                                        <div className={style.relatedProjects}>
                                            {
                                                related.map((data, index) => (
                                                    <div className={style.relatedProject} key={index}>
                                                        <canvas id={'canvas2'} className={style.canvas2}
                                                                width={"275.200"}
                                                                height={"304"}/>
                                                        <img alt={"related Project"} className={style.illustration}
                                                             src={data.illustration_post}/>
                                                        <div className={style.infRelatedPrj}>
                                                            <div className={style.nameRelatedPrj}>
                                                                {data.title_post}
                                                            </div>
                                                            <div className={style.authorRelatedPrj}>
                                                                <div className={style.avatarAuthorRelatedPrj}>
                                                                    <img alt={"avatar"}
                                                                         src={data.avatar}/>
                                                                </div>
                                                                <div
                                                                    className={style.nameAuthorRelatedPrj}>{data.fullName}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </Fragment>
                        ))
                    }
                </div>
            </div>
            <footer>
                <Footer/>
            </footer>
        </>
    )
}