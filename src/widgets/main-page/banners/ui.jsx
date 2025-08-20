'use client';

import React, {useRef} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination} from "swiper/modules";

import {ButtonCircleTransparentWhite} from "../../../shared/ui/buttons";

import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/pagination';

import styles from './styles.module.scss';

import {BANNER_TEMPLATES} from "./config";

export function MainPageBanners({bannersData}) {
    const swiperRef = useRef(null);

    function handlePrev() {
        (swiperRef.current && swiperRef.current.swiper) && swiperRef.current.swiper.slidePrev();
    }

    function handleNext() {
        (swiperRef.current && swiperRef.current.swiper) && swiperRef.current.swiper.slideNext();
    }

    return (
        <>
            <style>{`
                .main-banner-slider .swiper-pagination-bullets {
                    display: flex;
                    column-gap: 2.4rem;
                    justify-content: center;
                    align-items: center;
                    height: 1.2rem;
                    z-index: 300;
                }
                
                .main-banner-slider .swiper-pagination {
                    bottom: 10.8rem;
                    z-index: 300;
                }
                
                @media screen and (max-width: 720px) {
                    .main-banner-slider .swiper-pagination {
                        bottom: 4rem;
                    }
                }
            `}</style>

            <div className={`${styles['main-banner-slider']} main-banner-slider`}>
                <Swiper
                    ref={swiperRef}
                    loop
                    slidesPerView={1}
                    modules={[Pagination]}
                    pagination={{
                        clickable: true ,
                        bulletClass : `${styles['main-banner-slider-pagination-bullet']}`,
                        bulletActiveClass: `${styles['main-banner-slider-pagination-bullet-active']}`
                    }}
                    speed={1000}
                >
                    {
                        bannersData.map((banner, index) => (
                            <SwiperSlide key={index}>
                                {
                                    React.createElement(BANNER_TEMPLATES[banner.template], {data: banner})
                                }
                            </SwiperSlide>
                        ))
                    }
                </Swiper>

                <div className={styles['main-banner-slider__buttons']}>
                    <div onClick={handlePrev}>
                        <ButtonCircleTransparentWhite isRevers={true} />
                    </div>
                    <div onClick={handleNext}>
                        <ButtonCircleTransparentWhite isRevers={false} />
                    </div>
                </div>
            </div>
        </>
    )
}
