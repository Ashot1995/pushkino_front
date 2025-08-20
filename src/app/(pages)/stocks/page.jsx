import {BreadCrumbs} from "../../../widgets/bread-crumbs";
import {StocksCategories} from "../../../widgets/stocks/stocks-categories";
import StocksSort from "../../../widgets/stocks/stocks-sort/ui";
import {StocksList} from "../../../widgets/stocks/stocks-list";

import styles from './styles.module.scss';

import {metaData} from "./config";
import {breadCrumbsLevels} from "./config";

export const metadata = metaData;

export default function StocksListPage({searchParams}) {
    return (
        <>
            <BreadCrumbs levels={breadCrumbsLevels} />
            <main className={styles['stocks-list']}>
                <div className={`${styles['stocks-list']}__container`}>
                    <h1 className={`${styles['stocks-list__heading']} h1 h1_caps`}>Акции</h1>
                    <div className={styles['stocks-list__wrapper']}>
                        <aside className={styles['stocks-list__left-column']}>
                            <StocksCategories />
                            <StocksSort />
                        </aside>
                        <StocksList searchParams={searchParams} />
                    </div>
                </div>
            </main>
        </>
    )
}
