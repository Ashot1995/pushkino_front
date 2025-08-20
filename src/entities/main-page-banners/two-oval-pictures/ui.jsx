import Link from "next/link";

import {DefaultImage} from "../../../shared/ui/defaultImage";

import styles from './styles.module.scss';

export function MainPageBannerTwoOvalPictures({data}) {

    return (
        <div
            className={styles['banner-two-oval-pictures']}
            style={{
                background: data.backgroundColor?.replace(/\;/g, ''),
            }}
        >
            <div className={`${styles['banner-two-oval-pictures']}__container`}>
                <div className={styles['banner-two-oval-pictures__grid-wrapper']}>
                    <div className={styles['banner-two-oval-pictures__description']}>
                        <div
                            className={styles['banner-two-oval-pictures__heading']}
                            style={{
                                color: data.colorText?.slice(0, 7),
                            }}
                        >
                            {data.heading?.split(' ')[0].trim().replace(/\s+/g, ' ')}
                            <span> {data.heading?.split(' ')[1]?.trim().replace(/\s+/g, ' ')}</span>
                        </div>
                        <div
                            className={styles['banner-two-oval-pictures__text']}
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
                                    ${styles['banner-two-oval-pictures__link']}
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
                    <div className={styles['banner-two-oval-pictures__images']}>
                        <div className={styles['banner-two-oval-pictures__image']}>
                            <DefaultImage
                                src={data.images.firstImage.imageDesktop ? data.images.firstImage.imageDesktop : ''}
                                srcMob={data.images.firstImage.imageMobile ? data.images.firstImage.imageMobile : ''}
                                alt={data.images.firstImage.alt ? data.images.firstImage.alt : ''}
                            />
                        </div>
                        <div className={styles['banner-two-oval-pictures__image']}>
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
