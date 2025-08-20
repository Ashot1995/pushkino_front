'use client';

import {useEffect, useRef, useState} from "react";
import Script from 'next/script';
import {useSearchParams} from 'next/navigation'

import styles from './styles.module.scss'

export function TrcMapWidget() {
    const mapRef = useRef(null);
    const [location, setLocation] = useState(null);
    const currentParams = useSearchParams();

    useEffect(() => {

        // Временный костыль, для фикса бага с историей в маплике (пока не обновят маплик)
        history.pushState = function (state, title, url) {
            return history.replaceState(state, title, url);
        }

        mapRef.current = document.getElementById('my-map');
    }, []);

    useEffect(() => {
        const loadTimer = setInterval(() => {
            if(mapRef.current.store) {
                setTimeout(() => {
                    if(currentParams.get('id') !== null) {
                        mapRef.current.store.getState().openLocation(`${currentParams.get('id')}`);
                    }
                }, 500)
                clearInterval(loadTimer)
            }
        }, 200)
    }, [mapRef]);

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
            <Script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js" />
            <div className={styles['map']}>
                <mapplic-map id="my-map" data-json="https://mapplic.com/getMapData?id=KSjP1djQmDMPYZVeaaYz"></mapplic-map>
            </div>
            <Script id="refresh-style-map">
                  {`document.getElementById('my-map').addEventListener('ready',function () {setInterval(() => {
                    if (!document.querySelector('.mapplic-legend').classList.contains('closed')) {
                        document.querySelector('.mapplic-legend').style.height = '200px';
                        document.querySelector('.mapplic-legend').style.display = 'block';
                    } else {
                        document.querySelector('.mapplic-legend').style.height = '30px';
                    }
                }, 4000);});`}
            </Script>
        </>
    )
}