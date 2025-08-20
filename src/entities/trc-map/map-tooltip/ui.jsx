'use client';

import React, { useEffect, useRef } from 'react';

import styles from './styles.module.scss';

export function MapTooltip({title, hidden = false, left = 0, top = 0}) {
    return (
        <>
            <div className={`${styles['tooltip']} ${hidden ? styles.hidden : ''}`} style={{ left: left + 'px', top: top + 'px' }}>
                <div className={styles['tooltip-inner']}>{title}</div>
            </div>
        </>
    )
}