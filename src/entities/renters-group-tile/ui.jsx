import Link from "next/link";
import {SvgIcon} from "../../shared/ui/svg-icon";

import styles from './styles.module.scss';

export function RentersGroupTile({liter, data}) {
    return (
        <>
            <div className={styles['renters-group-tile']}>
                <div className={styles['renters-group-tile__liter']}>
                    {liter && liter}
                </div>
                <div className={styles['renters-group-tile__renters']}>
                    {
                        data &&
                            data.map((item, index) => <RentersGroupTileRenter data={item} key={index} />)
                    }
                </div>
            </div>
        </>

    )
}

function RentersGroupTileRenter({data}) {
    return (
        <div className={styles['renters-group-tile__renter']}>
            <Link href={`${data.link ? data.link.includes('recreation') ? data.link.replace('recreation', 'entertainments') : data.link : '#!'}`}>
                <div className={styles['renters-group-tile__renter-title']} dangerouslySetInnerHTML={{__html: data.heading?.trim().replace(/\s+/g, ' ')}}></div>
                {/*<div className={styles['renters-group-tile__renter-category']}>*/}
                {/*    {*/}
                {/*        data.category &&*/}
                {/*            data.category.map(category => (*/}
                {/*                `${category.category?.trim().replace(/\s+/g, ' ')} `*/}
                {/*            ))*/}
                {/*    }*/}
                {/*</div>*/}
                <div className={styles['renters-group-tile__renter-stocks']}>
                    {
                        data.new &&
                            <div className={`
                                    ${styles['renters-group-tile__renter-stock']}
                                    ${styles['renters-group-tile__renter-stock_green']}
                                `}
                            >
                                Новинка
                            </div>
                    }
                    {
                        data.has_stocks &&
                        <div className={`
                                ${styles['renters-group-tile__renter-stock']}
                                ${styles['renters-group-tile__renter-stock_orange']}
                            `}
                        >
                            Акции
                        </div>
                    }
                </div>
            </Link>
            <div className={styles['renters-group-tile__renter-navigation']}>
                <div className={styles['renters-group-tile__renter-floor']}>{data.floor && `${data.floor} этаж`}</div>
                {
                    data.idSpace &&
                        <Link href={`/trc-map#${data.idSpace}`} className={styles['renters-group-tile__renter-map']}>
                            <SvgIcon id='map' color='#ed5d2b'/>
                            <span>Показать на карте</span>
                        </Link>
                }
            </div>
        </div>
    )
}
