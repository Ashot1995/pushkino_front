'use client';

import React, {useRef} from "react";
import {Swiper, SwiperSlide} from "swiper/react";

import {UISection} from "../../../shared/ui/section";

import 'swiper/css';
import 'swiper/css/bundle';

import styles from './styles.module.scss';
import {ButtonCircleTransparentGray} from "../../../shared/ui/buttons";

export function SingleEventSchedule({data}) {
    const swiperRef = useRef(null);

    function handlePrev() {
        (swiperRef.current && swiperRef.current.swiper) && swiperRef.current.swiper.slidePrev();
    }

    function handleNext() {
        (swiperRef.current && swiperRef.current.swiper) && swiperRef.current.swiper.slideNext();
    }

    return (
        <UISection defaultClass={styles['event-schedule']}>
            <div className={styles['event-schedule__heading']}>Расписание мероприятий</div>

            {
                data.length > 3 &&
                    <div className={styles['event-schedule__slider-buttons']}>
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
                slidesPerView={1}
                spaceBetween={20}
                breakpoints={{
                    481: {
                        slidesPerView: 2,
                    },
                    721: {
                        slidesPerView: 3,
                    },
                }}
                speed={500}
                className={styles['event-schedule__swiper']}
            >
                {
                    data.map((date, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <div className={styles['event-schedule__item']}>
                                    <div className={styles['event-schedule__item-heading']}>{date.date && date.date}</div>
                                    {
                                        date.events.map((event, index) => (
                                            <React.Fragment key={index}>
                                                <div className={styles['event-schedule__item-time']}>{event.time && event.time}</div>
                                                <div className={styles['event-schedule__item-description']}
                                                     dangerouslySetInnerHTML={{__html: `${event.description ? event.description.trim().replace(/\s+/g, ' ') : ''} ${event.cost ? `${event.cost} руб.` : ''}`}}
                                                >
                                                </div>
                                            </React.Fragment>
                                        ))
                                    }
                                </div>
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </UISection>
    )
}
