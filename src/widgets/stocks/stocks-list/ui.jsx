'use client';

import {useSelector} from "react-redux";
import {useState, useEffect} from "react";

import {StockTile} from "../../../entities/stock-tile";
import {networkService} from "../../../shared/lib/network";

import styles from './styles.module.scss';
import {SvgIcon} from "../../../shared/ui/svg-icon";

export function StocksList() {
    const selectedSubCategory = useSelector(state => state.stocksListFilter.value.selectedSubCategory);
    const selectedTypeSort = useSelector(state => state.stocksListSorting.value.selectedTypeSort);

    const [stocksData, setStocksData] = useState(null);
    const [currentPage, setCurrentPage] = useState('1');
    const [isShowButton, setIsShowButton] = useState(true);

    useEffect(() => {
        networkService().getStocks().then(response => {
            setStocksData(response);
            setIsShowButton(response.length === 9);
        });
    }, []);

    useEffect(() => {
        setStocksData(null);
        setCurrentPage('1');

        networkService().getStocks('1', selectedSubCategory, selectedTypeSort).then(response => {
            setStocksData(response);
            setIsShowButton(response.length === 9);
        });
    }, [selectedSubCategory, selectedTypeSort]);

    useEffect(() => {
        if (stocksData) {
            networkService().getStocks(currentPage, selectedSubCategory).then(response => {
                setStocksData([...stocksData, ...response]);
                setIsShowButton(response.length === 9);
            });
        }
    }, [currentPage]);

    return (
        <section className={styles['stocks-items']}>

            <div className={styles['stocks-items__list']}>
                {
                    stocksData?.map((stock, index) => <StockTile data={stock} key={index}/>)
                }
                {
                    stocksData &&
                        stocksData.length === 0 &&
                            <div className={styles['stocks-items__message']}>
                                <SvgIcon id='sad' color='#000' />
                                <span>По вашему запросу ничего не нашли</span>
                            </div>
                }
                {
                    !stocksData &&
                        <div className={styles['stocks-items__message']}>
                            Ищем совпадения, подождите...
                        </div>
                }
            </div>

            {
                isShowButton &&
                    <button
                        className={`${styles['stocks-items__button']} btn `}
                        onClick={() => setCurrentPage(`${+currentPage + 1}`)}
                    >
                        Показать еще
                    </button>
            }
        </section>
    )
}
