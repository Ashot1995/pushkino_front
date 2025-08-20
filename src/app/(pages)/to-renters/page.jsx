import { BreadCrumbs } from "../../../widgets/bread-crumbs";
import { TenantTitle } from "../../../widgets/tenant/title";
import { TenantNums } from "../../../widgets/tenant/nums";
import { TenantContacts } from "../../../widgets/tenant/contacts";
import { networkService } from "../../../shared/lib/network";
import { ToRentersPageFeedback } from "../../../widgets/tenant/feedback";

import styles from './styles.module.scss'

import { BREAD_CRUMBS_LEVELS } from "./config";

export async function generateMetadata() {
    const data = await networkService().getToRenters();

    return {
        title: data.metaTitle ? data.metaTitle : "Арендаторам",
        description: data.metaDescription,
        keywords: data.metaKeywords,
    }
}

export default async function ToRentersPage() {
    const toRentersData = await networkService().getToRenters();

    return (
        <>
            <BreadCrumbs levels={BREAD_CRUMBS_LEVELS} />

            <main className={styles['tenant']}>
                {
                    toRentersData.mainBanner &&
                    <TenantTitle
                        heading={toRentersData.heading}
                        data={toRentersData.mainBanner}
                    />
                }
                {
                    toRentersData.advantagesList &&
                    <TenantNums data={toRentersData.advantagesList} />
                }
                {
                    toRentersData.contactsList &&
                    toRentersData.contactsList.length > 0 &&
                    <TenantContacts data={toRentersData.contactsList} />
                }
                <ToRentersPageFeedback />
            </main>
        </>
    );
}
