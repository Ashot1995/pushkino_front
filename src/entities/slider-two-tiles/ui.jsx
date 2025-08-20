'use client';

import Link from "next/link";
import {useRef} from "react";
import {Swiper, SwiperSlide} from "swiper/react";

import 'swiper/css';
import 'swiper/css/bundle';

import {ButtonCircleTransparentWhite} from "../../shared/ui/buttons";
import {DefaultImage} from "../../shared/ui/defaultImage";

import styles from './styles.module.scss';

export function SliderTwoTiles({slides}) {
    const swiperRef = useRef(null);
    const isLoop = useRef(false);

    function handlePrev() {
        (swiperRef.current && swiperRef.current.swiper) && swiperRef.current.swiper.slidePrev();
    }

    function handleNext() {
        (swiperRef.current && swiperRef.current.swiper) && swiperRef.current.swiper.slideNext();
    }

    return (
        <>
            {
                slides.length > 2 &&
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
                slidesPerView={1}
                speed={500}
                loop={isLoop.current}
                breakpoints={{
                    481: {
                        slidesPerView: 1.3,
                    },
                    721: {
                        slidesPerView: 2,
                    }
                }}
                className={styles['slider__swiper']}
            >
                {
                    slides.map((slide, index) => (
                        <SwiperSlide key={index}>
                            <Link href={slide.link ? slide.link : '#!'} className={styles['slider__slide']}>
                                <div className={styles['slider__image']}>
                                    <DefaultImage
                                        src={slide.image ? slide.image : '/images/no-foto.jpg'}
                                        alt={slide.alt ? slide.alt : 'акция'}
                                    />
                                </div>
                                {
                                    slide.heading &&
                                        <div className={`${styles['slider__title']} slider__title`}>{slide.heading.trim().replace(/\s+/g, ' ')}</div>
                                }
                                {
                                    slide.description &&
                                        <div
                                            className={`${styles['slider__subtitle']} slider__subtitle`}
                                            dangerouslySetInnerHTML={{ __html: slide.description }}
                                        ></div>
                                }
                                {
                                    slide.subheading &&
                                        <div
                                            className={`${styles['slider__subtitle']} slider__subtitle`}
                                            dangerouslySetInnerHTML={{ __html: slide.subheading }}
                                        ></div>
                                }
                            </Link>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </>
    )
}
