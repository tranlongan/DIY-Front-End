import style from './PostProject2.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight, faPlus, faXmark} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useRef, useState} from "react";
import {useLocation} from "react-router-dom";
import axios from "axios";

export default function PostProjectStage2() {
    const location = useLocation()
    const labelProductPicture_ = useRef(null)
    const inputTitlePhoto_ = useRef(null)
    const imgSrc_ = useRef(null)
    const box_ = useRef(null)
    const postProject_ = useRef(null)


    const [productPicture, setProductPicture] = useState(undefined)
    const [imgSrc, setImgSrc] = useState(undefined)
    const [nameProduct, setNameProduct] = useState("")
    const [pricePrd, setPricePrd] = useState("")
    const [linkProduct, setLinkProduct] = useState("")
    const [products, setProducts] = useState([])
    const [imgProducts, setImgProducts] = useState([])
    const [nameProducts, setNameProducts] = useState([])
    useEffect(() => {
        if (productPicture === undefined) {
            return
        } else {
            labelProductPicture_.current.textContent = productPicture.name
            const reader = new FileReader()
            reader.addEventListener('load', e => {
                setImgSrc(e.target.result)
            })
            reader.readAsDataURL(productPicture)
        }
    }, [productPicture])

    useEffect(() => {
        products.forEach(item => {
            // console.log(item.img)
        })
    }, [products])

    function disableScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

        window.onscroll = () => {
            window.scrollTo(scrollLeft, scrollTop);
        };
    }

    function enableScroll() {
        window.onscroll = function () {
        };
    }

    function closeForm() {
        box_.current.style.display = "none"
        enableScroll()
    }

    const [products1, setProducts1] = useState([])

    const confirm = async () => {
        try {
            const obj = {
                img: productPicture,
                imgSrc: imgSrc,
                nameProduct: nameProduct,
                pricePrd: pricePrd,
                linkProduct: linkProduct
            }
            setProducts(value => [...value, obj])

            setImgProducts(imgPrd => [...imgPrd, productPicture])
            setNameProducts(namePrd => [...namePrd, nameProduct])
            closeForm()
        } catch (e) {
            console.log(e)
        }
    }

    const handleOpenForm = () => {
        box_.current.style.display = "block"
        setProductPicture(undefined)
        setImgSrc(undefined)
        setNameProduct("")
        setPricePrd("")
        setLinkProduct("")
        labelProductPicture_.current.textContent = "Chọn ảnh minh họa cho sản phẩm"
        disableScroll()
    }

    const handleSubmitProducts = async () => {
        try {
            const formData = new FormData()
            formData.append('image', location.state.titlePhoto)
            nameProducts.forEach(nameProduct => {
                formData.append('nameProduct', nameProduct)
            })
            imgProducts.forEach(file => {
                formData.append('images', file)
            })

            await axios.post('http://localhost:3001/uploadProducts', formData)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <div className={style.postProject} ref={postProject_}>
                <div className={style.title}>
                    đăng một dự án <i><FontAwesomeIcon icon={faChevronRight}/></i>
                    <span>Sản phẩm sử dụng trong bài đăng</span>
                </div>
                <div className={style.boxProducts}>
                    <div className={style.btnAddPrd}>
                        <button onClick={handleOpenForm}><i><FontAwesomeIcon icon={faPlus}/></i></button>
                    </div>
                    <div className={style.listProducts}>
                        {
                            products?.map((data, index) => (
                                <div className={style.product} key={index}>
                                    <img alt={"product"}
                                         src={data.imgSrc}/>
                                    <div className={style.name_Product}>
                                        {data.nameProduct}
                                    </div>
                                    <div className={style.pricePrd}>
                                        {data.pricePrd}<sup>đ</sup>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    {/*<input type={"file"} multiple={true} onChange={handleFileChange}/>*/}
                    <div className={style.listBtn}>
                        <button>Quay lại</button>
                        <button onClick={handleSubmitProducts}>Đăng bài</button>
                    </div>
                </div>
            </div>
            <div className={style.box} ref={box_}>
                <div className={style.coating}></div>
                <div className={style.form}>
                    <i className={style.iconClose} onClick={closeForm}><FontAwesomeIcon icon={faXmark}/></i>
                    <div className={style.titlePhoto}>
                        <input type={"file"} id={"inputProductPicture"} placeholder={"Chọn ảnh minh họa cho sản phẩm"}
                               ref={inputTitlePhoto_} onChange={e => setProductPicture(e.target.files[0])}/>
                        <label htmlFor="inputProductPicture" ref={labelProductPicture_}>
                            Chọn ảnh minh họa cho sản phẩm
                        </label>
                    </div>
                    <div className={style.boxImg}>
                        <img alt={""} ref={imgSrc_} src={imgSrc}/>
                    </div>
                    <div className={style.nameProduct}>
                        <input type={"text"} placeholder={"Tên sản phẩm"}
                               onChange={e => setNameProduct(e.target.value)} value={nameProduct}/>
                    </div>
                    <div className={style.priceOfPrd}>
                        <input type={"text"} placeholder={"Giá thành"}
                               onChange={e => setPricePrd(e.target.value)} value={pricePrd}/>
                    </div>
                    <div className={style.linkProduct}>
                        <input type={"text"} placeholder={"Link sản phẩm"}
                               onChange={e => setLinkProduct(e.target.value)} value={linkProduct}/>
                    </div>
                    <div className={style.btn}>
                        <button onClick={confirm}>
                            Thêm
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}