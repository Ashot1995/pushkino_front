import Link from "next/link";

import {DefaultImage} from "../../../shared/ui/defaultImage";

import styles from './styles.module.scss';

export function MainPageBannerTheatreThirdRim({data}) {
    return (
        <div
            className={styles['banner-theatre-third-rim']}
            style={{
                background: data.backgroundColor?.replace(/\;/g, ''),
            }}
        >
            <div className={`${styles['banner-theatre-third-rim']}__container`}>
                <div className={styles['banner-theatre-third-rim__wrapper']}>
                    <div className={styles['banner-theatre-third-rim__description']}>
                        <div className={styles['banner-theatre-third-rim__description-wrapper']}>
                            <div
                                className={styles['banner-theatre-third-rim__heading']}
                                style={{
                                    color: data.colorText?.slice(0, 7),
                                }}
                            >
                                {data.heading?.trim().replace(/\s+/g, ' ')}
                            </div>
                            <div
                                className={styles['banner-theatre-third-rim__text']}
                                style={{
                                    color: data.colorText?.slice(0, 7),
                                }}
                            >
                                {data.description?.trim().replace(/\s+/g, ' ')}
                            </div>
                        </div>
                        {
                            data.link &&
                            <Link
                                href={data.link}
                                className={`
                                    ${styles['banner-theatre-third-rim__link']}
                                    btn
                                `}
                                style={{
                                    color: data.colorButtonText?.slice(0, 7),
                                    backgroundColor: data.backgroundColorButton?.slice(0, 7),
                                    borderColor: data.backgroundColorButton?.slice(0, 7),
                                }}
                            >
                                    {data.buttonText?.trim().replace(/\s+/g, ' ')}
                                </Link>
                        }
                    </div>
                    <div className={styles['banner-theatre-third-rim__image']}>
                        <DefaultImage
                            src={data.images.imageDesktop ? data.images.imageDesktop : ''}
                            srcMob={data.images.imageMobile ? data.images.imageMobile : ''}
                            alt={data.images.alt ? data.images.alt : ''}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
