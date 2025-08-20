'use client';

import Link from "next/link";
import {Swiper, SwiperSlide} from "swiper/react";
import {useRef} from "react";

import 'swiper/css';
import 'swiper/css/bundle';

import styles from './styles.module.scss';

import {DefaultImage} from "../ui/defaultImage";
import {UISection} from "../ui/section";
import {ButtonCircleTransparentGray} from "../ui/buttons";
import {DEFAULT_DATA} from "./config";

export function SliderSix({
                              more = {},
                              heading = '',
                              data = DEFAULT_DATA
}) {
    const swiperRef = useRef(null);

    function handlePrev() {
        (swiperRef.current && swiperRef.current.swiper) && swiperRef.current.swiper.slidePrev();
    }

    function handleNext() {
        (swiperRef.current && swiperRef.current.swiper) && swiperRef.current.swiper.slideNext();
    }

    return (
        <UISection defaultClass={styles['slider-six']}>
            {
                Object.keys(more).length > 0 &&
                    more.link &&
                        <Link href={more.link} className={styles['slider-six__more']}>{more.anchor}</Link>
            }

            {
                heading &&
                    <div className={`
                        ${styles['slider-six__heading']}
                        slider-six__heading
                    `}>{heading}</div>
            }

            <div className={`
                ${styles['slider-six__slider']}
                slider-six__slider
            `}>
                {
                    data.length > 6 &&
                        <div className={styles['slider-six__slider-buttons']}>
                            <div onClick={handlePrev}>
                                <ButtonCircleTransparentGray isRevers={true}/>
                            </div>
                            <div onClick={handleNext}>
                                <ButtonCircleTransparentGray isRevers={false}/>
                            </div>
                        </div>
                }

                <Swiper
                    ref={swiperRef}
                    spaceBetween={14}
                    slidesPerView={2}
                    speed={500}
                    loop
                    breakpoints={{
                        481: {
                            slidesPerView: 4,
                            spaceBetween: 14,
                        },
                        721: {
                            slidesPerView: 6,
                            spaceBetween: 14,
                        },
                    }}
                    className={styles['slider-six__swiper']}
                >
                    {
                        data.map((item, index) => (
                            <SwiperSlide key={index}>
                                <Link href={item.link ? item.link : '#!'} className={styles['slider-six__slide']} target='_blank'>
                                    <div className={styles['slider-six__slide-image']}>
                                        <DefaultImage
                                            src={item.image ? item.image : '/images/no-foto.jpg'}
                                            alt={item.alt ? item.alt : 'Slide Image'}
                                        />
                                    </div>
                                    {
                                        item.heading &&
                                            <div className={styles['slider-six__slide-text']}>{item.heading.trim().replace(/\s+/g, ' ')}</div>
                                    }
                                    {
                                        item.storeName &&
                                        <div className={styles['slider-six__slide-text']}>{item.storeName.trim().replace(/\s+/g, ' ')}</div>
                                    }
                                </Link>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </UISection>
    )
}
