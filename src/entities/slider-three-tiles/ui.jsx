'use client';

import Link from "next/link";
import {useRef} from "react";
import {Swiper, SwiperSlide} from "swiper/react";

import 'swiper/css';
import 'swiper/css/bundle';

import {ButtonCircleTransparentWhite} from "../../shared/ui/buttons";
import {DefaultImage} from "../../shared/ui/defaultImage";
import {MONTHS} from "../../shared/config/months";

import styles from './styles.module.scss';

export function SliderThreeTiles({slides, type = ''}) {
    const swiperRef = useRef(null);
    const isLoop = useRef(false);

    function formatterDate(date) {
        const day = date.split('.')[0];
        const month = date.split('.')[1];

        return `${day} ${MONTHS[month]}`;
    }

    function handlePrev() {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slidePrev();
        }
    }

    function handleNext() {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slideNext();
        }
    }

    return (
        <>
            {
                slides.length > 3 &&
                    <div className={styles['slider__buttons']}>
                        <div onClick={handlePrev}>
                            <ButtonCircleTransparentWhite isRevers={true}/>
                        </div>
                        <div onClick={handleNext}>
                            <ButtonCircleTransparentWhite isRevers={false}/>
                        </div>
                    </div>
            }

            <Swiper
                ref={swiperRef}
                onSwiper={() => isLoop.current = true}
                spaceBetween={20}
                slidesPerView={1.2}
                speed={500}
                loop={isLoop.current}
                breakpoints={{
                    481: {
                        slidesPerView: 2,
                    },
                    721: {
                        slidesPerView: 3,
                    },
                }}
                className={styles['slider__swiper']}
            >
                {
                    slides.map((slide, index) => (
                        <SwiperSlide key={slide.id || index}>
                            <Link href={slide.link ? slide.link : '#!'} className={styles['slider__slide']}>
                                <div className={`
                                    ${styles['slider__image']}
                                    ${type === 'news-events' ? styles['slider__image_news-events'] : ''}
                                `}>
                                    <DefaultImage
                                        src={slide.image ? slide.image : '/images/no-foto.jpg'}
                                        alt={slide.alt ? slide.alt : 'Лендинг'}
                                    />
                                </div>
                                {
                                    slide.heading &&
                                        <div className={`${styles['slider__title']} slider__title`}>
                                            {slide.heading.trim().replace(/\s+/g, ' ')}
                                        </div>
                                }
                                {
                                    slide.description &&
                                        <div className={`${styles['slider__date']} slider__date`}>
                                            {slide.description.trim().replace(/\s+/g, ' ')}
                                        </div>
                                }
                                {
                                    slide.date &&
                                        <div className={`${styles['slider__date']} slider__date`}>
                                            {
                                                formatterDate(slide.date)
                                            }
                                        </div>
                                }
                            </Link>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </>
    )
}
