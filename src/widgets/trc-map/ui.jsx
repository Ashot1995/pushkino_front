'use client';

import {useEffect, useRef, useState} from "react";
import Script from 'next/script';
import {useSearchParams} from 'next/navigation'

import styles from './styles.module.scss'

export function TrcMapWidget() {
    const mapRef = useRef(null);
    const [location, setLocation] = useState(null);
    const [isMapReady, setIsMapReady] = useState(false);
    const currentParams = useSearchParams();

    useEffect(() => {
        // Временный костыль, для фикса бага с историей в маплике (пока не обновят маплик)
        history.pushState = function (state, title, url) {
            return history.replaceState(state, title, url);
        }
    }, []);

    useEffect(() => {
        const initializeMap = () => {
            mapRef.current = document.getElementById('my-map');
            if (mapRef.current && window.mapplic) {
                setIsMapReady(true);
                return true;
            }
            return false;
        };

        // Try to initialize immediately
        if (!initializeMap()) {
            // If not ready, wait for mapplic to load
            const checkInterval = setInterval(() => {
                if (initializeMap()) {
                    clearInterval(checkInterval);
                }
            }, 100);

            // Cleanup interval after 10 seconds
            setTimeout(() => clearInterval(checkInterval), 10000);
        }
    }, []);

    useEffect(() => {
        if (!isMapReady) return;

        const loadTimer = setInterval(() => {
            if(mapRef.current && mapRef.current.store) {
                setTimeout(() => {
                    if(currentParams.get('id') !== null) {
                        mapRef.current.store.getState().openLocation(`${currentParams.get('id')}`);
                    }
                }, 500)
                clearInterval(loadTimer)
            }
        }, 200)
    }, [isMapReady, mapRef]);

    function updateSorting(id) {
        const params = new URLSearchParams(currentParams.toString())
        id !== null && id !== undefined ? params.set('id', id) : params.delete(id)
        window.history.pushState(null, '', `?${params.toString()}`)
    }

    useEffect(() => {
        const interval = setInterval(()=> {
            const currentLocation = mapRef.current?.store?.getState().location;
            if(currentLocation !== location) {
                setLocation(currentLocation);
                updateSorting(currentLocation)
            }
        }, 100);

        return () => clearInterval(interval);
    }, [location]);

    return (
        <>
            <Script 
                src="https://mapplic.com/mapplic.js" 
                strategy="beforeInteractive"
                onLoad={() => {
                    console.log('Mapplic script loaded');
                }}
            />
            <Script 
                src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js" 
                strategy="afterInteractive"
            />
            <div className={styles['map']}>
                {!isMapReady && (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '400px',
                        fontSize: '16px',
                        color: '#666'
                    }}>
                        Загрузка карты...
                    </div>
                )}
                <mapplic-map 
                    id="my-map" 
                    data-json="https://mapplic.com/getMapData?id=KSjP1djQmDMPYZVeaaYz"
                    style={{ display: isMapReady ? 'block' : 'none' }}
                ></mapplic-map>
            </div>
            <Script id="refresh-style-map">
                  {`document.getElementById('my-map').addEventListener('ready',function () {
                    setInterval(() => {
                        const legend = document.querySelector('.mapplic-legend');
                        if (legend && !legend.classList.contains('closed')) {
                            legend.style.height = '200px';
                            legend.style.display = 'block';
                        } else if (legend) {
                            legend.style.height = '30px';
                        }
                    }, 4000);
                  });`}
            </Script>
        </>
    )
}