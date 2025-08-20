/**
 * Для компонента хлебных крошек передаем объект с уровнями
 * levels = [
 *   {
 *       levelName: 'Главная',
 *       levelLink: '/',
 *   },
 *   {
 *       levelName: '{уровень по структуре}',
 *       levelLink: '{относительная ссылка}',
 *   },
 *   {
 *       levelName: '{текущий уровень/страница}',
 *       levelLink: '',
 *   },
 * ]
 * */

import React from 'react';
import Link from "next/link";

import styles from './styles.module.scss';

export function BreadCrumbs({levels}) {
    return (
        <div className={styles['bread-crumbs']}>
            <div className={`${styles['bread-crumbs']}__container ${styles['bread-crumbs__wrapper']}`}>
                {
                    levels.map((level, index) => {
                        if (level.levelLink) {
                            return <React.Fragment key={index}>
                                <Link
                                    href={level.levelLink}
                                    className={styles['bread-crumbs__link']}
                                >
                                    {level.levelName.replace(/^./, level.levelName[0].toUpperCase())}
                                </Link>
                                <span className={styles['bread-crumbs__separator']}>/</span>
                            </React.Fragment>
                        } else {
                            return (
                                <span className={styles['bread-crumbs__current-leave']} key={index}>
                                    {level.levelName.replace(/^./, level.levelName[0].toUpperCase())}
                                </span>
                            )
                        }
                    })
                }
            </div>
        </div>
    )
}
