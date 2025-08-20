import Link from "next/link";

import {DefaultImage} from "../../shared/ui/defaultImage";

import styles from './styles.module.scss';

export function StockTile({data}) {
    return (
        <Link href={`/stocks/${data.id ? data.id : ''}`} className={styles['stock-tile']}>
            <div className={styles['stock-tile__image']}>
                <DefaultImage
                    src={data.image ? data.image : '/images/no-foto.jpg'}
                    alt={data.alt ? data.alt : 'Акция'}
                />
            </div>
            <div className={styles['stock-tile__description']}>
                <div className={styles['stock-tile__store-name']}>{data.storeName?.trim().replace(/\s+/g, ' ')}</div>
                <div className={styles['stock-tile__wrapper']}>
                    <div className={styles['stock-tile__title']}
                         dangerouslySetInnerHTML={{__html: data.heading?.trim().replace(/\s+/g, ' ')}}
                    ></div>
                    <div className={styles['stock-tile__date']}>{data.date?.trim().replace(/\s+/g, ' ')}</div>
                </div>
            </div>
        </Link>
    )
}
