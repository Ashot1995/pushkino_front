import {UISection} from "../../../shared/ui/section";
import {ContactBlock} from "../../../shared/contacts";

import styles from './styles.module.scss';

import {CONTACT_DATA} from "./config";

export function TenantContacts({data = CONTACT_DATA}) {
    return (
        <UISection>
            {
                data.map(data =>(
                    <div key={data.id} className={styles['tenant-contacts__block']}>
                        <div className={styles['tenant-contacts__title']}>{data.heading}</div>
                        <div className={styles['tenant-contacts__grid']}>
                            <div className={styles['tenant-contacts__desc']}>{data.description}</div>
                            <div className={styles['tenant-contacts__contacts']}>
                                <ContactBlock data={data} />
                            </div>
                        </div>
                    </div>
                ))
            }
        </UISection>
    )
}
