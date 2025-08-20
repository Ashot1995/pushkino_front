'use client';

import Link from "next/link";
import {useRef} from "react";

import {UISection} from "../../shared/ui/section";
import {DefaultImage} from "../../shared/ui/defaultImage";

import styles from './styles.module.scss';

export default function PageNotFound() {
    const currentYear = useRef(new Date().getFullYear());

    return (
        <UISection defaultClass={'page-not-found'}>
            <div className={styles['page-not-found__heading']}>
                <p>Упс...</p>
                <p>Страница не найдена</p>
            </div>
            <div className={styles['page-not-found__wrapper']}>
                <div className={styles['page-not-found__description']}>
                    <div className={styles['page-not-found__text']}>
                        Возможно вы ошиблись в наборе адреса или страница была удалена.
                    </div>
                    <a href='/' className={`${styles['page-not-found__link']} btn`}>Вернуться на главную</a>
                </div>
                <div className={styles['page-not-found__image']}>
                    <DefaultImage
                        src='/images/page-not-found/desktop.png'
                        srcMob='/images/page-not-found/mobile.png'
                        alt='Страница не найдена'
                    />
                </div>
            </div>
            <div className={styles['page-not-found__copyright']}>© {currentYear.current} ТРЦ «Пушкино Парк»</div>
        </UISection>
    )
}
