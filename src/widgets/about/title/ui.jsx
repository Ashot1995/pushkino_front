import {UISection} from "../../../shared/ui/section";

import styles from './styles.module.scss';

export function AboutTitle({heading}) {

    return (
        <UISection >
            <h1 className={styles['about__title']}>{heading}</h1>
        </UISection>
    )
}
