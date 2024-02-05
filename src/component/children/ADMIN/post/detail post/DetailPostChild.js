import style from './detailPostChild.module.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faClock} from "@fortawesome/free-solid-svg-icons";
import {useLocation, useNavigate} from "react-router-dom";
import {Fragment, useEffect, useState} from "react";
import axios from "axios";

export default function DetailPostChild() {
    const navigate = useNavigate()
    const location = useLocation()

    const [post, setPost] = useState([])
    const [products, setProducts] = useState([])
    const [comments, setComments] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:3001/admin/getPost?idPost=${location.state.idPost}`)
            .then(res => {
                setPost(res.data.post)
                setProducts(res.data.products)
                setComments(res.data.comments)
            })
    }, [location.state.idPost])

    const handleDelete = async (e, idPost) => {
        try {
            const answer = window.confirm("Are you sure?");
            if (!answer) {
                e.preventDefault();
            } else {
                const res = await axios.post(`http://localhost:3001/admin/deletePost?idPost=${idPost}`)
                if (res.data.msg === 'delete success') {
                    navigate('/admin/posts', {replace: true})
                }
            }
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <>
            <div className={style.detailPostChild}>
                <div className={style.boxBack} onClick={() => navigate(-1)}>
                    <i><FontAwesomeIcon icon={faChevronLeft}/></i>
                    <span>Back</span>
                </div>
                {
                    post?.map((data, index) => (
                        <Fragment key={index}>
                            <div className={style.boxHead}>
                                <div className={style.head}>
                                    <div className={style.info}>
                                        <div className={style.infoItem}>
                                            <div className={style.infoUser}>
                                                <img alt={"avatar"}
                                                     src={data.avatar}/>
                                                <div>
                                                    <div className={style.fullName}>{data.fullName}</div>
                                                    <div className={style.datePost}>Date post: {data.date_post.slice(0, 10)}</div>
                                                </div>
                                            </div>
                                            <div className={style.titlePost}>{data.title_post}</div>
                                        </div>

                                        <div className={style.infoItem}>
                                            <button onClick={e => handleDelete(e, data.id_post)}>Delete</button>
                                        </div>
                                    </div>
                                    <div className={style.illustration}>
                                        <img alt={"illustration"}
                                             src={data.illustration_post}/>
                                    </div>
                                </div>
                            </div>
                            <div className={style.boxContent}>
                                <div className={style.boxEditor}
                                     dangerouslySetInnerHTML={{__html: data.ckeditor}}></div>
                                {
                                    products.length > 0 &&
                                    <div className={style.box}>
                                        <div className={style.boxProducts}>
                                            <h1>List product</h1>
                                            <ul className={style.listProducts}>
                                                {
                                                    products?.map((data, index) => (
                                                        <Fragment key={index}>
                                                            <li className={style.product}>
                                                                <div className={style.boxProduct}>
                                                                    <div className={style.boxImg}>
                                                                        <img alt={"illustration"}
                                                                             src={data.illustration_product}/>
                                                                    </div>
                                                                    <div
                                                                        className={style.nameProduct}>{data.name_product}</div>
                                                                </div>
                                                                <div className={style.boxProduct}>
                                                                    <button>See more</button>
                                                                    <button>Delete</button>
                                                                </div>
                                                            </li>
                                                            <hr/>
                                                        </Fragment>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                }
                            </div>
                        </Fragment>
                    ))
                }
                <div className={style.boxComments}>
                    <h1>Bình luận</h1>
                    <div className={style.comments}>
                        {
                            comments?.map((data, index) => (
                                <Fragment key={index}>
                                    <div className={style.comment}>
                                        <div className={style.boxInfo}>
                                            <div className={style.avatar}>
                                                <img alt={"avatar"}
                                                     src={data.comment.avatar}/>
                                            </div>
                                            <div className={style.nameUser}>{data.comment.fullName}</div>
                                            <div className={style.dateCmt}>
                                                <i><FontAwesomeIcon icon={faClock}/></i>
                                                {data.comment.date_comment.slice(0, 10)}
                                            </div>
                                        </div>
                                        <div className={style.contentCmt}
                                             dangerouslySetInnerHTML={{__html: data.comment.ckeditor}}></div>
                                    </div>
                                    <div className={style.boxReplies}>
                                        {
                                            data?.replies.map((data, index) => (
                                                <div key={index} className={style.replies}>
                                                    <div className={style.boxInfo}>
                                                        <div className={style.avatar}>
                                                            <img alt={"avatar"}
                                                                 src={data.avatar}/>
                                                        </div>
                                                        <div className={style.nameUser}>{data.fullName}</div>
                                                        <div className={style.dateCmt}>
                                                            <i><FontAwesomeIcon icon={faClock}/></i>
                                                            {data.date_reply.slice(0, 10)}
                                                        </div>
                                                    </div>
                                                    <div className={style.contentCmt}
                                                         dangerouslySetInnerHTML={{__html: data.ckeditor_reply}}></div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </Fragment>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}