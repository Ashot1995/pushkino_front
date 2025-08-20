'use client';

import { useSelector, useDispatch } from "react-redux";

import { UISection } from "../../../shared/ui/section";
import { chooseNewsEvents } from "../../../shared/lib/store/slices/choiceNewsEvents";

import styles from './styles.module.scss';

export function NewsAndEventsHeader() {
    const activeType = useSelector(state => state.choiceNewsEvents.value);
    const dispatch = useDispatch();

    return (
        <UISection defaultClass={styles['news-events-header']}>
            <h1 className={`${styles['news-events-header__heading']} h1 h1_caps`}>Новости и мероприятия</h1>
            <div className={styles['news-events-header__types-list']}>
                <div
                    className={`
                        ${styles['news-events-header__type-item']}
                        ${activeType === 'all' && styles['news-events-header__type-item_active']}
                    `}
                    onClick={() => dispatch(chooseNewsEvents('all'))}
                >
                    Все
                </div>
                <div
                    className={`
                        ${styles['news-events-header__type-item']}
                        ${activeType === 'news' && styles['news-events-header__type-item_active']}
                    `}
                    onClick={() => dispatch(chooseNewsEvents('news'))}
                >
                    Новости
                </div>
                <div
                    className={`
                        ${styles['news-events-header__type-item']}
                        ${activeType === 'events' && styles['news-events-header__type-item_active']}
                    `}
                    onClick={() => dispatch(chooseNewsEvents('events'))}
                >
                    Мероприятия
                </div>
                <div
                    className={`
                        ${styles['news-events-header__type-item']}
                        ${activeType === 'events-last-date' && styles['news-events-header__type-item_active']}
                    `}
                    onClick={() => dispatch(chooseNewsEvents('events-last-date'))}
                >
                    Прошедшие Мероприятия
                </div>
            </div>
        </UISection>
    )
}
