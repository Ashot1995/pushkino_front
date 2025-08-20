'use client';

import {useSelector, useDispatch} from "react-redux";
import {useEffect, useState, useRef} from "react";

import {RentersListFilter} from "../../features/renters-list/filter";
import {RentersListCategories} from "../../features/renters-list/categories";
import {RentersListItems} from "../../features/renters-list/items";
import {networkService} from "../../shared/lib/network";
import {
    changeRentersCategories,
    changeRentersFloors,
    changeHasNewRentersList,
    changeHasStockRentersList,
} from "../../shared/lib/store/slices/rentersListFilter";

import styles from './styles.module.scss';

import {RENTERS_CATEGORIES} from "../../shared/config/constants";
import {SvgIcon} from "../../shared/ui/svg-icon";

export function RentersList({searchParams, type}) {
    const dispatch = useDispatch();

    const firstRender = useRef(true);

    const locationHref = useRef(null);
    const windowHistory = useRef(null);

    const selectedCategories = useSelector(state => state.rentersListFilter.value.selectedCategories);
    const selectedFloors = useSelector(state => state.rentersListFilter.value.selectedFloors);
    const hasNew = useSelector(state => state.rentersListFilter.value.hasNew);
    const hasStock = useSelector(state => state.rentersListFilter.value.hasStock);
    const searchInputValue = useSelector(state => state.rentersListFilter.value.searchInputValue);

    const [rentersData, setRentersData] = useState(null);
    const [rentersDataForSearch, setRentersDataForSearch] = useState(null);
    const [rentersCategories, setRentersCategories] = useState(null);
    const [whatModalShow, setWhatModalShow] = useState('');

    useEffect(() => {
        networkService().getRentersCategories(type).then(setRentersCategories);

        locationHref.current = window.location.href;
        windowHistory.current = window.history;

        let startCategories = '';
        let startFloors = '';
        let startNews = 0;
        let startStocks = 0;

        if (Object.keys(searchParams).length) {
            Object.keys(searchParams).forEach(key => {
                switch (key) {
                    case 'categories':
                        dispatch(changeRentersCategories(searchParams[key]));
                        startCategories = searchParams[key];
                        break;
                    case 'floors':
                        dispatch(changeRentersFloors(searchParams[key]));
                        startFloors = searchParams[key];
                        break;
                    case 'has_stocks':
                        dispatch(changeHasStockRentersList(true));
                        startNews = true;
                        break;
                    case 'has_new':
                        dispatch(changeHasNewRentersList(true));
                        startStocks = true;
                        break;
                    default:
                        break;
                }
            });
        }

        networkService().getRenters(type, startCategories, startFloors, startNews, startStocks).then(data => {
            setRentersData(data);
            setRentersDataForSearch(data);
        });

    }, []);

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }

        setRentersData(null);

        networkService().getRenters(type, selectedCategories, selectedFloors, hasNew, hasStock).then(data => {
            setRentersData(data);
            setRentersDataForSearch(data);
        });

        if (locationHref.current && windowHistory.current) {
            const url = new URL(locationHref.current);

            selectedCategories.length > 0 ? url.searchParams.set('categories', selectedCategories) : url.searchParams.delete('categories');
            selectedFloors.length > 0 ? url.searchParams.set('floors', selectedFloors) : url.searchParams.delete('floors');
            hasNew ? url.searchParams.set('has_new', '1') : url.searchParams.delete('has_new');
            hasStock ? url.searchParams.set('has_stocks', '1') : url.searchParams.delete('has_stocks');

            windowHistory.current.pushState({}, '', url);
        }
    }, [selectedCategories, selectedFloors, hasNew, hasStock]);

    // useEffect(() => {
    //     dispatch(changeRentersCategories(''));
    //     dispatch(changeRentersFloors(''));
    //     dispatch(changeHasStockRentersList(false));
    //     dispatch(changeHasNewRentersList(false));
    //
    //     networkService().getRenters(type).then(data => {
    //         setRentersData(data);
    //         setRentersDataForSearch(data);
    //     });
    // }, [locationHref.current]);

    useEffect(() => {
        if (rentersDataForSearch) {
            const filteredStores = rentersDataForSearch.stores.filter(store => store.heading.toLowerCase().includes(searchInputValue.toLowerCase()));

            const filteredStoreGroup = {};

            filteredStores.forEach(store => {
                if (filteredStoreGroup[store.liter]) {
                    filteredStoreGroup[store.liter].push(store);
                } else {
                    filteredStoreGroup[store.liter] = [store];
                }
            });

            setRentersData({
                stores: filteredStores,
                storesGroup: filteredStoreGroup,
            });
        }
    }, [searchInputValue]);

    function toggleModal(modalName) {
        setWhatModalShow(modalName);
    }

    return (
        <main className={styles['renters-list']}>
            <div className={`${styles['renters-list']}__container`}>
                <h1 className={`${styles['renters-list__heading']} h1 h1_caps`}>{RENTERS_CATEGORIES[type].name}</h1>
                <RentersListFilter toggleModal={toggleModal} whatModalShow={whatModalShow} />

                <div className={`
                    ${styles['renters-list__wrapper']}
                    ${type === 'recreation' || type === 'services' ? styles['renters-list__wrapper_four-columns'] : null}
                `}>
                    {
                        rentersCategories &&
                            rentersCategories.length > 0 &&
                                type !== 'services' &&
                                    <RentersListCategories
                                        categories={rentersCategories}
                                        toggleModal={toggleModal}
                                        whatModalShow={whatModalShow}
                                    />
                    }
                    {
                        rentersData &&
                            rentersData.stores.length > 0 &&
                                <RentersListItems data={rentersData} type={type} />
                    }
                    {
                        rentersData &&
                            rentersData.stores.length === 0 &&
                            <div className={styles['renters-list__message']}>
                                <SvgIcon id='sad' color='#000' />
                                <span>По вашему запросу ничего не нашли</span>
                            </div>
                    }
                    {
                        !rentersData &&
                            <div className={styles['renters-list__message']}>
                                Ищем совпадения, подождите...
                            </div>
                    }
                </div>
            </div>
        </main>
    )
}
