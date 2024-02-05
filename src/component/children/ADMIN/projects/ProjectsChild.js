import style from "./projectChild.module.css";
import {useEffect, useState} from "react";
import axios from "axios";
import {faPlus, faXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useNavigate} from "react-router-dom";

const Form = ({handleClose}) => {
    const navigate = useNavigate()
    const [nameProject, setNameProject] = useState('')
    const [description, setDescription] = useState('')
    const [imageProject, setImageProject] = useState(undefined)
    const handleCloseModal = () => {
        handleClose()
    }

    const handleChangeImg = (e) => {
        const illustration = document.getElementById('illustration')
        const [file] = e.target.files
        if (file) {
            illustration.src = URL.createObjectURL(file)
            setImageProject(file)
        }
    }

    const handleSubmit = async (e) => {
        try {
            const answer = window.confirm("Are you sure?");
            if (!answer) {
                e.preventDefault();
            } else{
                alert("Thêm vào thì phải train lại AI")
            }
                // const res = await axios.post(`http://localhost:3001/admin/addProject`, {
            //     imageProject: imageProject,
            //     nameProject: nameProject,
            //     description: description
            // })

            // if (res.data.msg === 'add success') {
            //     navigate(0)
            // }
        } catch (e) {
            console.log(e)
        }
    }



    return (
        <>
            <div className={"modal"} id={"modal"}>
                <div className={"coating"}></div>
                <div className={"box"}>
                    <i className={"closeModal"} onClick={handleCloseModal}>
                        <FontAwesomeIcon icon={faXmark}/></i>
                    <div className={"card"}>
                        <div className={"card-title"}>
                            title
                        </div>

                        <div className={style.content}>
                            <div className={style.boxIllustration1}>
                                <div className={style.boxImg}>
                                    <img alt={"illustration"} id={"illustration"}
                                         src={"https://i.pinimg.com/564x/13/61/df/1361df8044e680f4199826bb853ef18d.jpg"}/>
                                </div>
                                <input type={"file"} accept={"image/*"} onChange={handleChangeImg}/>
                            </div>

                            <div>
                                <input type={"text"} placeholder={"Name project"} value={nameProject}
                                       onChange={e => setNameProject(e.target.value)}/>
                                <input type={"text"} placeholder={"Description project"} value={description}
                                       onChange={e => setDescription(e.target.value)}/>
                            </div>
                            <div className={style.btnModal}>
                                <button onClick={handleSubmit}>Submit</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default function ProjectsChild() {
    const [projects, setProjects] = useState([])
    const [modal, setModal] = useState([])

    const [searchContent, setSearchContent] = useState('')



    useEffect(() => {
        axios.get(`http://localhost:3001/admin/getProjects`)
            .then(res => {
                setProjects(res.data.projects)
            })
            .catch(err => console.log(err))
    }, [])

    const handleClose = () => {
        setModal([])
    }

    const handleOpenModal = () => {
        setModal([<Form handleClose={handleClose}/>])
    }

    const handleSearch = (e) => {
        setSearchContent(e.target.value)
    }

    const results = !searchContent
        ? projects
        : projects.filter(project =>
            project.name_project.toLowerCase().includes(searchContent.toLocaleLowerCase())
        );
    return (
        <>
            <div className={style.container}>
                <div className={style.title}>
                    <h1>Projects</h1>
                    <button onClick={handleOpenModal}><i><FontAwesomeIcon icon={faPlus}/></i><span>Add</span></button>
                </div>
                <div className={style.search}>
                    <input type={"text"} placeholder={"Enter project"} value={searchContent} onChange={handleSearch}/>
                </div>
                <div className={style.listCard}>
                    {
                        results?.map((data, index) => (
                            <div className={style.card} key={index}>
                                <div className={style.boxIllustration}>
                                    <img alt={"img"}
                                         src={data.img_project}/>
                                </div>
                                <div className={style.boxInfo}>
                                    <div className={style.nameProject}>{data.name_project}</div>
                                    <div className={style.listBtn}>
                                        <button>Edit</button>
                                        <button>Remove</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                {
                    modal
                }
            </div>
        </>
    )
}