'use client';

import {useState} from "react";
import {UISection} from "../../../shared/ui/section";
import {SvgIcon} from "../../../shared/ui/svg-icon";
import styles from './styles.module.scss';
import {CARD_ITEM} from './config'

export function VacancyAccordeon({data = CARD_ITEM}) {
    const [accOpen, setAccOpen] = useState(null);

    return (
        <UISection defaultClass={styles['vacancy-accordeon']}>
            {
                Object.keys(data).map(key =>
                    {
                        return data[key].map((vacancy, index) => (
                            <div
                                key={index}
                                className={`
                                    ${styles['vacancy-accordeon__block']}
                                    ${vacancy.position === accOpen ? styles['vacancy-accordeon__block_open'] : ''}
                                `}
                            >
                                <div className={styles['vacancy-accordeon__main']}>
                                    <div className={styles['vacancy-accordeon__img']}>
                                        <img
                                            src={vacancy.logo ? vacancy.logo : '/images/no-foto.jpg'}
                                            alt={vacancy.alt ? vacancy.alt : 'Логотип компании'}
                                        />
                                    </div>
                                    <div className={styles['vacancy-accordeon__content']}>
                                        <div className={styles['vacancy-accordeon__content-title']}>
                                            {vacancy.position?.trim().replace(/\s+/g, ' ')}
                                        </div>
                                        <div className={styles['vacancy-accordeon__content-desc']}>
                                            {vacancy.employerName?.trim().replace(/\s+/g, ' ')}
                                        </div>
                                        <div className={styles['vacancy-accordeon__content-date']}>
                                            Дата публикации: {vacancy.date?.trim().replace(/\s+/g, ' ')}
                                        </div>
                                    </div>
                                    <div
                                        onClick={() => vacancy.position === accOpen ? setAccOpen(null) : setAccOpen(vacancy.position)}
                                        className={styles['vacancy-accordeon__icon']}
                                    >
                                        <SvgIcon id='chevron'/>
                                    </div>
                                </div>
                                <div className={styles['vacancy-accordeon__info']}>
                                    <div className={styles['vacancy-accordeon__info-wrapper']}>
                                        {
                                            vacancy.conditions &&
                                                <div className={styles['vacancy-accordeon__info-terms']}>
                                                    <div>Условия:</div>
                                                    <ul dangerouslySetInnerHTML={{__html: vacancy.conditions}}/>
                                                </div>
                                        }
                                        {
                                            vacancy.requirements &&
                                                <div className={styles['vacancy-accordeon__info-claims']}>
                                                    <div>Требования:</div>
                                                    <ul dangerouslySetInnerHTML={{__html: vacancy.requirements}}/>
                                                </div>
                                        }
                                        {
                                            vacancy.duties &&
                                                <div className={styles['vacancy-accordeon__info-funcs']}>
                                                    <div>Обязанности:</div>
                                                    <ul dangerouslySetInnerHTML={{__html: vacancy.duties}}/>
                                                </div>
                                        }
                                        {
                                            vacancy.email &&
                                                <div className={styles['vacancy-accordeon__info-email']}>
                                                    <pre>
                                                        <span>Электронная почта:</span>
                                                        <a href={`mailto:${vacancy.email.trim().replace(/\s+/g, ' ')}`}>{vacancy.email.trim().replace(/\s+/g, ' ')}</a>
                                                    </pre>
                                                </div>
                                        }
                                        {
                                            vacancy.phoneNumber &&
                                                <div className={styles['vacancy-accordeon__info-num']}>
                                                    <pre>
                                                        <span className={styles['vacancy-accordeon__info-num__phone-num']}>Телефон:</span>
                                                        <a
                                                            href={`tel:+${vacancy.phoneNumber.replace(/\D/g, '')}`}
                                                            className={styles['vacancy-accordeon__info-num__phone']}
                                                        >
                                                            {vacancy.phoneNumber.trim().replace(/\s+/g, ' ')}
                                                        </a>
                                                        {
                                                            vacancy.name &&
                                                                <span className={styles['vacancy-accordeon__info-num__phone-name']}>
                                                                    ({vacancy.name})
                                                                </span>
                                                        }
                                                    </pre>
                                                </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                )
            }
        </UISection>
    )
}
