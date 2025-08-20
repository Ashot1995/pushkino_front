'use client';

import Link from "next/link";
import {useEffect, useRef} from "react";
import {useSelector} from "react-redux";
import {usePathname} from "next/navigation";

import {SubscribeEmail} from "../../features/subscribe-email";
import {SocialBlock} from "../../shared/ui/social-block";
import {MENU_FOOTER_LINKS} from "../../shared/config/constants";

import styles from './styles.module.scss';

export function Footer() {
    const footerData = useSelector(state => state.throughContactsData.value);

    const currentYear = useRef(new Date().getFullYear());

    // DOM Elements
    const rootWrapperRef = useRef(null);

    useEffect(() => {
        rootWrapperRef.current = document.querySelector('.root-wrapper');
    }, []);

    const scrollToTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    return (
        <footer className={styles['footer']}>
            <div className={styles['footer__white-block']}>
                <div className={`${styles['footer']}__container`}>
                    <div className={styles['footer__logo-block']}>
                        <div className={styles['footer__logo-img']}>
                            <img src="/images/main-logo/black.png" alt="Логотип Пушкино Парк"/>
                        </div>
                        <div
                            className={styles['footer__up-link']}
                            onClick={scrollToTop}
                        >
                            <span>Наверх</span>
                            <svg className='svg-icon' viewBox="0 0 24 24" width="24" height="24">
                                <use href="/images/icons/sprite.svg#arrow-up" x="0" y="0"></use>
                            </svg>
                        </div>
                    </div>

                    <div className={styles['footer__menu-list']}>
                        {
                            MENU_FOOTER_LINKS.map((menuList, index) => (
                                    <div className={styles['footer__menu-list-block']} key={index}>
                                        {
                                            Object.keys(menuList).map((key, index) => (
                                                <Link href={menuList[key]['link']} className={styles['footer__menu-link']} key={index}>{key}</Link>
                                            ))
                                        }
                                    </div>
                                )
                            )
                        }
                    </div>
                </div>
            </div>

            <div className={styles['footer__color-block']}>
                <div className={`${styles['footer']}__container`}>
                    <div className={`${styles['footer__work-time']}`}>
                        <div className={`${styles['footer__work-time-institution']}`}>
                            <div className={`${styles['footer__work-time-heading']}`}>Галерея</div>
                                <div className={`${styles['footer__work-time-days']}`}>{footerData?.workingHours?.trc?.days && footerData.workingHours.trc.days}</div>
                                <div className={`${styles['footer__work-time-timing']}`}>{footerData?.workingHours?.trc?.hours && footerData.workingHours.trc.hours}</div>
                        </div>
                        <div className={`${styles['footer__work-time-institution']}`}>
                            <div className={`${styles['footer__work-time-heading']}`}>Кинотеатр</div>
                                <div className={`${styles['footer__work-time-days']}`}>{footerData?.workingHours?.cinema?.days && footerData.workingHours.cinema.days}</div>
                                <div className={`${styles['footer__work-time-timing']}`}>{footerData?.workingHours?.cinema?.hours && footerData.workingHours.cinema.hours}</div>
                        </div>
                        <div className={`${styles['footer__subscribe']}`}>
                            <div className={`${styles['footer__work-time-heading']}`}>Эксклюзивные новости</div>
                            <div className={`${styles['footer__subscribe-email']}`}>
                                <SubscribeEmail button='ButtonCircleTransparentWhite' />
                            </div>
                        </div>
                    </div>
                    <div className={`${styles['footer__contacts']}`}>
                        <div className={`${styles['footer__contacts-data']}`}>
                            <div className={`${styles['footer__contacts-data-item']}`}>© {currentYear.current} ТРЦ «Пушкино Парк»</div>
                            <div className={`${styles['footer__contacts-data-item']}`}>{footerData && footerData.address}</div>
                        </div>

                        <div className={`${styles['footer__social-links']}`}>
                            <SocialBlock
                                tgLink={footerData?.socialLinks && footerData.socialLinks[0].telegram}
                                vkLink={footerData?.socialLinks && footerData.socialLinks[0].vkontakte}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
