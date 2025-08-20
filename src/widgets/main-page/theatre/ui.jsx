'use client';

import Link from "next/link";
import {useEffect} from "react";

import {UISection} from "../../../shared/ui/section";
import {SliderThreeTiles} from "../../../entities/slider-three-tiles";

import styles from './styles.module.scss';
import {useRef} from "react";

export function MainPageTheatre({theatreData, currentDateTime}) {
    const windowRef = useRef(null);

    useEffect(() => {
        windowRef.current = window;
    }, []);

    return (
        <UISection defaultClass={styles['theatre']}>
            <div className={styles['theatre__top-line']}>
                <div className={styles['theatre__data']}>
                    <Link href='https://t-rim.ru/' className={styles['theatre__site']}>Перейти на сайт театра</Link>
                    <div className={styles['theatre__date']}>{currentDateTime}</div>
                </div>
                {
                    windowRef.current &&
                    windowRef.current.innerWidth < 481
                        ? <Link href='https://t-rim.ru/' className={styles['theatre__heading']} target='_blank'>Афиша театра&nbsp;III&nbsp;Р.И.М.</Link>
                        : <div className={styles['theatre__heading']}>Афиша театра&nbsp;III&nbsp;Р.И.М.</div>
                }
            </div>

            {
                theatreData && <SliderThreeTiles slides={theatreData} />
            }
        </UISection>
    )
}
