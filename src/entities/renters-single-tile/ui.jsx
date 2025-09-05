import Link from "next/link";

import {SvgIcon} from "../../shared/ui/svg-icon";
import {DefaultImage} from "../../shared/ui/defaultImage";

import styles from './styles.module.scss';

export function RentersSingleTile({data}) {
    if (!data) {
        return null;
    }
    
    return (
        <div className={styles['renters-single-tile']}>
            <Link href={`${data.link ? data.link.includes('recreation') ? data.link.replace('recreation', 'entertainments') : data.link : '#!'}`}>
                <div className={styles['renters-single-tile__stocks']}>
                    {
                        data.has_stocks &&
                            <div
                                    className={`
                                    ${styles['renters-single-tile__stock']}
                                    ${styles['renters-single-tile__stock_green']}
                                `}
                            >Акции</div>
                    }
                    {
                        data.new &&
                            <div
                                    className={`
                                    ${styles['renters-single-tile__stock']}
                                    ${styles['renters-single-tile__stock_orange']}
                                `}
                            >Новинка</div>
                    }
                </div>
                <div className={styles['renters-single-tile__image']}>
                    <DefaultImage
                        src={data.logo ? data.logo : '/images/no-foto.jpg'}
                        alt={data.alt ? data.alt : 'Логотип'}
                    />
                </div>
                <div className={styles['renters-single-tile__title']} dangerouslySetInnerHTML={{ __html: data.heading?.trim().replace(/\s+/g, ' ')}}></div>
                {/* Категории пока убрали (блок не убирать) */}
                {/*{*/}
                {/*    data.category &&*/}
                {/*        <div className={styles['renters-single-tile__category']}>*/}
                {/*            {*/}
                {/*                data.category.map(category => (*/}
                {/*                    `${category.category?.trim().replace(/\s+/g, ' ')} `*/}
                {/*                ))*/}
                {/*            }*/}
                {/*        </div>*/}
                {/*}*/}
            </Link>
            <div className={styles['renters-single-tile__location']}>
                {
                data.idSpace &&
                        <Link href={`/trc-map?id=${data.idSpace}`} className={styles['renters-single-tile__map']}>
                            <SvgIcon id='map' color='#ed5d2b' />
                            <span>Показать на карте</span>
                        </Link>
                }
                <div className={styles['renters-single-tile__floor']}>{data.floor !== null && (data.floor === 0 ? `Паркинг` : `${data.floor} этаж`)}</div>
            </div>
        </div>
    )
}
