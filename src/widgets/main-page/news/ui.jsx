'use client';

import Link from "next/link";
import {useRef, useEffect} from "react";
import {Swiper, SwiperSlide} from "swiper/react";

import 'swiper/css';
import 'swiper/css/bundle';

import {UISection} from "../../../shared/ui/section";
import {ButtonCircleTransparentGray} from "../../../shared/ui/buttons";
import {DefaultImage} from "../../../shared/ui/defaultImage";

import styles from './styles.module.scss';

export function MainPageNews({newsData}) {
    const swiperRef = useRef(null);
    const isLoop = useRef(false);
    const isButtonShow = useRef(true);

    const windowRef = useRef(null);

    const slidesWithData = [];

    useEffect(() => {
        windowRef.current = window;
    }, []);

    if (newsData) {
        for (let i = 0, length = (3 * Math.floor(newsData.length / 3)); i < length; i += 3) {
            const slide = [];

            for (let j = 0, length = 3; j < length; j++) {
                slide.push(newsData[i + j]);
            }

            slidesWithData.push(slide);
        }

        isButtonShow.current = slidesWithData.length > 2;
    }

    function handlePrev() {
        (swiperRef.current && swiperRef.current.swiper) && swiperRef.current.swiper.slidePrev();
    }

    function handleNext() {
        (swiperRef.current && swiperRef.current.swiper) && swiperRef.current.swiper.slideNext();
    }

    return (
        <UISection defaultClass={styles['news']}>
            <Link href='/news-and-events' className={styles['news__preheading']}>Перейти ко всем новостям</Link>
            {
                windowRef.current &&
                    windowRef.current.innerWidth < 481
                        ? <Link href='/news-and-events' className={styles['news__heading']}>Новости и мероприятия</Link>
                        : <div className={styles['news__heading']}>Новости и мероприятия</div>
            }

            {
                isButtonShow.current &&
                <div className={styles['news__slider-buttons']}>
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
                onSwiper={() => isLoop.current = true}
                slidesPerView={1}
                spaceBetween={20}
                speed={500}
                loop={isLoop.current}
                breakpoints={{
                    481: {
                        slidesPerView: 1,
                    }
                }}
                className={styles['news__swiper']}
            >
                {
                    slidesWithData.map((threeSlides, index) => (
                        <SwiperSlide key={index}>
                            <div className={styles['news__slide']}>
                                    <Link href={threeSlides[0].link ? threeSlides[0].link : ''} className={styles['news__big-image-block']}>
                                        <div className={styles['news__big-image']}>
                                            <DefaultImage
                                                src={threeSlides[0].image ? threeSlides[0].image : '/images/no-foto.jpg'}
                                                alt={threeSlides[0].alt ? threeSlides[0].alt : 'Новости и мероприятия'}
                                            />
                                        </div>
                                        <div className={styles['news__title']}>{threeSlides[0].heading?.trim().replace(/\s+/g, ' ')}</div>
                                    </Link>
                                    <Link href={threeSlides[1].link ? threeSlides[1].link : ''} className={styles['news__small-image-block']}>
                                        <div className={styles['news__small-image']}>
                                            <DefaultImage
                                                src={threeSlides[1].image ? threeSlides[1].image : '/images/no-foto.jpg'}
                                                alt={threeSlides[1].alt ? threeSlides[1].alt : 'Новости и мероприятия'}
                                            />
                                        </div>
                                        <div className={styles['news__title']}>{threeSlides[1].heading?.trim().replace(/\s+/g, ' ')}</div>
                                    </Link>
                                    <Link href={threeSlides[2].link ? threeSlides[2].link : ''} className={styles['news__small-image-block']}>
                                        <div className={styles['news__small-image']}>
                                            <DefaultImage
                                                src={threeSlides[2].image ? threeSlides[2].image : '/images/no-foto.jpg'}
                                                alt={threeSlides[2].alt ? threeSlides[2].alt : 'Новости и мероприятия'}
                                            />
                                        </div>
                                        <div className={styles['news__title']}>{threeSlides[2].heading?.trim().replace(/\s+/g, ' ')}</div>
                                    </Link>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </UISection>
    )
}
