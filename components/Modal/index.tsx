import React, { type FC } from "react";
import styles from './modal.module.css';

type Props = {
    title:string,
    message:string,
    onClose:()=>void
}

const Modal:FC<Props> = ({title, message, onClose}) => {
    return <div className={styles.modalContainer}>
        <div onClick={onClose} className={styles.modal}></div>
        <div className={styles.popup}>
            <div className={styles.title}>{title}</div>
            <div className={styles.popupBody}>{message}</div>
            <div className={styles.close} onClick={onClose} id="modal-container-close">x</div>
        </div>
    </div>
}

export default Modal;