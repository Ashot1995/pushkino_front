import Link from "next/link";

import { UISection } from "../ui/section";
import { DefaultImage } from "../ui/defaultImage";

import styles from './styles.module.scss';

export function SingleBannerWithText({
    data,
    bannerSide,
    bannerAlign = 'top',
}) {
    return (
        <UISection defaultClass={styles['single-banner-with-text']}>
            <div className={styles['single-banner-with-text__wrapper']}>
                <div
                    className={`
                        ${styles['single-banner-with-text__banner']}
                        ${styles[`single-banner-with-text__banner_${bannerSide}`]}
                    `}
                >
                    <DefaultImage
                        src={data.desktopImage ? data.desktopImage : '/images/no-foto.jpg'}
                        srcMob={data.mobileImage ? data.mobileImage : '/images/no-foto.jpg'}
                        alt={data.alt ? data.alt : 'Баннер'}
                    />
                </div>
                <div className={`${styles[`single-banner-with-text__description_${bannerAlign}`]}`}>
                    
                    {   data.heading &&
                        <div className={styles['single-banner-with-text__heading']}>{data.heading}</div>
                    }
                    <div className={styles['single-banner-with-text__text']}
                        dangerouslySetInnerHTML={{ __html: data.description?.trim().replace(/\s+/g, ' ') }}
                    ></div>
                    {
                        data.buttonLink &&
                        <div className={styles['single-banner-with-text__button']}>
                            <Link
                                href={data.buttonLink}
                                className={`${styles['single-banner-with-text__link']} btn`}
                            >
                                {data.buttonText ? data.buttonText : 'Подробнее'}
                            </Link>
                        </div>
                    }
                </div>
            </div>
        </UISection>
    )
}
