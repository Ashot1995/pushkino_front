'use client';

import {useSelector, useDispatch} from "react-redux";

import {Input} from "../../../shared/ui/inputs";
import {Checkbox} from "../../../shared/ui/checkbox";
import {SvgIcon} from "../../../shared/ui/svg-icon";
import {
    changeViewModeRentersList,
    changeRentersFloors,
    changeHasNewRentersList,
    changeHasStockRentersList,
    changeSearchRentersInputValue,
} from "../../../shared/lib/store/slices/rentersListFilter";

import styles from './styles.module.scss';

export function RentersListFilter({toggleModal, whatModalShow}) {
    const currentViewMode = useSelector(state => state.rentersListFilter.value.viewMode);
    const selectedFloors = useSelector(state => state.rentersListFilter.value.selectedFloors);
    const hasNew = useSelector(state => state.rentersListFilter.value.hasNew);
    const hasStock = useSelector(state => state.rentersListFilter.value.hasStock);
    const searchInputValue = useSelector(state => state.rentersListFilter.value.searchInputValue);

    const dispatch = useDispatch();

    // Для выбора нескольких этажей. Как оказалось не надо. Но пусть пока побудет тут
    // function changeSelectedFloors(floor) {
    //     if (selectedFloors.length === 0) {
    //         dispatch(changeRentersFloors(floor))
    //     } else if (selectedFloors.includes(floor)) {
    //         const selectedFloorsArr = selectedFloors.split(',');
    //         const filteredSelectedFloorsArr = selectedFloorsArr.filter(item => item !== floor);
    //         const filteredSelectedFloorsStr = filteredSelectedFloorsArr.join(',');
    //         dispatch(changeRentersFloors(filteredSelectedFloorsStr));
    //     } else if (!selectedFloors.includes(floor)) {
    //         const selectedFloorsArr = selectedFloors.split(',');
    //         selectedFloorsArr.push(floor);
    //         const selectedFloorsStr = selectedFloorsArr.join(',');
    //         dispatch(changeRentersFloors(selectedFloorsStr));
    //     }
    // }

    const scrollTo = (ref) => {
        const mainBlock = document.querySelector(
            `main`
        );

        mainBlock.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'start',
        });
    }

    return (
        <form onSubmit={e => {scrollTo();e.preventDefault()}}>
        <section className={styles['renters-filter']}>
            <div className={styles['renters-filter__wrapper']}>
                <div className={styles['renters-filter__search']}>
                    <Input
                        attributes={{placeholder: 'Поиск по названию', value: searchInputValue}}
                        isInputTypeSearch={true}
                        onChange={event => dispatch(changeSearchRentersInputValue(event.target.value))}
                    />
                </div>
                <div className={styles['renters-filter__floor']}>
                    <div
                        className={`
                            ${styles['renters-filter__floor-button']}
                            ${whatModalShow === 'filter' ? styles['renters-filter__floor-button_active'] : ''}
                        `}
                        onClick={() => {
                            whatModalShow === 'filter'
                                ? toggleModal('')
                                : toggleModal('filter');
                        }}
                    >
                        <span>Этаж</span>
                        <SvgIcon id='chevron' color='black'/>
                    </div>
                    <div
                        className={`
                            ${styles['renters-filter__param-list']} 
                            ${whatModalShow === 'filter' ? styles['renters-filter__param-list_active'] : ''}
                        `}
                    >
                        <div className={styles['renters-filter__param-list-item']}>
                            <Checkbox
                                id="parking"
                                label="Парковка"
                                checked={selectedFloors === '0'}
                                onChange={() => {
                                    selectedFloors === '0'
                                        ? dispatch(changeRentersFloors(''))
                                        : dispatch(changeRentersFloors('0'));
                                    toggleModal('');
                                }}
                            />
                        </div>
                        <div className={styles['renters-filter__param-list-item']}>
                            <Checkbox
                                id="first-floor"
                                label="1 этаж"
                                checked={selectedFloors === '1'}
                                onChange={() => {
                                    selectedFloors === '1'
                                        ? dispatch(changeRentersFloors(''))
                                        : dispatch(changeRentersFloors('1'));
                                    toggleModal('');
                                }}
                            />
                        </div>
                        <div className={styles['renters-filter__param-list-item']}>
                            <Checkbox
                                id="second-floor"
                                label="2 этаж"
                                checked={selectedFloors === '2'}
                                onChange={() => {
                                    selectedFloors === '2'
                                        ? dispatch(changeRentersFloors(''))
                                        : dispatch(changeRentersFloors('2'));
                                    toggleModal('');
                                }}
                            />
                        </div>
                        <div
                            className={`
                                ${styles['renters-filter__param-list-item']}
                                ${styles['renters-filter__param-list-item_mobile']}
                            `}
                        >
                            <Checkbox
                                id="stocks-mob"
                                label="Акции"
                                checked={hasStock}
                                onChange={() => {
                                    dispatch(changeHasStockRentersList(!hasStock));
                                    toggleModal('');
                                }}
                            />
                        </div>
                        <div
                            className={`
                                ${styles['renters-filter__param-list-item']}
                                ${styles['renters-filter__param-list-item_mobile']}
                            `}
                        >
                            <Checkbox
                                id="new-mob"
                                label="Новинки"
                                checked={hasNew}
                                onChange={() => {
                                    dispatch(changeHasNewRentersList(!hasNew));
                                    toggleModal('');
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles['renters-filter__stocks']}>
                    <div className={styles['renters-filter__stock']}>
                        <Checkbox
                            id="stocks"
                            label="Акции"
                            checked={hasStock}
                            onChange={() => dispatch(changeHasStockRentersList(!hasStock))}
                        />
                    </div>
                    <div className={styles['renters-filter__stock']}>
                        <Checkbox
                            id='new'
                            label='Новинки'
                            checked={hasNew}
                            onChange={() => dispatch(changeHasNewRentersList(!hasNew))}
                        />
                    </div>
                </div>
            </div>
            <div className={styles['renters-filter__view-modes']}>
                <div
                    className={styles['renters-filter__mobile-params']}
                    onClick={() => {
                        whatModalShow === 'filter'
                            ? toggleModal('')
                            : toggleModal('filter');
                    }}
                >
                    <SvgIcon id='filter' color='balck'/>
                </div>
                <div
                    className={styles['renters-filter__view-mode']}
                    onClick={() => {
                        toggleModal('');
                        dispatch(changeViewModeRentersList('tiles'));
                    }}
                >
                    <SvgIcon
                        id='grid'
                        color={currentViewMode === 'tiles' ? '#3383a4' : '#000'}
                    />
                </div>
                <div
                    className={styles['renters-filter__view-mode']}
                    onClick={() => {
                        toggleModal('');
                        dispatch(changeViewModeRentersList('list'));
                    }}
                >
                    <SvgIcon
                        id='apps-list'
                        color={currentViewMode === 'list' ? '#3383a4' : '#000'}
                    />
                </div>
            </div>
        </section>
        </form>
    )
}
