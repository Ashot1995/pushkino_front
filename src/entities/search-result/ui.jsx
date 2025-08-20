import Link from "next/link";
import {useEffect, useRef} from "react";

import {DefaultImage} from "../../shared/ui/defaultImage";
import {SvgIcon} from "../../shared/ui/svg-icon";

import styles from './styles.module.scss';

import {SEARCH_CATEGORIES} from "./config";

export function SearchResult({data, setSearchValue}) {
    let lengthResultData = 0;
    const refSearchResultWrapper = useRef(null);
    const rootWrapperRef = useRef(null);

    useEffect(() => {
        const searchResultElement = document.querySelector('.search-result-wrapper');
        const rootElement = document.querySelector('.root-wrapper');

        refSearchResultWrapper.current = searchResultElement;
        rootWrapperRef.current = rootElement;

        const handleWheel = (e) => {
            rootElement.classList.add('no-scroll-block');
        }

        const handleMouseLeave = () => {
            rootElement.classList.remove('no-scroll-block');
        }

        if (searchResultElement) {
            searchResultElement.addEventListener('mouseenter', handleWheel);
            searchResultElement.addEventListener('mouseleave', handleMouseLeave);
        }

        rootWrapperRef.current && rootWrapperRef.current.addEventListener('click', event => {
            typeof event.target.className === 'string' &&
                !event.target.className.includes('search-result') &&
                    setSearchValue('');
        });

        return () => {
            if (searchResultElement) {
                searchResultElement.removeEventListener('mouseenter', handleWheel);
                searchResultElement.removeEventListener('mouseleave', handleMouseLeave);
            }
        }
    }, []);

    if (data) {
        Object.keys(data).forEach(key => lengthResultData += data[key].length);
    }

    return (
        <div className={`${styles['search-result']} search-result`}>
            {
                lengthResultData > 0 &&
                    <div className={styles['search-result__wrapper']} onScroll={(e) => {e.stopPropagation()}}>
                        {
                            Object.keys(data).map(key => (
                                data[key].map((item, index) => (
                                    <Link href={item.link ? item.link : '#!'} className={styles['search-result__item']}
                                          key={index}>
                                        <div className={styles['search-result__item-image']}>
                                            <DefaultImage
                                                src={item.logo ? item.logo : '/images/no-foto.jpg'}
                                                alt={item.heading ? item.heading : 'Логотип магазина'}
                                            />
                                        </div>
                                        <div className={styles['search-result__item-data']}>
                                            <div className={styles['search-result__data-title']}>
                                                <div className={`
                                                    ${styles['search-result__data-name']}
                                                    ${
                                                        key === 'commercial'
                                                            ? styles['search-result__data-name_commercial']
                                                            : styles['search-result__data-name_other']
                                                    }
                                                `}>
                                                    {item.heading && item.heading}
                                                </div>
                                                <div className={styles['search-result__data-type']}>
                                                    {item.category ? item.category : SEARCH_CATEGORIES.hasOwnProperty(key) ? SEARCH_CATEGORIES[key] : ''}
                                                </div>
                                            </div>
                                            <div className={styles['search-result__data-floor']}>
                                                {item.floor ? `${item.floor} этаж` : item.floor === 0 ? `Парковка` : ''}
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            ))
                        }
                    </div>
            }

            {
                !data &&
                    <div className={styles['search-result__message']}>
                        <span>Ищем совпадения, подождите...</span>
                    </div>
            }

            {
                data && lengthResultData === 0 &&
                    <div className={styles['search-result__message']}>
                        <SvgIcon id='sad' color='#000'/>
                        <span>По вашему запросу ничего не нашли</span>
                    </div>
            }
        </div>
    )
}
