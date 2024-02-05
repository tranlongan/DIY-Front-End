import style from './editPostStage1.module.css'
import '../../../../../css default/base.css'
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFloppyDisk, faGripLinesVertical} from "@fortawesome/free-solid-svg-icons";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";

export default function EditPostStage1() {
    const navigate = useNavigate()
    const {state} = useLocation()
    const API_URl = "http://localhost:3001"
    const UPLOAD_ENDPOINT = "uploadImgOfEditor";

    const [editorData, setEditorData] = useState({})
    const [image, setImage] = useState(undefined)
    const [posts, setPosts] = useState([])
    const [nameProject, setNameProject] = useState('')

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

    const handleChangeIllustration = (e) => {
        const illustration = document.getElementById('illustration')
        const [file] = e.target.files
        if (file) {
            illustration.src = URL.createObjectURL(file)
            setImage(file)
        }
    }

    useEffect(() => {
        axios.get(`http://localhost:3001/getPost?idPost=${state.idPost}`)
            .then(res => {
                setPosts(res.data.posts)
            })
    }, [state.idPost])

    // console.log(posts[0]?.post.ckeditor)
    const handleEditPost = async (idPost) => {
        const formData = new FormData()
        image === undefined ? formData.append("image", posts[0]?.post.illustration_post) : formData.append("image", image)
        nameProject.length <= 0 ? formData.append('nameProject', posts[0]?.post.title_post) : formData.append('nameProject', nameProject)
        editorData.length === undefined ? formData.append('ckeditor', posts[0]?.post.ckeditor) : formData.append('ckeditor', editorData)
        try {
            const res = await axios.post(`http://localhost:3001/editPostStage1?idPost=${idPost}`, formData)
            if (res.data.msg === 'edit success') {
                navigate(0)
            }
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <>
            {
                posts.map((data, index) => (
                    <div className={style.editPost} key={index}>
                        <div className={style.boxBtn}>
                            <button onClick={() => handleEditPost(data.post.id_post)}>
                                <i><FontAwesomeIcon icon={faFloppyDisk}/></i>
                            </button>
                        </div>
                        <div className={"container"}>
                            <div>
                                <div className={style.boxList}>
                                    <div className={style.active} onClick={() => navigate('/editPost/stage1', {
                                        state: {
                                            idPost: data.post.id_post,
                                            idUser: data.infoUser[0].id_account
                                        }
                                    })}>
                                        Content
                                    </div>
                                    <div><i><FontAwesomeIcon icon={faGripLinesVertical}/></i></div>
                                    <div onClick={() => navigate('/editPost/stage2', {
                                        state: {
                                            idPost: data.post.id_post,
                                            idUser: data.infoUser[0].id_account
                                        }
                                    })}>
                                        Products
                                    </div>
                                </div>
                                <div className={"row"}>
                                    <div className={`${style.box1} col col-3`}>
                                        <div className={style.title}>
                                            Illustration & Title Project
                                        </div>
                                        <div className={style.form}>
                                            <div className={style.boxIllustration}>
                                                <img src={data.post.illustration_post}
                                                     alt={"illustration"} id={"illustration"}/>
                                            </div>
                                            <input type={"file"} accept={"image/*"}
                                                   onChange={handleChangeIllustration}/>
                                            <input className={style.inputTitle} type={"text"} value={nameProject}
                                                   placeholder={data.post.title_post}
                                                   onChange={e => setNameProject(e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className={"col col-9"}>
                                        <div className={style.title}>
                                            Description
                                        </div>
                                        <div className={style.editor}>
                                            <CKEditor
                                                config={{
                                                    extraPlugins: [uploadPlugin]
                                                }}
                                                editor={ClassicEditor}
                                                data={data.post.ckeditor}
                                                onReady={editor => {
                                                    // You can store the "editor" and use when it is needed.
                                                    editor.editing.view.change(writer => {
                                                        writer.setStyle(
                                                            "height",
                                                            "450px",
                                                            editor.editing.view.document.getRoot()
                                                        );
                                                    })
                                                    console.log('Editor is ready to use!', editor);
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    )
}