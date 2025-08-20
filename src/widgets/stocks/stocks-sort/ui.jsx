'use client';

import {useSelector, useDispatch} from "react-redux";
import {useState, useEffect, useRef} from "react";

import {SvgIcon} from "../../../shared/ui/svg-icon";
import {changeStocksTypeSort} from "../../../shared/lib/store/slices/stocksListSorting";
import {changeStocksModal} from "../../../shared/lib/store/slices/whatModalShowInStocksPage";

import styles from './styles.module.scss';

export default function StocksSort() {
    const selectedTypeSort = useSelector(state => state.stocksListSorting.value.selectedTypeSort);
    const whatModalShowInStocksPage = useSelector(state => state.whatModalShowInStocksPage.value.showModal);
    const dispatch = useDispatch();

    const windowRef = useRef();

    const [isDeskSortOpen, setIsDeskSortOpen] = useState(false);
    const [isMobSortOpen, setIsMobSortOpen] = useState(false);

    useEffect(() => {
        windowRef.current = window;
    }, []);

    useEffect(() => {
        whatModalShowInStocksPage === 'categories' ? setIsMobSortOpen(false) : null;
    }, [whatModalShowInStocksPage]);

    return (
        <div className={styles['stocks-sort']}>

            <div
                className={styles['stocks-sort__sort']}
                onClick={() => {
                    setIsMobSortOpen(!isMobSortOpen);
                    dispatch(changeStocksModal('sorting'));
                }}
            >
                <SvgIcon id="list-abc" color="#000"/>
            </div>

            <div className={`
                ${styles['stocks-sort__wrapper']}
                ${isMobSortOpen ? styles['stocks-sort__wrapper_active'] : ''}
            `}>
                <div
                    className={styles['stocks-sort__heading']}
                    onClick={() => setIsDeskSortOpen(!isDeskSortOpen)}
                >
                    <span>Сортировать</span>
                    <SvgIcon id="chevron" color="#000"/>
                </div>

                <div className={`
                ${styles['stocks-sort__list']}
                ${isDeskSortOpen ? styles['stocks-sort__list_active'] : ''}
            `}>
                    <span
                        className={`
                            ${styles['stocks-sort__item']}
                            ${selectedTypeSort === 'start_date' ? styles['stocks-sort__item_active'] : ''}
                        `}
                        onClick={() => {
                            dispatch(changeStocksTypeSort('start_date'));
                            windowRef.current && windowRef.current.innerWidth < 721 && setIsMobSortOpen(!isMobSortOpen);
                        }}
                    >По дате начала</span>
                    <span
                        className={`
                            ${styles['stocks-sort__item']}
                            ${selectedTypeSort === 'end_date' ? styles['stocks-sort__item_active'] : ''}
                        `}
                        onClick={() => {
                            dispatch(changeStocksTypeSort('end_date'));
                            windowRef.current && windowRef.current.innerWidth < 721 && setIsMobSortOpen(!isMobSortOpen);
                        }}
                    >По дате окончания</span>
                </div>
            </div>
        </div>
    )
}
