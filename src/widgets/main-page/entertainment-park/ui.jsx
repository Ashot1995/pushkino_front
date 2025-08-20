'use client';

import Link from "next/link";
import {useEffect, useRef} from "react";

import {UISection} from "../../../shared/ui/section";
import {SliderThreeTiles} from "../../../entities/slider-three-tiles";
import {SliderTwoTiles} from "../../../entities/slider-two-tiles";

import styles from './styles.module.scss';

export function MainPageEntertainmentPark({entertainmentParkData}) {
    const windowRef = useRef(null);

    useEffect(() => {
        windowRef.current = window;
    }, []);

    return (
        <UISection defaultClass={styles['park']}>
            <Link href='https://flik-flyak.ru/' className={styles['park__site']}>Перейти на сайт парка</Link>

            {
                windowRef.current &&
                    windowRef.current.innerWidth < 481
                        ? <Link href='https://flik-flyak.ru/' className={styles['park__heading']}>парк развлечений Флик&nbsp;фляк</Link>
                        : <div className={styles['park__heading']}>парк развлечений Флик&nbsp;фляк</div>
            }

            <div className={styles['park__slider']}>
                {
                entertainmentParkData.events &&
                        entertainmentParkData.events.length > 0 &&
                            <SliderThreeTiles slides={entertainmentParkData.events} />
                }
            </div>

            <div className={styles['park__subheading']}>Флик Фляк - генератор блеска в глазах!</div>

            {
                entertainmentParkData.stocks &&
                    entertainmentParkData.stocks.length > 0 &&
                        <SliderTwoTiles slides={entertainmentParkData.stocks}/>
            }
        </UISection>
    )
}
