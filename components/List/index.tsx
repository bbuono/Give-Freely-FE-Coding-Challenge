import React, { type FC } from "react";
import styles from './list.module.css';

type Props = {
    children: JSX.Element[],
}

const List:FC<Props> = ({children}) => {
    return <ul className={styles.list}>{children}</ul>
}

export default List;