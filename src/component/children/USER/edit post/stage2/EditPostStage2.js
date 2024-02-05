import style from "./editPostStage2.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGripLinesVertical, faPlus, faXmark} from "@fortawesome/free-solid-svg-icons";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import axios from "axios";


const EditProduct = (props) => {
    const navigate = useNavigate()
    const [price, setPrice] = useState('')
    const [link, setLink] = useState('')
    const [image, setImage] = useState(undefined)
    const [nameProduct, setNameProduct] = useState('')

    const handleCloseModal = () => {
        // const modal = document.getElementById('modal')
        navigate(0)
    }

    const handleChangeIllustrationProduct = (e) => {
        const illustrationProduct = document.getElementById('illustrationProduct')
        const [file] = e.target.files
        if (file) {
            illustrationProduct.src = URL.createObjectURL(file)
            setImage(file)
        }
    }

    const handleEditProduct = async (idProduct) => {
        const formData = new FormData()
        image === undefined ? formData.append('images', props.product.illustration_product) : formData.append('images', image)
        nameProduct.length <= 0 ? formData.append('nameProduct', props.product.name_product) : formData.append('nameProduct', nameProduct)
        price.length <= 0 ? formData.append('price', props.product.product_price) : formData.append('price', price)
        link.length <= 0 ? formData.append('linkProduct', props.product.link_product) : formData.append('linkProduct', link)
        try {
            const res = await axios.post(`http://localhost:3001/editPostStage2?idProduct=${idProduct}`, formData)
            if (res.data.msg === 'edit success') {
                navigate(0)
            }
        } catch (e) {
            console.log(e)
        }
    }

    const inputNameProduct_ = useRef(null)
    const inputPrice_ = useRef(null)
    const inputLinkProduct_ = useRef(null)

    return (
        <>
            <div id={"modal"} className={`modal`}>
                <div className={"coating"}></div>
                <div className={'box'}>
                    <i onClick={handleCloseModal} className={"closeModal"}>
                        <FontAwesomeIcon icon={faXmark}/></i>
                    <div className={"card"}>
                        <div className={"card-title"}>
                            edit form
                        </div>
                        <div className={style.content}>
                            <div className={style.illustration}>
                                <img alt={"img"} id={"illustrationProduct"}
                                     src={props.product.illustration_product}/>
                                <input type={"file"} accept={"image/*"}
                                       onChange={handleChangeIllustrationProduct}/>
                            </div>
                            <input type={"text"} placeholder={props.product.name_product} value={nameProduct}
                                   ref={inputNameProduct_}
                                   onChange={e => {
                                       setNameProduct(e.target.value)
                                   }}/>
                            <input type={"text"} placeholder={props.product.product_price} value={price}
                                   ref={inputPrice_}
                                   onChange={e => setPrice(e.target.value)}/>
                            <input type={"text"} placeholder={props.product.link_product} value={link}
                                   ref={inputLinkProduct_}
                                   onChange={e => setLink(e.target.value)}/>
                            <div className={style.listBtn}>
                                <button onClick={() => handleEditProduct(props.product.id_product)}>Confirm</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

const AddProduct = () => {
    const navigate = useNavigate()
    const {state} = useLocation()
    const [nameProduct, setNameProduct] = useState('')
    const [price, setPrice] = useState('')
    const [link, setLink] = useState('')
    const [image, setImage] = useState(undefined)

    const handleCloseModal = () => {
        navigate(0)
    }

    const handleChangeIllustration = (e) => {
        const illustrationProduct = document.getElementById('illustrationProduct')
        const [file] = e.target.files
        if (file) {
            illustrationProduct.src = URL.createObjectURL(file)
            setImage(file)
        }
    }

    const handleAddProduct = async () => {
        const formData = new FormData()
        formData.append('images', image)
        formData.append('nameProduct', nameProduct)
        formData.append('price', price)
        formData.append('linkProduct', link)
        try {
            const res = await axios.post(`http://localhost:3001/addProduct?idPost=${state.idPost}`, formData)
            if (res.data.msg === 'add success'){
                navigate(0)
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <div id={"modal"} className={`modal`}>
                <div className={"coating"}></div>
                <div className={'box'}>
                    <i onClick={handleCloseModal} className={"closeModal"}>
                        <FontAwesomeIcon icon={faXmark}/></i>
                    <div className={"card"}>
                        <div className={"card-title"}>
                            add form
                        </div>
                        <div className={style.content}>
                            <div className={style.illustration}>
                                <img alt={"img"} id={"illustrationProduct"}
                                     src={"https://i.pinimg.com/564x/32/79/01/327901f6afe99fe7bd044a28aa9c536c.jpg"}/>
                                <input type={"file"} accept={"image/*"} onChange={handleChangeIllustration}/>
                            </div>
                            <input type={"text"} placeholder={"name product"} value={nameProduct}
                                   onChange={e => setNameProduct(e.target.value)}/>
                            <input type={"text"} placeholder={"price"} value={price}
                                   onChange={e => setPrice(e.target.value)}/>
                            <input type={"text"} placeholder={"link product"} value={link}
                                   onChange={e => setLink(e.target.value)}/>
                            <div className={style.listBtn}>
                                <button onClick={handleAddProduct}>Add</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default function EditPostStage2() {
    const navigate = useNavigate()
    const {state} = useLocation()
    const [posts, setPosts] = useState([])
    const [modalEdit, setModalEdit] = useState([]);
    const [modalAdd, setModalAdd] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:3001/getPost?idPost=${state.idPost}`)
            .then(res => {
                setPosts(res.data.posts)

            })
    }, [state.idPost])

    const handleOpenModalEditProduct = async (idProduct) => {
        try {
            const res = await axios.get(`http://localhost:3001/getProduct?idProduct=${idProduct}`)
            setModalEdit([<EditProduct key={"1"} product={res.data.product[0]}/>]);
        } catch (e) {
            console.log(e)
        }
    }

    const handleOpenModalAddProduct = async () => {
        setModalAdd([<AddProduct key={"2"}/>]);
    }

    return (
        <>
            <div className={style.editPost}>
                <div className={"container"}>
                    {
                        posts.map((data, index) => (
                            <div key={index}>
                                <div className={style.boxList}>
                                    <div onClick={() => navigate('/editPost/stage1', {
                                        state: {
                                            idPost: data.post.id_post,
                                            idUser: data.infoUser[0].id_account
                                        }
                                    })}>
                                        Content
                                    </div>
                                    <div><i><FontAwesomeIcon icon={faGripLinesVertical}/></i></div>
                                    <div className={style.active} onClick={() => navigate('/editPost/stage2', {
                                        state: {
                                            idPost: data.post.id_post,
                                            idUser: data.infoUser[0].id_account
                                        }
                                    })}>
                                        Products
                                    </div>
                                </div>
                                <div className={style.btnAddPrd}>
                                    <button onClick={handleOpenModalAddProduct}>
                                        <i><FontAwesomeIcon icon={faPlus}/></i>
                                    </button>
                                </div>
                                <div className={style.boxProducts}>
                                    <div className={style.listProducts}>
                                        {
                                            data.productsInPosts?.map((data, index) => (
                                                <div onClick={() => handleOpenModalEditProduct(data.id_product)}
                                                     className={style.product} key={index}>
                                                    <img alt={"product"}
                                                         src={data.illustration_product}/>
                                                    <div className={style.name_Product}>
                                                        {data.name_product}
                                                    </div>
                                                    <div className={style.pricePrd}>
                                                        {Intl.NumberFormat().format(data.product_price)}<sup>đ</sup>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            {modalEdit}
            {modalAdd}
        </>
    )
}