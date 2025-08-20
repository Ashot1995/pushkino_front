import Link from "next/link";

import {DefaultImage} from "../../shared/ui/defaultImage";

import styles from './styles.module.scss';

export function NewsAndEventsListTile({data}) {
    return (
        <Link href={data.link ? data.link : '#!'} className={styles['news-events-tile']}>
            <div className={styles['news-events-tile__image']}>
                <DefaultImage
                    src={data.image ? data.image : "/images/no-foto.jpg"}
                    alt={data.alt ? data.alt : "Картинка новости"}
                />
            </div>
            <div className={styles['news-events-tile__title']}
                 dangerouslySetInnerHTML={{__html: data.heading?.trim().replace(/\s+/g, ' ')}}
            ></div>
        </Link>
    )
}
