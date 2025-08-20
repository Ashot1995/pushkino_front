'use client';

import {Swiper, SwiperSlide} from "swiper/react";
import {useRef} from "react";

import {UISection} from "../../../shared/ui/section";

import 'swiper/css';
import 'swiper/css/bundle';

import styles from './styles.module.scss';

export function AboutInfo({banner}) {
    const swiperRef = useRef(null);

    return (
        <>
            <style>{`
                .about-info__slider .swiper-wrapper {
                    display: none;
                }
                
                @media screen and (max-width: 375px) {
                   .about-info__slider .swiper-wrapper {
                        display:flex;
                    }
                }
            `}</style>

            <UISection defaultClass={styles['about-info']}>
                <div className={styles['about-info__text']}>
                    <div className={styles['about-info__title']}>
                        {banner.heading && banner.heading}
                    </div>
                    <div
                        className={styles['about-info__desc']}
                        dangerouslySetInnerHTML={{ __html: banner.description }}
                    />
                </div>

                <div className={styles['about-info__grid']}>
                    {
                        banner.images &&
                            banner.images.length > 0 &&
                                banner.images.map((image, index) => (
                                    <img
                                        className={styles['about-info__item']}
                                        src={image.desktopImage ? image.desktopImage : '/images/no-foto.jpg'}
                                        alt={image.alt ? image.alt : 'Баннер'}
                                        key={index}
                                    />
                                ))
                    }
                </div>
                <div className='about-info__slider'>
                    <Swiper
                        ref={swiperRef}
                        slidesPerView={1.3}
                        spaceBetween={20}
                        slidesPerGroup={1}
                        breakpoints={{
                            720: {
                                slidesPerView: 4,
                            },
                        }}
                        speed={500}
                        loop
                    >
                        {
                            banner.images &&
                                banner.images.length > 0 &&
                                    banner.images.map((image, index) => (
                                        <SwiperSlide className={styles['about-info-slider__slide']} key={index}>
                                            <img
                                                className={styles['about-info__item']}
                                                src={image.mobileImage ? image.mobileImage : '/images/no-foto.jpg'}
                                                alt={image.alt ? image.alt : 'Баннер'}
                                            />
                                        </SwiperSlide>
                                    ))
                        }
                    </Swiper>
                </div>
            </UISection>
        </>
    )
}
