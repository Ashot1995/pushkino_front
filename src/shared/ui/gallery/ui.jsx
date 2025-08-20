'use client';

import {Swiper, SwiperSlide} from "swiper/react";
import {Fragment, useEffect, useRef, useState} from "react";
import {Thumbs} from 'swiper/modules';

import {UISection} from "../../../shared/ui/section";
import {SvgIcon} from "../svg-icon";
import {DefaultImage} from "../defaultImage";

import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/thumbs';

import styles from './styles.module.scss';
import {ButtonCircleFull, ButtonCircleTransparentGray} from "../buttons";

export function Gallery({data}) {

    const swiperRef = useRef(null);
    const renterShowGallery = useRef(null);

    const [isShowGalleryOpen, setIsShowGalleryOpen] = useState(false);

    const slides = [];

    useEffect(() => {
        renterShowGallery.current = document.querySelector('.js-renter-show-gallery');
    }, []);

    function handlePrev() {
        (swiperRef.current && swiperRef.current.swiper) && swiperRef.current.swiper.slidePrev();
    }

    function handleNext() {
        (swiperRef.current && swiperRef.current.swiper) && swiperRef.current.swiper.slideNext();
    }

    function handleToggleShowGalleryOpen(action) {
        if (action === 'open') {
            setIsShowGalleryOpen(true);
            document.body.classList.add('body-hidden');
        } else if (action === 'close') {
            setIsShowGalleryOpen(false);
            document.body.classList.remove('body-hidden');
        }
    }

    for (let i = 0, lengthGallery = data.length; i < lengthGallery; i += 3) {
        const treeSlides = [];

        for (let j = 0; j < 3; j++) {
            treeSlides.push(data[i + j]);
        }

        slides.push(treeSlides);
    }

    renterShowGallery.current && renterShowGallery.current.addEventListener('click', event => {
        typeof event.target.className === 'string' &&
            event.target.className.includes('js-renter-show-gallery') &&
                handleToggleShowGalleryOpen('close');
    });

    return (
        <>
            <UISection defaultClass={styles['renter-gallery']}>
                <div className={styles['renter-gallery__heading']}>Галерея</div>

                <div className={styles['renter-gallery__slider-buttons']}>
                    <div onClick={handlePrev}>
                        <ButtonCircleTransparentGray isRevers={true}/>
                    </div>
                    <div onClick={handleNext}>
                        <ButtonCircleTransparentGray isRevers={false}/>
                    </div>
                </div>

                <Swiper
                    ref={swiperRef}
                    slidesPerView={1.5}
                    spaceBetween={20}
                    slidesPerGroup={1}
                    breakpoints={{
                        481: {
                            slidesPerView: 3,
                        },
                        721: {
                            slidesPerView: "auto",
                            slidesPerGroup: 3,
                            speed: 500,
                        },
                    }}
                    speed={500}
                    onClick={() => handleToggleShowGalleryOpen('open')}
                >
                    {
                        slides.map((slide, index) => (
                            <Fragment key={`gallery_${index}`}>
                                {
                                    slide[0] &&
                                        <SwiperSlide
                                            className={`
                                                ${styles['renter-gallery__slide']}
                                                ${styles[`renter-gallery__slide_first`]}
                                            `}
                                        >
                                            <div className={styles['renter-gallery__slide-img-wrapper']}>
                                                <DefaultImage
                                                    src={slide[0].desktopImage ? slide[0].desktopImage : '/images/no-foto.jpg'}
                                                    srcMob={slide[0].mobileImage ? slide[0].mobileImage : '/images/no-foto.jpg'}
                                                    alt={slide[0].alt ? slide[0].alt : 'Изображение галереи'}
                                                />
                                            </div>
                                        </SwiperSlide>
                                }
                                {
                                    slide[1] &&
                                    <SwiperSlide
                                        className={`
                                            ${styles['renter-gallery__slide']}
                                            ${styles[`renter-gallery__slide_second`]}
                                        `}
                                    >
                                        <div className={styles['renter-gallery__slide-img-wrapper']}>
                                            <DefaultImage
                                                src={slide[1].desktopImage ? slide[1].desktopImage : '/images/no-foto.jpg'}
                                                srcMob={slide[1].mobileImage ? slide[1].mobileImage : '/images/no-foto.jpg'}
                                                alt={slide[1].alt ? slide[1].alt : 'Изображение галереи'}
                                            />
                                        </div>
                                    </SwiperSlide>
                                }
                                {
                                    slide[2] &&
                                        <SwiperSlide
                                            className={`
                                                ${styles['renter-gallery__slide']}
                                                ${styles[`renter-gallery__slide_third`]}
                                            `}
                                        >
                                            <div className={styles['renter-gallery__slide-img-wrapper']}>
                                                <DefaultImage
                                                    src={slide[2].desktopImage ? slide[2].desktopImage : '/images/no-foto.jpg'}
                                                    srcMob={slide[2].mobileImage ? slide[2].mobileImage : '/images/no-foto.jpg'}
                                                    alt={slide[2].alt ? slide[2].alt : 'Изображение галереи'}
                                                />
                                            </div>
                                        </SwiperSlide>
                                }
                            </Fragment>
                        ))
                    }
                </Swiper>
            </UISection>

            <div className={`
                ${styles['renter-show-gallery']}
                ${isShowGalleryOpen ? styles['renter-show-gallery_active'] : ''}
                js-renter-show-gallery
            `}>
                <div
                    className={styles['renter-show-gallery__close-btn']}
                    onClick={() => handleToggleShowGalleryOpen('close')}
                >
                    <SvgIcon id='close' color='#fff' />
                </div>
                <SingleRenterShowGallery gallery={data} />
            </div>
        </>
    )
}

