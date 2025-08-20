import {BreadCrumbs} from "../bread-crumbs";
import {SinglePageHeader} from "../../shared/ui/single-page-header";
import {SingleBanner} from "../../shared/single-banner";
import {SingleBannerWithText} from "../../shared/single-banner-with-text";
import {SingleStockLinksToLandings} from "../../entities/single-stock/links-to-landigs";
import {SingleStockPartners} from "../../entities/single-stock/partners";
import {SinglePagePartners} from "../../shared/ui/partners";
import {Gallery} from "../../shared/ui/gallery";
import {SingleStockOtherStocks} from "../../entities/single-stock/other-stocks";

import styles from './styles.module.scss';

export function SingleStockWidget({data}) {
    const breadCrumbsLevels = [
        {
            levelName: 'Главная',
            levelLink: '/',
        },
        {
            levelName: 'Акции',
            levelLink: '/stocks',
        },
        {
            levelName: data.header.heading ? data.header.heading : 'Акция',
            levelLink: '',
        },
    ];

    return (
        <>
            <BreadCrumbs levels={breadCrumbsLevels} />

            <main className={styles['single-renter']}>
                {
                    data &&
                        <>
                            {
                                data.header && <SinglePageHeader data={data.header}/>
                            }

                            {
                                data.additionalBanner.desktopImage &&
                                    <SingleBanner
                                        imgDesk={data.additionalBanner.desktopImage}
                                        imgMob={data.additionalBanner.mobileImage ? data.additionalBanner.mobileImage : data.additionalBanner.desktopImage}
                                        alt={data.additionalBanner.alt ? data.additionalBanner.alt : 'Дополнительный баннер'}
                                    />
                            }

                            {
                                data.bannersWithText?.length > 0 &&
                                    data.bannersWithText.map((banner, index) => (
                                            <SingleBannerWithText
                                                data={banner}
                                                bannerSide={index % 2 === 0 ? 'left' : 'right'}
                                                key={index}
                                            />
                                        ))
                            }

                            {
                                data.linksToLandings &&
                                    data.linksToLandings.length > 0 &&
                                        <SingleStockLinksToLandings data={data.linksToLandings} />
                            }

                            {
                                data.partners &&
                                    data.partners.length > 0 &&
                                    <SinglePagePartners data={data.partners} />
                            }

                            {
                                data.gallery &&
                                    data.gallery.length > 0 &&
                                        <Gallery data={data.gallery} />
                            }

                            {
                                data.otherStocks &&
                                    data.otherStocks.length > 0 &&
                                        <SingleStockOtherStocks data={data.otherStocks} />
                            }
                        </>
                }
            </main>
        </>
    )
}
