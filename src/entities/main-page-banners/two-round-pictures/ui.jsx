import Link from "next/link";

import {DefaultImage} from "../../../shared/ui/defaultImage";

import styles from './styles.module.scss';

export function MainPageBannerTwoRoundPictures({data}) {
    return (
        <div
            className={styles['banner-two-round-pictures']}
            style={{
                background: data.backgroundColor?.replace(/\;/g, ''),
            }}
        >
            <div className={`${styles['banner-two-round-pictures']}__container`}>
                <div className={styles['banner-two-round-pictures__grid-wrapper']}>
                    <div className={styles['banner-two-round-pictures__description']}>
                        <div
                            className={styles['banner-two-round-pictures__heading']}
                            style={{
                                color: data.colorText?.slice(0, 7),
                            }}
                        >
                            {data.heading?.trim().replace(/\s+/g, ' ')}
                        </div>
                        <div
                            className={styles['banner-two-round-pictures__text']}
                            style={{
                                color: data.colorText?.slice(0, 7),
                            }}
                        >
                            {data.description?.trim().replace(/\s+/g, ' ')}
                        </div>
                        {
                            data.link &&
                                <Link
                                    href={data.link}
                                    className={`
                                    ${styles['banner-two-round-pictures__link']}
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
                    <div className={styles['banner-two-round-pictures__images']}>
                        <div className={styles['banner-two-round-pictures__image']}>
                            <DefaultImage
                                src={data.images.firstImage.imageDesktop ? data.images.firstImage.imageDesktop : ''}
                                srcMob={data.images.firstImage.imageMobile ? data.images.firstImage.imageMobile : ''}
                                alt={data.images.firstImage.alt ? data.images.firstImage.alt : ''}
                            />
                        </div>
                        <div className={styles['banner-two-round-pictures__image']}>
                            <DefaultImage
                                src={data.images.secondImage.imageDesktop ? data.images.secondImage.imageDesktop : ''}
                                srcMob={data.images.secondImage.imageMobile ? data.images.secondImage.imageMobile : ''}
                                alt={data.images.secondImage.alt ? data.images.secondImage.alt : ''}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
