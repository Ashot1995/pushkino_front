import {UISection} from "../ui/section";
import {DefaultImage} from "../ui/defaultImage";

import styles from './styles.module.scss';

export function SingleBanner({
    imgDesk,
    imgMob = imgDesk,
    alt = 'Image'
}) {
    return (
        <UISection defaultClass={styles['single-banner']}>
            <div className={styles['single-banner__image']}>
                <DefaultImage
                    src={imgDesk}
                    srcMob={imgMob}
                    alt={alt}
                />
            </div>
        </UISection>
    )
}
