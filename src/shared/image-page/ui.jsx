import {DefaultImage} from "../ui/defaultImage";
import styles from './styles.module.scss';

export function ImagePage({
    imgDesk,
    imgMob = imgDesk,
    alt = 'Image'
}) {
    return (
        <div className={styles['image_page']}>
            <DefaultImage
                src={imgDesk}
                srcMob={imgMob}
                alt={alt}
            />
        </div>
    )
}
