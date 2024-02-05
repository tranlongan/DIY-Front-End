import style from "./paging.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";

export default function Paging({url, numberPage, currentPage}) {
    const items = []
    const navigate = useNavigate()
    const handleNextPage = (i) => {
        navigate(`/?page=${i}`)
        window.scrollTo(0, 2410)
    }
    for (let i = 1; i <= parseInt(numberPage); i++) {
        // items.push(<li key={i} className={`${style.item} ${style.active}`}>{i}</li>);
        items.push(
            <li onClick={() => handleNextPage(i)} key={i}
                className={currentPage !== i ? `${style.item}` : `${style.item} ${style.active}`}>{i}</li>
        );
    }
    return (<>
        <div className={style.paging}>
            <i><FontAwesomeIcon icon={faChevronLeft}/></i>
            <ul className={style.list}>
                {items}
            </ul>
            <i><FontAwesomeIcon icon={faChevronRight}/></i>
        </div>

    </>)
}