import React, { type FC } from "react";
import styles from './listItem.module.css';
import { Link } from "react-router-dom";

type Props = {
    name:string,
    url?: string,
    messages:string[]
}

const ListItem:FC<Props> = ({name, url, messages}) => {
    return <li className={styles.item}>{
        <Link to={`/company/${name}`} state={{ url, messages }} >{name}</Link>
    }</li>
}

export default ListItem;