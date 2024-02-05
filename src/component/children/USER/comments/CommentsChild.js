import style from "../../../layout/USER/post/post.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock, faPenToSquare, faReply, faTrash, faXmark} from "@fortawesome/free-solid-svg-icons";
import {Fragment, useState, useEffect} from "react";
import axios from "axios";
import {useLocation} from "react-router-dom";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import io from 'socket.io-client';
import {formatDistanceToNow, parseISO} from "date-fns";
import socket from "../../../../json default/json1";

const FormEdit = (props) => {
    const API_URl = "http://localhost:3001"
    const UPLOAD_ENDPOINT = "uploadImgOfEditor";
    const [editorData, setEditorData] = useState({})

    const handleCloseModal = (idComment) => {
        const modal = document.getElementById('modal')
        modal.style.display = "none"
        // scrollToMyRef(idComment)
    }

    const scrollToMyRef = (idComment) => {
        const jump_ = document.getElementById(`comment${idComment}`)
        let position = jump_.getBoundingClientRect();
        window.scrollTo({
            top: position.top + window.scrollY - 80,
            behavior: 'smooth'
        });
    }

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

    const handleSubmit = async (id) => {
        // const socket = io('http://localhost:3002');

        const now = new Date();
        const dateReply = now.getFullYear() + '-' +
            ('0' + (now.getMonth() + 1)).slice(-2) + '-' +
            ('0' + now.getDate()).slice(-2) + ' ' +
            ('0' + now.getHours()).slice(-2) + ':' +
            ('0' + now.getMinutes()).slice(-2) + ':' +
            ('0' + now.getSeconds()).slice(-2);

        try {
            if (props.text === 'edit comment') {
                const res = await axios.post(`http://localhost:3001/editComment?idComment=${id}`, {editorData: editorData})
                if (res.data.msg === 'edit success') {
                    props.onEdit()
                }
            } else if (props.text === 'edit reply') {
                const res = await axios.post(`http://localhost:3001/editReply?idReply=${id}`, {editorData: editorData})
                if (res.data.msg === 'edit success') {
                    props.onEdit()
                }
            } else if (props.text === 'reply comment') {
                const replyData = {
                    idComment: id,
                    idUser: props.idUser,
                    ckeditor: editorData,
                    dateReply: dateReply
                }
                socket.emit('new-reply', replyData)

                const replyData1 = {
                    idComment: id,
                    idPost: props.idPost,
                    idResponder: props.idUser,
                    titlePost: props.titlePost,
                    dateReply: dateReply
                }
                socket.emit(`add-notification-reply`, replyData1)
                props.onEdit()
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <div className={"modal"} id={"modal"}>
                <div className={"coating"}></div>
                <div className={"box"}>
                    <i className={"closeModal"} onClick={() => handleCloseModal(props.idComment)}>
                        <FontAwesomeIcon icon={faXmark}/></i>
                    <div className={"card"}>
                        <div className={"card-title"}>
                            {props.text}
                        </div>
                        <div className={style.boxEditCmt}>
                            <CKEditor
                                config={{
                                    extraPlugins: [uploadPlugin]
                                }}
                                editor={ClassicEditor}
                                data={props.editorData}
                                onReady={editor => {
                                    console.log('Editor is ready to use!', editor);
                                    editor.editing.view.change(writer => {
                                        writer.setStyle(
                                            "height",
                                            "320px",
                                            editor.editing.view.document.getRoot()
                                        );
                                    })
                                }}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    setEditorData(data)
                                    console.log({event, editor, data});
                                }}
                                onBlur={(event, editor) => {
                                    console.log('Blur.', editor);
                                }}
                                onFocus={(event, editor) => {
                                    console.log('Focus.', editor);
                                }}/>
                        </div>
                        <div className={style.listBtn1}>
                            <button onClick={() => handleSubmit(props.idComment)}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default function CommentsChild({onEdit, idPost, titlePost}) {
    const port = window.location.port;
    const ID_SELF = JSON.parse(localStorage.getItem(`sessionProfile${port}`))?.id_account
    const [comments, setComments] = useState([])
    const [modalEdit, setModalEdit] = useState([])
    const location = useLocation()
    const convertDate = (dateString) => {
        const date = parseISO(dateString);
        return formatDistanceToNow(date, {addSuffix: true});
    }

    useEffect(() => {
        axios.get(`http://localhost:3001/getComments?idPost=${location.state.idPost}`)
            .then(res => {
                setComments(res.data.comments)
            })
            .catch(err => console.log(err))

    }, [location.state.idPost])

    const handleEdit = async (text, id, editorData) => {
        try {
            setModalEdit([<FormEdit key={"1"} text={text} idUser={ID_SELF} idComment={id} editorData={editorData}
                                    onEdit={onEdit} idPost={idPost} titlePost={titlePost}/>])
            const modal = document.getElementById("modal")
            if (modal) {
                modal.style.display = "block"
            }
        } catch (e) {
            console.log(e)
        }
    }

    const handleDelete = async (e, text, id) => {
        const answer = window.confirm("Are you sure?");
        if (!answer) {
            e.preventDefault();
        } else {
            try {
                if (text === 'delete comment') {
                    const res = await axios.post(`http://localhost:3001/deleteComment?idComment=${id}`)
                    if (res.data.msg === 'delete success') {
                        onEdit()
                    }
                } else if (text === 'delete reply') {
                    const res = await axios.post(`http://localhost:3001/deleteReply?idReply=${id}`)
                    if (res.data.msg === 'delete success') {
                        onEdit()
                    }
                }
            } catch (e) {
                console.log(e)
            }
        }

    }

    // const socket = io('http://localhost:3002');

    const [comments_, setComments_] = useState([])

    useEffect(() => {
        const idPost = location.state.idPost
        socket.on('comment-success', () => {
            socket.emit('update-comment', idPost)
            socket.on('update-comment-success', (res) => {
                setComments_(res)
            })
        })

        socket.on('reply-success', () => {
            socket.emit('update-comment', idPost)
            socket.on('update-comment-success', (res) => {
                setComments_(res)
            })
        })

        socket.on('reply-success', () => {
            socket.on('update-comment-success', (res) => {
                setComments_(res)
            })
        })

        socket.emit('update-comment', idPost)
        socket.on('update-comment-success', (res) => {
            setComments_(res)
        })

        // return () => {
        //     socket.off('comment-success');
        // };
    }, [])

    return (
        <>
            <ul className={style.comments}>
                {
                    comments_?.map((data, index) => (
                        <div className={style.boxComment} key={index}>
                            <li className={style.comment}
                                id={`comment${data.comment.id_comment}`}>
                                <div className={style.commentator}>
                                    <div className={style.avatarCommentator}>
                                        <img alt={"commentator"}
                                             src={data.comment.avatar}/>
                                    </div>
                                    <div className={style.box1}>
                                        <div className={style.nameCommentator}>
                                            {data.comment.fullName}
                                        </div>
                                        <div className={style.dateComment}>
                                            <i><FontAwesomeIcon icon={faClock}/></i>
                                            <font>
                                                {convertDate(data.comment.date_comment)}
                                            </font>
                                        </div>
                                    </div>
                                </div>
                                <div className={style.contentComment}
                                     dangerouslySetInnerHTML={{__html: data.comment.ckeditor}}></div>
                                <div className={style.listBtnCmt}>
                                    <div className={style.replyCmt}
                                         onClick={() => handleEdit('reply comment', data.comment.id_comment, '', idPost, titlePost)}>
                                        <i><FontAwesomeIcon icon={faReply}/></i><font>Reply</font>
                                    </div>
                                    {
                                        data.comment.id_of_user === ID_SELF &&
                                        <Fragment key={data.id_comment}>
                                            <div className={style.editCmt}
                                                 onClick={() => handleEdit('edit comment', data.comment.id_comment, data.comment.ckeditor)}>
                                                <i><FontAwesomeIcon
                                                    icon={faPenToSquare}/></i><font>Eit</font>
                                            </div>
                                            <div className={style.deleteCmt}
                                                 onClick={e => handleDelete(e, 'delete comment', data.comment.id_comment)}>
                                                <i><FontAwesomeIcon icon={faTrash}/></i>
                                                <font>Remove</font>
                                            </div>
                                        </Fragment>
                                    }
                                </div>
                            </li>
                            <ul className={style.boxReplies}>
                                {
                                    data.replies.map((data1, index) => (
                                        data1.id_of_comment === data.comment.id_comment &&
                                        <li className={style.reply} key={index}>
                                            <div className={style.commentator}>
                                                <div className={style.avatarCommentator}>
                                                    <img alt={"commentator"}
                                                         src={data1.avatar}/>
                                                </div>
                                                <div className={style.box1}>
                                                    <div className={style.nameCommentator}>
                                                        {data1.fullName}
                                                    </div>
                                                    <div className={style.dateComment}>
                                                        <i><FontAwesomeIcon icon={faClock}/></i>
                                                        <font>
                                                            {convertDate(data1.date_reply)}
                                                        </font>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={style.contentComment}
                                                 dangerouslySetInnerHTML={{__html: data1.ckeditor_reply}}></div>
                                            <div className={style.listBtnCmt}>
                                                {
                                                    data1.id_of_user === ID_SELF &&
                                                    <Fragment key={data1.id_of_comment}>
                                                        <div className={style.editCmt}
                                                             onClick={() => handleEdit('edit reply', data1.id_reply, data1.ckeditor_reply)}>
                                                            <i><FontAwesomeIcon
                                                                icon={faPenToSquare}/></i><font>Eit</font>
                                                        </div>
                                                        <div className={style.deleteCmt}
                                                             onClick={e => handleDelete(e, 'delete reply', data1.id_reply)}>
                                                            <i><FontAwesomeIcon icon={faTrash}/></i>
                                                            <font>Remove</font>
                                                        </div>
                                                    </Fragment>
                                                }
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    ))
                }
            </ul>
            {modalEdit}
        </>
    )
}