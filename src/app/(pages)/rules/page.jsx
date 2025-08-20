import {BreadCrumbs} from "../../../widgets/bread-crumbs";
import {AboutTitle} from "../../../widgets/about/title";
import {AboutPresentation} from "../../../widgets/about/presentation";
import {networkService} from "../../../shared/lib/network";
import {SinglePageHeader} from "../../../shared/ui/single-page-header";

import styles from  './styles.module.scss'

import {BREAD_CRUMBS_LEVELS} from "./config";

export async function generateMetadata() {
    const data = await networkService().getRules();

    return {
        title: data.metaTitle,
        description: data.metaDescription,
        keywords: data.metaKeywords,
    }
}

export default async function RulesPage() {
    const rulesData = await networkService().getRules();

    return (
        <>
            <style>{`
                .rules .single-page-header__heading {
                    color: var(--color-primary-blue);
                    font-size: 6.2rem;
                    font-weight: 600;
                    line-height: normal;
                    text-transform: uppercase;
                }
                
                @media screen and (max-width: 720px) {
                    .rules .single-page-header__heading {
                        font-size: 3.2rem;
                    }
                }
            `}</style>

            <BreadCrumbs levels={BREAD_CRUMBS_LEVELS}/>

            <main className={`
                ${styles['rules']}
                rules
            `}>
                <SinglePageHeader
                    data={rulesData}
                    blockReverse={true}
                />
            </main>
        </>
    );
}