function SingleRenterShowGallery({gallery}) {
    const swiperBigRef = useRef(null);

    function handlePrev() {
        (swiperBigRef.current && swiperBigRef.current.swiper) && swiperBigRef.current.swiper.slidePrev();
    }

    function handleNext() {
        (swiperBigRef.current && swiperBigRef.current.swiper) && swiperBigRef.current.swiper.slideNext();
    }

    return (
        <>
            <style>{`
                .swiper-slide-thumb-active:before {
                    content: none;
                }
            `}</style>

            <div className={styles['renter-show-gallery__sliders']}>

                <div className={`
                    ${styles['renter-gallery__slider-buttons']}
                    ${styles['renter-show-gallery__slider-buttons']}
                `}>
                    <div onClick={handlePrev}>
                        <ButtonCircleFull isRevers={true}/>
                    </div>
                    <div onClick={handleNext}>
                        <ButtonCircleFull isRevers={false}/>
                    </div>
                </div>

                <Swiper
                    ref={swiperBigRef}
                    slidesPerView={1}
                    className={styles['renter-show-gallery__slider-big']}
                    loop
                    thumbs={{
                        swiper: {
                            el: '.renter-show-gallery__slider-small',
                            slidesPerView: 2,
                            spaceBetween: 20,
                            breakpoints: {
                                481: {
                                    slidesPerView: 4,
                                },
                                721: {
                                    slidesPerView: 4,
                                },
                            }
                        }
                    }}
                    modules={[Thumbs]}
                >
                    {
                        gallery.map((slide, index) => (
                            <SwiperSlide className={styles['renter-show-gallery__slide-big']} key={index}>
                                <DefaultImage
                                    src={slide.desktopImage ? slide.desktopImage : '/images/no-foto.jpg'}
                                    srcMob={slide.mobileImage ? slide.mobileImage : '/images/no-image.jpg'}
                                    alt={slide.alt ? slide.alt : 'Изображение галереи'}
                                />
                            </SwiperSlide>
                        ))
                    }
                </Swiper>

                <Swiper
                    slidesPerView={2}
                    spaceBetween={20}
                    breakpoints={{
                        481: {
                            slidesPerView: 4,
                        },
                        721: {
                            slidesPerView: 4,
                        },
                    }}
                    loop
                    watchSlidesProgress={true}
                    modules={[Thumbs]}
                    className={`
                        ${styles['renter-show-gallery__slider-small']}
                        renter-show-gallery__slider-small
                    `}
                >
                    {
                        gallery.map((slide, index) => (
                            <SwiperSlide className={styles['renter-show-gallery__slide-small']} key={index}>
                                <DefaultImage
                                    src={slide.mobileImage ? slide.mobileImage : '/images/no-image.jpg'}
                                    alt={slide.alt ? slide.alt : 'Изображение галереи'}
                                />
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </>
    )
}
