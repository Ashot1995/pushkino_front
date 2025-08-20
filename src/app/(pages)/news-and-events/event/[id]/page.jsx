import {BreadCrumbs} from "../../../../../widgets/bread-crumbs";
import {SinglePageHeader} from "../../../../../shared/ui/single-page-header";
import {SingleEventSchedule} from "../../../../../widgets/single-event/schedule";
import {Gallery} from "../../../../../shared/ui/gallery";
import {SingleEventOtherNewsAndEvents} from "../../../../../shared/ui/other-news-events";
import {networkService} from "../../../../../shared/lib/network";

import styles from './styles.module.scss';

export async function generateMetadata({params}) {
    const data = await networkService().getEvent(params.id);

    return {
        title:  data.header.heading ? data.header.heading : 'Мероприятие',
        description:  data.header.heading ? data.header.heading : 'Мероприятие',
        keywords:  data.header.heading ? data.header.heading : 'Мероприятие',
    }
}

export default async function SingleEventPage({params}) {
    const data = await networkService().getEvent(params.id);

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
            levelName: data.header.heading ? data.header.heading : 'Мероприятие',
            levelLink: '',
        },
    ];

    return (
        <>
            <BreadCrumbs levels={breadCrumbsLevels}/>

            <main className={styles['single-event']}>
                {
                    data &&
                        <>
                            {
                                data.header &&
                                    <SinglePageHeader data={data.header} />
                            }

                            {
                                data.schedule &&
                                    <SingleEventSchedule data={data.schedule} />
                            }

                            {
                                data.gallery &&
                                    data.gallery.length > 0 &&
                                        <Gallery data={data.gallery} />
                            }

                            {
                                data.otherEvents &&
                                    data.otherEvents.length > 0 &&
                                        <SingleEventOtherNewsAndEvents data={data.otherEvents} />
                            }
                        </>
                }
            </main>
        </>
    )
}
