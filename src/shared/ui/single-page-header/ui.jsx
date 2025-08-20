'use client';

import Link from "next/link";
import Image from "next/image";

import {UISection} from "../../../shared/ui/section";
import {DefaultImage} from "../defaultImage";

import styles from './styles.module.scss';

export function SinglePageHeader({data, blockReverse = false, renterType = '', isNews = false}) {

    return (
        <UISection defaultClass={styles['single-page-header']}>
            <div className={styles['single-page-header__wrapper']}>
                <div className={`
                    ${styles['single-page-header__description']}
                    ${blockReverse && styles['single-page-header__description_reverse']}
                `}>
                    <h1 className={`
                            ${styles['single-page-header__heading']}
                            single-page-header__heading
                        `}
                        dangerouslySetInnerHTML={{__html: data.heading?.trim().replace(/\s+/g, ' ')}}
                    ></h1>
                    {
                        isNews
                            ? data.date && <div className={styles['single-page-header__date_news']}>Дата публикации: {data.date.trim().replace(/\s+/g, ' ')}</div>
                            : data.date && <div className={styles['single-page-header__date']}>{data.date.trim().replace(/\s+/g, ' ')}</div>
                    }
                    {
                        data.location &&
                        <div className={styles['single-page-header__location']}>
                                <div className={styles['single-page-header__floor']}>{
                                    data.location.floor !== null && (data.location.floor === 0 ? `Паркинг` : `${data.location.floor} этаж`)
                                }</div>
                                <Link
                                    href={data.idSpace ? `/trc-map?id=${data.idSpace}` : '/trc-map'}
                                    className={`${styles['single-page-header__link']} ${styles['more-link']} btn btn_transparent`}
                                >
                                    Показать на карте
                                </Link>
                            </div>
                    }
                    {
                        data.presentationLink &&
                            <Link  href={data.presentationLink} className={`${styles['about__link']} btn`}>Скачать презентацию</Link>
                    }
                    {
                        data.description &&
                            <div
                                className={styles['single-page-header__text']}
                                dangerouslySetInnerHTML={{__html: data.description}}
                            ></div>
                    }
                </div>

                <div className={styles['single-page-header__right-side']}>
                    <div className={styles['single-page-header__banner']}>
                        <DefaultImage
                            src={data.images.desktop ? data.images.desktop : data.images.desktopImage ? data.images.desktopImage : '/images/no-foto.jpg'}
                            srcMob={data.images.mobile ? data.images.mobile : data.images.mobileImage ? data.images.mobileImage : '/images/no-foto.jpg'}
                            alt={data.images.alt ? data.images.alt : 'Основной баннер'}
                        />
                        {
                            data.logo &&
                                <div className={styles['single-page-header__logo']}>
                                    <Image
                                        src={data.logo}
                                        alt="Логотип"
                                        width={80}
                                        height={80}
                                        style={{
                                            objectFit: "cover",
                                            objectPosition: "center",
                                        }}
                                    />
                                </div>
                        }
                    </div>
                    {
                        data.categories &&
                            <div className={styles['single-page-header__links']}>
                                {
                                    renterType.length > 0
                                        ? data.categories.map((category, index) =>
                                                <Link
                                                    href={`/${renterType}?categories=${category.id}`}
                                                    key={category.id ? category.id : index}
                                                >
                                                    {category.category?.trim().replace(/\s+/g, ' ')}
                                                </Link>
                                            )
                                        : data.categories.map((category, index) =>
                                                <span
                                                    key={category.id ? category.id : index}
                                                >
                                                    {category.category?.trim().replace(/\s+/g, ' ')}
                                                </span>
                                            )

                                }
                            </div>
                    }
                </div>
            </div>
        </UISection>
    )
}
