'use client';

import React, {useEffect, useRef, useState} from 'react';
import {SvgIcon} from "../../../shared/ui/svg-icon";
import styles from './styles.module.scss';

export function MapFilter({ data, onItemClick, onShowHide }) {
    const [activeFilterIndex, setActiveFilterIndex] = useState(null);
    const [activeSubIndex, setActiveSubIndex] = useState(null)
    const filterContainerRef = useRef(null);
    const originalContainerHeightRef = useRef(null);

    const handleFilterClick = (event, index) => {
        setActiveFilterIndex(index);
        updateOriginalContainerHeight();
        toggleSubcategoriesHeight(event);

        onShowHide(true)
    }

    const updateOriginalContainerHeight = () => {
        if (!originalContainerHeightRef.current) {
            originalContainerHeightRef.current = `${filterContainerRef.current.offsetHeight}px`;
        }
    }

    const toggleSubcategoriesHeight = (event) => {
        const subCategoryElement = event.currentTarget.nextSibling;
        filterContainerRef.current.style.height = subCategoryElement ? `${subCategoryElement.scrollHeight}px` : '0px';
    }

    useEffect(() => {
        const setContainerHeightAfterRender = setTimeout(() => {
            if (filterContainerRef.current) {
                filterContainerRef.current.style.height = `${filterContainerRef.current.offsetHeight}px`;
            }
        }, 0);
        return () => clearTimeout(setContainerHeightAfterRender);
    }, [])

    useEffect(() => {
        resetContainerHeightWhenNoActiveFilter();
    }, [activeFilterIndex]);

    const resetContainerHeightWhenNoActiveFilter = () => {
        if (activeFilterIndex === null && filterContainerRef.current) {
            filterContainerRef.current.style.height = originalContainerHeightRef.current;
        }
    }

    return (
        <div className={styles['filter']}>
            <div className={styles['filter-inner']} ref={filterContainerRef}>
                {data.map((item, index) => (
                    <div className={styles['category']} key={index}>
                        <div className={styles['item']} onClick={event => handleFilterClick(event, index) }>
                            { item.category }
                        </div>
                        <div className={`${styles['subcategory']} ${activeFilterIndex === index ? styles.show : ''}`} >
                            <div className={`${styles['subcategory-title']} ${styles['item']}`}
                                 onClick={() => {
                                        setActiveFilterIndex(null);
                                        onShowHide(false);
                                        setActiveSubIndex(null)}
                                    }>
                                <SvgIcon id={'filter-sub-category'} color={'#000000'}></SvgIcon>
                                { item.category }
                            </div>
                            <div className={styles['subcategory-inner']}>
                                {item.subCategory.map((subcategory, subIndex) => (
                                    <div className={`${styles['item']} ${styles['category']} ${activeSubIndex === subIndex ? styles['active'] : ''}`}
                                         key={subIndex}
                                         onClick={() => {
                                             setActiveSubIndex(subIndex)
                                             onItemClick(subcategory)}
                                    }>{subcategory.category}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}