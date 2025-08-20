'use client';

import Link from "next/link";
import {useState, useEffect, useRef} from "react";

import {DefaultImage} from "../../../shared/ui/defaultImage";

import styles from './styles.module.scss';

export function MainPageStocks({stocksData}) {
    const slides = useRef(null);
    const sliderStyleVariables = useRef(null);

    const [directionSlides, setDirectionSlides] = useState('down');

    const slidesData = [];

    useEffect(() => {
        slides.current = document.querySelectorAll('.js-stocks__slider-slide');
        sliderStyleVariables.current = document.querySelector('.js-stocks__slider').style;

        slides.current &&
            slides.current.forEach((slide, index) => {
                slide.style.cssText = `--index: ${index}`;
            });

        slides.current &&
            sliderStyleVariables.current &&
                sliderStyleVariables.current.setProperty('--count', slides.current.length);
    }, [slidesData])

    if (stocksData) {
        for(let i = 0, stocksDataLength = stocksData.length; i < stocksDataLength; i += 3) {
            const threeSlides = [];

            for(let j = 0; j < 3; j++) {
                threeSlides.push(stocksData[i + j])
            }

            slidesData.push(threeSlides);
        }
    }

    return (
        <section className={styles['stocks']}>
            <div className={styles['stocks__full-screen']}></div>
            <div className={styles['stocks__wrapper']}>
                <div className={styles['stocks__description']}>
                    <div className={styles['stocks__heading']}>
                        Акции
                    </div>
                    <div className={styles['stocks__content']}>
                        Тысячи предложений в сотне магазинов.
                    </div>
                    <Link href="/stocks" className={`
                        ${styles['stocks__button']}
                        btn
                    `}>
                        Показать все
                    </Link>
                    <div className={styles['stocks__content-warning']}>
                        Обратите внимание: Время проведения акций ограничено. Подробности узнавайте на кассе
                        магазинов.
                    </div>
                </div>

                <div
                    className={`${styles['stocks__slider']} js-stocks__slider`}
                >
                    <div
                        className={styles['stocks__slider-go-up']}
                        onMouseEnter={() => setDirectionSlides('up')}
                    ></div>
                    <div className={styles['stocks__slider-wrapper']}>
                        {
                            slidesData.length > 0 &&
                                slidesData.map((treeSlides, index) => (
                                    <div
                                        className={`
                                            ${styles['stocks__slider-slide']}
                                            ${styles[`stocks__slider-slide_${directionSlides}`]}
                                            js-stocks__slider-slide
                                        `}
                                        key={index}
                                    >
                                        {
                                            treeSlides.map((slide, index) => {
                                                if (slide) {
                                                    return (
                                                        <Link
                                                            href={slide.link ? slide.link : '#!'}
                                                            className={styles['stocks__slide-tile']}
                                                            key={index}
                                                        >
                                                            <DefaultImage
                                                                src={slide.image ? slide.image : '/images/no-image.jpg'}
                                                                alt={slide.alt ? slide.alt : 'Акция'}
                                                            />
                                                            <div className={styles['stocks__slide-heading']}>
                                                                {slide.text?.trim().replace(/\s+/g, ' ')}
                                                            </div>
                                                        </Link>
                                                    )
                                                }
                                            })
                                        }
                                    </div>
                                ))
                        }
                    </div>
                    <div
                        className={styles['stocks__slider-go-down']}
                        onMouseEnter={() => setDirectionSlides('down')}
                    ></div>
                </div>

            </div>
        </section>
    )
}
