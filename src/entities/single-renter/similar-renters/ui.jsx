'use client';

import {useRef} from "react";
import {Swiper, SwiperSlide} from "swiper/react";

import {UISection} from "../../../shared/ui/section";
import {ButtonCircleTransparentGray} from "../../../shared/ui/buttons";
import {RentersSingleTile} from "../../renters-single-tile";

import styles from './styles.module.scss';
import 'swiper/css';
import 'swiper/css/bundle';

import {TYPES_SIMILAR_RENTERS} from "./config";

export function SingleRenterSimilarRenters({data, renterType}) {
    const swiperRef = useRef(null);

    function handlePrev() {
        (swiperRef.current && swiperRef.current.swiper) && swiperRef.current.swiper.slidePrev();
    }

    function handleNext() {
        (swiperRef.current && swiperRef.current.swiper) && swiperRef.current.swiper.slideNext();
    }

    return (
        <UISection defaultClass={styles['similar-renters']}>
            <div className={styles['similar-renters__heading']}>{TYPES_SIMILAR_RENTERS[renterType].heading}</div>

            <div className={styles['similar-renters__slider-buttons']}>
                <div onClick={handlePrev}>
                    <ButtonCircleTransparentGray isRevers={true}/>
                </div>
                <div onClick={handleNext}>
                    <ButtonCircleTransparentGray isRevers={false}/>
                </div>
            </div>

            <Swiper
                ref={swiperRef}
                loop
                slidesPerView={1.5}
                spaceBetween={20}
                breakpoints={{
                    481: {
                        slidesPerView: 3,
                    },
                    721: {
                        slidesPerView: 4,
                    },
                }}
                speed={500}
            >
                {
                    data.map(tile => (
                        <SwiperSlide key={tile.id}>
                            <RentersSingleTile data={tile} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </UISection>
    )
}
