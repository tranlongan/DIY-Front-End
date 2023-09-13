import style from './postProjectStage1.module.css'
import {useEffect, useRef, useState} from "react";
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useNavigate} from "react-router-dom";

export default function PostProjectStage1() {
    const [titlePhoto, setTitlePhoto] = useState(undefined)
    const [titlePhotoSrc, setTitlePhotoSrc] = useState(undefined)
    const [nameProject, setNameProject] = useState('')
    const inputTitlePhoto_ = useRef(null)
    const labelTitlePhoto_ = useRef(null)
    const inputNameProject_ = useRef(null)
    const labelNameProject_ = useRef(null)
    const navigate = useNavigate()
    useEffect(() => {
        if (titlePhoto === undefined) {
            return
        } else {
            labelTitlePhoto_.current.textContent = titlePhoto.name
            const reader = new FileReader()
            reader.addEventListener('load', e => {
                setTitlePhotoSrc(e.target.result)
            })
            reader.readAsDataURL(titlePhoto)
        }
    }, [titlePhoto])
    const API_URl = "http://localhost:3001"
    const UPLOAD_ENDPOINT = "uploadImgOfEditor";
    const [editorData, setEditorData] = useState({})

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

    const handleChangeTitlePhoto = (e) => {
        setTitlePhoto(e.target.files[0])
    }
    const handleFocusNamePrj = (e) => {
        labelNameProject_.current.style.top = "4px"
        labelNameProject_.current.style.left = "8px"
    }

    const handleFocusOutNamePrj = (e) => {
        if (nameProject === '') {
            labelNameProject_.current.style.top = "20px"
            labelNameProject_.current.style.left = "24px"
        } else {
            labelNameProject_.current.style.top = "4px"
            labelNameProject_.current.style.left = "8px"
        }
    }

    const handleNextStage = () => {
        navigate('/postProject/stage2', {
            state: {
                namePrj: nameProject,
                titlePhoto: inputTitlePhoto_.current.files[0],
                ckeditorData: editorData
            }
        })
    }
    return (
        <>
            <div className={style.postProject}>
                <div className={style.title}>
                    đăng một dự án <i><FontAwesomeIcon icon={faChevronRight}/></i> <span>Tiêu đề & nội dung</span>
                </div>
                <div className={style.form}>
                    <div className={style.nameProject}>
                        <input type={"text"} id={"inputNamePrj"} ref={inputNameProject_}
                               onChange={e => setNameProject(e.target.value)} value={nameProject}
                               onFocus={handleFocusNamePrj} onBlur={handleFocusOutNamePrj}/>
                        <label htmlFor={"inputNamePrj"} ref={labelNameProject_}>Tên dự án</label>
                    </div>
                    <div className={style.titlePhoto}>
                        <input type={"file"} id={"inputTitlePhoto"} placeholder={"Chọn ảnh minh họa cho bài viết"}
                               ref={inputTitlePhoto_} onChange={handleChangeTitlePhoto}/>
                        <label htmlFor="inputTitlePhoto" ref={labelTitlePhoto_}>Add profile picture</label>
                    </div>
                    <div className={style.boxTitlePhoto}>
                        <img alt={''} src={titlePhotoSrc}/>
                    </div>
                    <div className={style.editor}>
                        <CKEditor
                            config={{
                                extraPlugins: [uploadPlugin]
                            }}
                            editor={ClassicEditor}
                            data=""
                            onReady={editor => {
                                // You can store the "editor" and use when it is needed.
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
                    <div className={style.btn}>
                        <button onClick={handleNextStage}>Tiếp tục</button>
                    </div>
                </div>
            </div>
        </>
    )
}