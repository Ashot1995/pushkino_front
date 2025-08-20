import {BreadCrumbs} from "../../../../../widgets/bread-crumbs";
import {SinglePageHeader} from "../../../../../shared/ui/single-page-header";
import {Gallery} from "../../../../../shared/ui/gallery";
import {SingleBannerWithText} from "../../../../../shared/single-banner-with-text";
import {SinglePagePartners} from "../../../../../shared/ui/partners";
import {SingleEventOtherNewsAndEvents} from "../../../../../shared/ui/other-news-events";
import {networkService} from "../../../../../shared/lib/network";

import styles from './styles.module.scss';

export async function generateMetadata({params}) {
    const data = await networkService().getNew(params.id);

    return {
        title: data.header.heading ? data.header.heading : 'Новость',
        description: data.header.heading ? data.header.heading : 'Новость',
        keywords: data.header.heading ? data.header.heading : 'Новость',
    }
}

export default async function SingleNewPage({params}) {
    const data = await networkService().getNew(params.id);

    const breadCrumbsLevels = [
        {
            levelName: 'Главная',
            levelLink: '/',
        },
        {
            levelName: 'Новости и мероприятия',
            levelLink: '/news-and-events',
        },
        {
            levelName: data.header.heading ? data.header.heading : 'Новость',
            levelLink: '',
        },
    ];

    return (
        <>
            <BreadCrumbs levels={breadCrumbsLevels} />
            <main className={styles['single-new']}>
                {
                    data &&
                    <>
                        {
                            data.header &&
                                <SinglePageHeader data={data.header} isNews={true} />
                        }

                        {
                            data.gallery &&
                                data.gallery.length > 0 &&
                                    <Gallery data={data.gallery} />
                        }

                        {
                            data.banners &&
                                data.banners.map((banner, index) => (
                                    <SingleBannerWithText
                                        data={banner}
                                        bannerSide={index % 2 === 0 ? 'left' : 'right'}
                                        key={index}
                                    />
                                ))
                        }

                        {
                            data.partners &&
                                data.partners.length > 0 &&
                                    <SinglePagePartners data={data.partners} />
                        }

                        {
                            data.otherNews &&
                                data.otherNews.length > 0 &&
                                    <SingleEventOtherNewsAndEvents data={data.otherNews} />
                        }
                    </>
                }
            </main>
        </>
    )
}
