'use client';

import {useSelector} from "react-redux";
import {useEffect, useState} from "react";

import {BreadCrumbs} from "../../../widgets/bread-crumbs";
import {VacancyTabs} from "../../../widgets/vacancies/tabs";
import {VacancyAccordeon} from "../../../widgets/vacancies/accordeon";
import {networkService} from "../../../shared/lib/network";

import {BREAD_CRUMBS_LEVELS} from "./config";

export default function TenantPage() {
    const [vacanciesData, setVacanciesData] = useState(null);
    const [vacanciesDataForFilter, setVacanciesDataForFilter] = useState(null);

    const currentVacanciesTab = useSelector(state => state.currentVacanciesType.value);

    useEffect(() => {
        networkService().getVacancies().then(data => {
            setVacanciesData(data);
            setVacanciesDataForFilter(data);
        });
    }, []);

    useEffect(() => {
        if (vacanciesDataForFilter && currentVacanciesTab !== 'Все вакансии') {
            const filteredObject = {};

            Object.keys(vacanciesDataForFilter).forEach(key => {
                key === currentVacanciesTab ? filteredObject[key] = vacanciesDataForFilter[key] : null;
            });

            setVacanciesData(filteredObject);
        } else if (vacanciesDataForFilter && currentVacanciesTab === 'Все вакансии') {
            setVacanciesData(vacanciesDataForFilter);
        }
    }, [currentVacanciesTab]);

    return (
        <>
            <BreadCrumbs levels={BREAD_CRUMBS_LEVELS}/>
            <main>
                <VacancyTabs />
                {
                    vacanciesData &&
                        <VacancyAccordeon data={vacanciesData} />
                }
            </main>
        </>
    );
}
