import Link from "next/link";

import {DefaultImage} from "../../../shared/ui/defaultImage";

import styles from './styles.module.scss';

export function MainPageBannerOneSquarePicture({data}) {
    return (
        <div
            className={styles['banner-one-square-picture']}
            style={{
                background: data.backgroundColor?.replace(/\;/g, ''),
            }}
        >
            <div className={`${styles['banner-one-square-picture']}__container`}>
                <div className={styles['banner-one-square-picture__grid-wrapper']}>
                    <div className={styles['banner-one-square-picture__description']}>
                        <div
                            className={styles['banner-one-square-picture__heading']}
                            style={{
                                color: data.colorText?.slice(0, 7),
                            }}
                        >
                            {data.heading?.trim().replace(/\s+/g, ' ')}
                        </div>
                        <div
                            className={styles['banner-one-square-picture__text']}
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
                                    ${styles['banner-one-square-picture__link']}
                                    btn btn_transparent
                                `}
                                    style={{
                                        color: data.colorButtonText?.slice(0, 7),
                                        backgroundColor: data.backgroundColorButton?.slice(0, 7),
                                    }}
                                >
                                    {data.buttonText?.trim().replace(/\s+/g, ' ')}
                                </Link>
                        }
                    </div>
                    <div className={styles['banner-one-square-picture__image']}>
                        <picture>
                            <source
                                srcSet={data.images.imageMobile ? data.images.imageMobile : ''}
                                media="(max-width: 720px)"/>
                            <DefaultImage
                                src={data.images.imageDesktop ? data.images.imageDesktop : ''}
                                alt={data.images.alt ? data.images.alt : ''}
                            />
                        </picture>
                    </div>
                </div>
            </div>
        </div>
    )
}
