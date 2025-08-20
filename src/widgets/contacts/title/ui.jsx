import {UISection} from "../../../shared/ui/section";

import styles from './styles.module.scss';

export function ContactsTitle({heading = 'Контакты'}) {
    return (
        <UISection>
            <h1 className={styles['contact__title']}>{heading}</h1>
        </UISection>
    )
}
