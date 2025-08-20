'use client';

import { useEffect, useState } from 'react';
import {BreadCrumbs} from "../bread-crumbs";
import {SinglePageHeader} from "../../shared/ui/single-page-header";
import {SingleRenterContacts} from "../../entities/single-renter/contacts";
import {Gallery} from "../../shared/ui/gallery";
import {SingleRenterStocks} from "../../entities/single-renter/stocks";
import {SingleRenterSimilarRenters} from "../../entities/single-renter/similar-renters";

import styles from './styles.module.scss';

import {RENTERS_BREAD_CRUMBS} from "./config";
import {MainPageCinema} from "../main-page/cinema";
import {networkService} from "../../shared/lib/network";

export function SingleRenterWidget({data, renterType}) {
    const [cinemasSessionsData, setCinemasSessionsData] = useState(null);
    const [cinemaDonatesData, setCinemaDonatesData] = useState(null);
    const [currentDateTime, setCurrentDateTime] = useState('');

    useEffect(() => {
        const fetchCinemaData = async () => {
            try {
                const [sessionsData, donatesData] = await Promise.all([
                    networkService().getCinemasSessions(),
                    networkService().getCinemaDonats()
                ]);

                setCinemasSessionsData(sessionsData);
                setCinemaDonatesData(donatesData);

                // Set current date time
                const dateTime = `${Intl.DateTimeFormat('ru-RU', {
                    timeZone: 'Europe/Moscow',
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    hour: 'numeric',
                    minute: 'numeric',
                }).format(new Date())}`.split(' в ').join(', ');

                setCurrentDateTime(dateTime);
            } catch (error) {
                console.error('Error fetching cinema data:', error);
            }
        };

        fetchCinemaData();
    }, []);

    const breadCrumbsLevels = [
        {
            levelName: 'Главная',
            levelLink: '/',
        },
        {
            levelName: RENTERS_BREAD_CRUMBS[renterType].levelName,
            levelLink: RENTERS_BREAD_CRUMBS[renterType].levelLink,
        },
        {
            levelName: data && data.header.heading,
            levelLink: '',
        },
    ]

    return (
        <>
            <BreadCrumbs levels={breadCrumbsLevels} />

            <main className={styles['single-renter']}>
                {
                    data &&
                        <>
                            {
                                data.header &&
                                    <SinglePageHeader data={data.header} renterType={renterType} />
                            }
                            {
                                data.contacts &&
                                    <SingleRenterContacts data={data.contacts} />
                            }

                            {
                                cinemasSessionsData &&
                                <MainPageCinema
                                    cinemasSessionsData={cinemasSessionsData}
                                    cinemaDonatesData={cinemaDonatesData}
                                    currentDateTime={currentDateTime}
                                />
                            }

                            {
                                data.gallery &&
                                    data.gallery.length > 0 &&
                                <div style={{marginTop: '40px'}}>
                                        <Gallery data={data.gallery} />
                                </div>
                            }
                            {
                                data.stocks &&
                                    data.stocks.length > 0 &&
                                        <SingleRenterStocks data={data.stocks} />
                            }
                            {
                                data.similarStores &&
                                    data.similarStores.length > 0 &&
                                        <SingleRenterSimilarRenters data={data.similarStores} renterType={renterType} />
                            }
                        </>
                }
            </main>
        </>
    )
}
