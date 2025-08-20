'use client';

import {useEffect, useState, useRef} from "react";
import {useSelector} from "react-redux";
import {useDebounce} from "use-debounce";

import {SvgIcon} from "../../../shared/ui/svg-icon";

import styles from './styles.module.scss';
import {MAP_POINT_PUSHKINO_PARK, MAP_CONFIG} from "./config";

export function HowToGetMap() {
    const initMapFlag = useRef(true);
    const yandexMap = useRef(null);
    const mapRouting = useRef(null);

    const routingMode = useSelector(state => state.howToGetRoutingMode.value);

    const [routePointA, setRoutePointA] = useState('');
    const [debouncedRoutePointA] = useDebounce(routePointA, 1000);

    useEffect(() => {
        initMapFlag.current && ymaps.ready(initYandexMap);
        initMapFlag.current = !initMapFlag.current;
    }, []);

    useEffect(() => {
        if (yandexMap.current && !mapRouting.current) {
            buildRoute(debouncedRoutePointA, MAP_POINT_PUSHKINO_PARK);
        } else if (yandexMap.current && mapRouting.current) {
            mapRouting.current.model.setReferencePoints([debouncedRoutePointA, MAP_POINT_PUSHKINO_PARK]);

            mapRouting.current.model.events.add('requestsuccess', () => {
                const bounds = mapRouting.current.getBounds();
                yandexMap.current.setBounds(bounds, {checkZoomRange: true});
            })
        }
    }, [debouncedRoutePointA]);

    useEffect(() => {
        debouncedRoutePointA.length > 0
            && mapRouting.current
                && mapRouting.current.model.setParams({routingMode});
    }, [routingMode]);

    yandexMap.current && yandexMap.current.container.fitToViewport();

    function initYandexMap() {
        yandexMap.current = new ymaps.Map(
            "map",
            MAP_CONFIG,
            {
                autoFitToViewport: 'always',
            }
        );
    }

    function buildRoute(pointA, pointB) {
        mapRouting.current = new ymaps.multiRouter.MultiRoute(
            {
                referencePoints: [
                    pointA,
                    pointB,
                ],
                params: {
                    routingMode: routingMode,
                },
            },
            {
                boundsAutoApply: true,
                routeActiveStrokeWidth: 6,
                routeActiveStrokeStyle: 'solid',
                routeActiveStrokeColor: "#ff0000",
            },
        );

        yandexMap.current.geoObjects.add(mapRouting.current);
    }

    const handleGeo = () => {
        ymaps.geolocation.get().then(
            function(result) {
                ymaps.geocode(result.geoObjects.position).then(
                    function (result) {
                        setRoutePointA(result.geoObjects.get(0).properties.get('text'));
                    },
                    function (error) {
                        console.log(
                            '%c GEOCODE ERROR ',
                            'color: #fff; background-color: #d33f49;',
                            error
                        );
                        alert('Не удалось построить маршрут. Пожалуйста введите адрес вручную.');
                    }
                )
            },
            function(error) {
                console.log(
                    '%c GEOLOCATION ERROR ',
                    'color: #fff; background-color: #d33f49;',
                    error
                );
                alert('Не удалось определить текущее местоположение. Пожалуйста введите адрес вручную.');
            }
        );
    }

    return (
        <section className={styles['htg-map']}>
            <div id="map" className={styles['htg-map__ymap']}></div>

            <div className={styles['htg-map__route-tile-wrapper']}>
                <div className={styles['htg-map__route-tile']}>
                    <div className={styles['htg-map__route-tile-points']}>
                        <label className={styles['htg-map__route-tile-point']}>
                            <span className={styles['htg-map__route-tile-point-label']}>Откуда</span>
                            <input
                                className={styles['htg-map__route-tile-point-input']}
                                type="text"
                                placeholder="Начнем путь"
                                value={routePointA}
                                onChange={event => setRoutePointA(event.target.value)}
                            />
                            <button
                                className={styles['htg-map__geo-btn']}
                                onClick={handleGeo}
                            >
                                <SvgIcon id="location" color="#3383a4"/>
                            </button>
                        </label>
                        <div className={styles['htg-map__route-tile-point']}>
                            <div className={styles['htg-map__route-tile-point-label']}>Куда</div>
                            <div className={styles['htg-map__route-tile-point-text']}>ТРЦ Пушкино парк</div>
                        </div>
                    </div>
                    <div className={styles['htg-map__route-tile-icon']}>
                        <SvgIcon id="arrow-down" color="#000"/>
                    </div>
                </div>
            </div>


        </section>
    )
}
