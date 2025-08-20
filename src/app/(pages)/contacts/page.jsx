import {BreadCrumbs} from "../../../widgets/bread-crumbs";
import {ContactsTitle} from "../../../widgets/contacts/title";
import {ContactsBlock} from "../../../widgets/contacts/contacts-block";
import {networkService} from "../../../shared/lib/network";

import styles from  './styles.module.scss'

import {BREAD_CRUMBS_LEVELS} from "./config";

export async function generateMetadata() {
    const data = await networkService().getContacts();

    return {
        title: data.metaTitle,
        description: data.metaDescription,
        keywords: data.metaKeywords,
    }
}

export default async function ContactPage() {
    const contactsData = await networkService().getContacts();

    return (
        <>
            <BreadCrumbs levels={BREAD_CRUMBS_LEVELS}/>

            <main className={styles['contact']}>
                {
                    contactsData &&
                        <>
                            <ContactsTitle heading={contactsData.heading} />
                            <ContactsBlock data={contactsData} />
                        </>
                }
            </main>
        </>
    );
}
