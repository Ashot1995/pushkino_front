'use client';

import Link from "next/link";
import {useState, useEffect} from "react";

import {DefaultImage} from "../../../shared/ui/defaultImage";

import styles from './styles.module.scss';

export function MainPageStores({categoriesData}) {
    const [currentImage, setCurrentImage] = useState(null);
    const [isImageBlur, setIsImageBlur] = useState(false);

    useEffect(() => {
        categoriesData &&
            setCurrentImage(categoriesData[0].image ? categoriesData[0].image : '/images/no-foto.jpg');
    }, []);

    function hoverStoresTypeLink(event) {
        const newImage = event.target.getAttribute('data-img');

        if (newImage !== currentImage) {
            setIsImageBlur(true);

            setTimeout(() => {
                setCurrentImage(newImage);
                setIsImageBlur(false);
            }, 500);
        }
    }

    return (
        <section className={styles['stores']}>
            <div className={styles['stores__wrapper']}>
                <div className={`
                    ${styles['stores__image']}
                    ${isImageBlur ? styles['stores__image_blur'] : ''}
                `}>
                    <DefaultImage
                        src={currentImage ? currentImage : '/images/no-foto.jpg'}
                        alt='Категория магазина'
                    />
                </div>

                <div className={styles['stores__links']}>
                    <Link href='/stores' className={styles['stores__links-heading']}>Перейти к магазинам</Link>
                    <div className={styles['stores__links-list']}>
                        {
                            categoriesData &&
                                categoriesData.map(category => (
                                    <Link
                                        href={`/stores?categories=${category.id}`}
                                        data-img={category.image ? category.image : '/images/no-foto.jpg'}
                                        key={category.id}
                                        onMouseEnter={hoverStoresTypeLink}
                                    >
                                        {category.category?.trim().replace(/\s+/g, ' ')}
                                    </Link>
                                ))
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}
