'use client';

import Link from "next/link";
import {useRef, useEffect} from "react";
import {Swiper, SwiperSlide} from "swiper/react";

import 'swiper/css';
import 'swiper/css/bundle';

import {UISection} from "../../../shared/ui/section";
import {SliderTwoTiles} from "../../../entities/slider-two-tiles";
import {ButtonCircleTransparentWhite} from "../../../shared/ui/buttons";
import {DefaultImage} from "../../../shared/ui/defaultImage";

import styles from './styles.module.scss';

export function MainPageCinema({cinemasSessionsData, cinemaDonatesData, currentDateTime}) {
    const swiperRef = useRef(null);
    const isLoop = useRef(false);

    const windowRef = useRef(null);

    useEffect(() => {
        windowRef.current = window;
    }, []);

    function handlePrev() {
        (swiperRef.current && swiperRef.current.swiper) && swiperRef.current.swiper.slidePrev();
    }

    function handleNext() {
        (swiperRef.current && swiperRef.current.swiper) && swiperRef.current.swiper.slideNext();
    }

    return (
        <UISection defaultClass={styles['cinema']}>
            <div className={styles['cinema__top-line']}>
                <div className={styles['cinema__data']}>
                    <Link href='https://kinomax.ru/pushkino' className={styles['cinema__site']} target='_blank'>Перейти на сайт кинотеатра</Link>
                    <div className={styles['cinema__date']}>{currentDateTime}</div>
                </div>
                {
                    windowRef.current &&
                        windowRef.current.innerWidth < 481
                            ? <Link href='https://kinomax.ru/pushkino' className={styles['cinema__heading']}>Сегодня в кино</Link>
                            : <div className={styles['cinema__heading']}>Сегодня в кино</div>
                }
            </div>

            <div className={styles['cinema__slider']}>
                <div className={styles['cinema__slider-buttons']}>
                    <div onClick={handlePrev}>
                        <ButtonCircleTransparentWhite isRevers={true}/>
                    </div>
                    <div onClick={handleNext}>
                        <ButtonCircleTransparentWhite isRevers={false}/>
                    </div>
                </div>

                <Swiper
                    ref={swiperRef}
                    onSwiper={() => isLoop.current = true}
                    spaceBetween={20}
                    slidesPerView={1.3}
                    speed={500}
                    loop={isLoop.current}
                    breakpoints={{
                        481: {
                            slidesPerView: 4,
                        }
                    }}>
                    {
                        cinemasSessionsData.length > 0 &&
                            cinemasSessionsData.map(movie => (
                                <SwiperSlide key={movie.id}>
                                    <div className={styles['cinema__slide']}>
                                        <div className={styles['cinema__slide-image']}>
                                            <DefaultImage
                                                src={movie.poster ? `https://images.kinomax.ru/300${movie.poster}` : '/images/no-foto.jpg'}
                                                alt={movie.name ? movie.name : 'Сегодня в кино'}
                                            />
                                        </div>
                                        <div className={styles['cinema__slide-title']}>{movie.name?.trim().replace(/\s+/g, ' ')}</div>
                                        {
                                            movie.genres &&
                                                <div className={styles['cinema__slide-subtitle']}>
                                                    {
                                                        movie.genres.map(genre => (`${genre}, `))
                                                    }
                                                    {
                                                        movie.ageCategory && movie.ageCategory
                                                    }
                                                </div>
                                        }
                                        <div className={styles['cinema__slide-sessions']}>
                                            {
                                                movie.sessions?.map(session =>
                                                    <a href={`https://kinomax.ru/order/${session.id}`} className={styles['cinema__slide-session']} target='_blank' key={session.id}>
                                                        {session.time && session.time}
                                                    </a>
                                                )
                                            }
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))
                    }
                </Swiper>
            </div>

            {
                cinemaDonatesData &&
                    cinemaDonatesData.length > 0 &&
                        <>
                            <div className={styles['cinema__subheading']}>Для киноманов</div>
                            <SliderTwoTiles slides={cinemaDonatesData}/>
                        </>
            }

            <div className={styles['cinema__logo']}>
                <DefaultImage
                    src='/images/main-page/cinema/logo-kinomax.png'
                    alt='Логотип Киномакс'
                />
            </div>
        </UISection>
    )
}
