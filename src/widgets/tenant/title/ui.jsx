import {UISection} from "../../../shared/ui/section";
import {SingleBannerWithText} from "../../../shared/single-banner-with-text";

import styles from './styles.module.scss';

export function TenantTitle({heading, data}) {
    return (
        <>
            <UISection>
                <h1 className={styles['tenant__title']}>{heading ? heading : 'Арендаторам'}</h1>
            </UISection>
            <SingleBannerWithText
                data={data}
                bannerSide='right'
                bannerAlign='center'
            />
        </>
    )
}
