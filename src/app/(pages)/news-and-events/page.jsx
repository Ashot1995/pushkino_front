import {BreadCrumbs} from "../../../widgets/bread-crumbs";
import {NewsAndEventsHeader} from "../../../widgets/news-and-events/header";
import {NewsAndEventsList} from "../../../widgets/news-and-events/list";

import styles from './styles.module.scss';
import {metaData} from "./config";
import {breadCrumbsLevels} from "./config";

export const metadata = metaData;

export default function NewsAndEventsPage() {
    return (
        <>
            <BreadCrumbs levels={breadCrumbsLevels} />
            <main className={styles['news-and-events']}>
                <NewsAndEventsHeader />
                <NewsAndEventsList />
            </main>
        </>
    )
}
