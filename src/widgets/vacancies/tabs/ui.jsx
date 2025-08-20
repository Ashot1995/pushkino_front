'use client';

import {useState} from "react";
import {useSelector, useDispatch} from "react-redux";

import {UISection} from "../../../shared/ui/section";
import {SvgIcon} from "../../../shared/ui/svg-icon";
import {changeVacanciesType} from "../../../shared/lib/store/slices/currentVacanciesType";

import styles from './styles.module.scss';

import {TABS} from "./config";

export function VacancyTabs() {
    const tabTitle = useSelector(state => state.currentVacanciesType.value);

    const dispatch = useDispatch();

    const [tabOpen, setTabOpen] = useState(true);

    return (
        <UISection defaultClass={styles['vacancy-tabs']}>
            <h1 className={`${styles['vacancy-tabs__heading']} h1 h1_caps`}>Вакансии</h1>

            <div className={`
                ${styles['vacancy-tabs__list']}
                ${tabOpen ? '' : styles['vacancy-tabs__list_open']}                
            `}>
                <div
                    className={styles['vacancy-tabs__title']}
                    onClick={() => {setTabOpen(!tabOpen)}}
                >
                    {tabTitle}
                    <SvgIcon id='chevron'/>
                </div>
                <div className={styles['vacancy-tabs__grid']}>
                    {
                        TABS.map(tab => (
                            <div
                                key={tab.id}
                                className={`
                                    ${styles['vacancy-tabs__item']}
                                    ${tabTitle === tab.name && styles['vacancy-tabs__item_active']}
                                `}
                                onClick={() => {dispatch(changeVacanciesType(tab.name)), setTabOpen(true)} }
                            >
                                {tab.name}
                            </div>
                        ))
                    }
                </div>
            </div>
        </UISection>
    )
}
