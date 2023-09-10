import style from "./paging.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";

export default function Paging() {
    return (
        <>
            <div className={style.paging}>
                <i><FontAwesomeIcon icon={faChevronLeft} /></i>
                <ul className={style.list}>
                    <li className={`${style.item} ${style.active}`}>1</li>
                    <li className={style.item}>2</li>
                    <li className={style.item}>3</li>
                    <li className={style.item}>4</li>
                    <li className={style.item}>5</li>
                    <li className={style.item}>6</li>
                    <li className={style.item}>7</li>
                    <li className={style.item}>8</li>
                </ul>
                <i><FontAwesomeIcon icon={faChevronRight} /></i>
            </div>

        </>
    )
}