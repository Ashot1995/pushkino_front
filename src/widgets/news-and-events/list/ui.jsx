'use client';

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { UISection } from "../../../shared/ui/section";
import { NewsAndEventsListTile } from "../../../entities/news-and-events-tile";
import { networkService } from "../../../shared/lib/network";

import styles from './styles.module.scss';

export function NewsAndEventsList() {
    const publicationType = useSelector(state => state.choiceNewsEvents.value);
    const publicationTypes = {
        'all': networkService().getNewsEvents,
        'news': networkService().getNews,
        'events': networkService().getEvents,
        'events-last-date': networkService().getEventsLastDate,
    }

    const [newsData, setNewsData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(null);

    useEffect(() => {
        networkService()
            .getNewsEvents(currentPage)
            .then(response => {
                setNewsData([response.data]);
                setTotalPages(response.totalPages);
            });
    }, []);

    useEffect(() => {
        if (currentPage <= totalPages) {
            publicationTypes[publicationType](currentPage)
                .then(response => setNewsData([...newsData, response.data]));
        }
    }, [currentPage]);

    useEffect(() => {
        setCurrentPage(1);
        setNewsData([]);

        publicationTypes[publicationType](currentPage)
            .then(response => {
                setNewsData([response.data]);
                setTotalPages(response.totalPages);
            })
    }, [publicationType]);

    return (
        <UISection defaultClass={styles['news-events-list']}>
            {
                newsData?.map((dataSlice, index) => (
                    <div className={styles['news-events-list__tiles']} key={index}>
                        {
                            dataSlice?.map((item, index) => <NewsAndEventsListTile data={item} key={index} />)
                        }
                    </div>
                ))
            }

            {
                totalPages &&
                currentPage < totalPages &&
                <button
                    className={`${styles['news-events-list__button']} btn`}
                    onClick={() => setCurrentPage(currentPage + 1)}
                >
                    Показать еще
                </button>
            }
        </UISection>
    )
}
