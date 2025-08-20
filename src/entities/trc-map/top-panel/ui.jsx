'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Checkbox } from "../../../shared/ui/checkbox";
import { SvgIcon } from "../../../shared/ui/svg-icon";
import styles from './styles.module.scss';

export function MapTopPanel({floorType = '1floor', getFloorType}) {
    const [activeLink, setActiveLink] = useState(null);
    const [showFloorMobile, setShowFloorMobile] = useState(false);

    const floors = [
        {
            title: 'павильоны на парковке',
            type: 'parking'
        },
        {
            title: '1 этаж',
            type: '1floor',
        },
        {
            title: '2 этаж',
            type: '2floor'
        },
    ]

    const floorLabels = {
        '1floor': '1 этаж',
        '2floor': '2 этаж',
        'parking': 'павильоны на парковке',
    }

    useEffect(() => {
        setActiveLink(floorType);
    }, [floorType]);

    return (
        <>
            <div className={styles['top-panel']}>

                <div className={styles['spacer']}></div>

                <div className={styles['floor-toggle']}>

                    <div className={styles['toggle-mobile']} onClick={() => {showFloorMobile ? setShowFloorMobile(false) : setShowFloorMobile(true)}}>
                        <div className={styles['mobile-label']}>{ floorLabels[activeLink] }</div>
                        <SvgIcon id={'chevron'} color={'#000000'}></SvgIcon>
                    </div>

                    <div className={`${styles['toggle-wrapper']} ${showFloorMobile ? styles['active'] : ''}`}>

                        <div className={styles['toggle-wrapper-inner']}>

                            {
                                floors.map((floor, index) => (
                                    <div
                                        className={`
                                        ${styles['toggle-link']}
                                        ${activeLink === floor.type ? styles['active'] : ''}
                                    `}
                                        key={`floor${index}`}
                                        onClick={() => {
                                            showFloorMobile ? setShowFloorMobile(false) : setShowFloorMobile(true)
                                            setActiveLink(floor.type);
                                            getFloorType(floor.type)
                                        }
                                        }
                                    >{floor.title}</div>
                                ))
                            }

                        </div>

                    </div>
                </div>

                <div className={styles['checkboxes']}>
                    <Checkbox label='Акции' />
                    <Checkbox label='Новинки' />
                </div>

            </div>
        </>
    )
}