import Link from "next/link";

import styles from './styles.module.scss';

export function Checkbox({label = '', labelAnchor = '', link = 'https://ya.ru', checked, onChange}) {
    return (
        <>
            <label className={styles['checkbox']}>
                <input type="checkbox" checked={checked} onChange={onChange}/>
                <span className={styles['checkbox-check']}></span>
                <span>{label} <Link href={link}>{labelAnchor}</Link></span>
            </label>
        </>
    )
}
