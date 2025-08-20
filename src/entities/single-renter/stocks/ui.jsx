'use client';

import {UISection} from "../../../shared/ui/section";
import {SliderTwoTiles} from "../../slider-two-tiles";

import 'swiper/css';
import 'swiper/css/bundle';

import styles from './styles.module.scss';

export function SingleRenterStocks({data}) {
    return (
        <UISection defaultClass={styles['renter-stocks']}>
            <div className={styles['renter-stocks__heading']}>Действующие акции</div>

            <div className={styles['renter-stocks__slider']}>
                <SliderTwoTiles slides={data}/>
            </div>
        </UISection>
    )
}
