import {UISection} from "../../../shared/ui/section";
import {SliderThreeTiles} from "../../../entities/slider-three-tiles";

import styles from './styles.module.scss';

export function SingleEventOtherNewsAndEvents({data}) {
    return (
        <>
            <style>{`
                .event-other-news-events .slider__title {
                    color: var(--color-black);
                    font-size: 1.8rem;
                    font-weight: 600;
                    line-height: 1.33;
                }
                
                @media screen and (max-width: 480px) {
                    .event-other-news-events .slider__title {
                        font-size: 1.4rem;
                        line-height: 1.42;
                    }
                }
            `}</style>

            <UISection
                defaultClass={`
                    ${styles['event-other-news-events']}
                    event-other-news-events
                `}>
                <div className={styles['event-other-news-events__heading']}>Другие новости и мероприятия</div>
                <SliderThreeTiles slides={data} type='news-events' />
            </UISection>
        </>
    )
}
