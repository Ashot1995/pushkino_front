'use client';

import {useSelector, useDispatch} from "react-redux";

import {SvgIcon} from "../../../shared/ui/svg-icon";
import {changeRentersCategories} from "../../../shared/lib/store/slices/rentersListFilter";

import styles from './styles.module.scss';

export function RentersListCategories({categories, toggleModal, whatModalShow}) {
    const selectedCategories = useSelector(state => state.rentersListFilter.value.selectedCategories);
    const dispatch = useDispatch();

    function changeSelectedCategories(category, action) {
        if (action === 'add' && selectedCategories.length === 0) {
            dispatch(changeRentersCategories(category));
        } else if (action === 'add' && !selectedCategories.includes(category)) {
            const selectedCategoriesArr = selectedCategories.split(',');
            selectedCategoriesArr.push(category);
            const selectedCategoriesStr = selectedCategoriesArr.join(',');
            dispatch(changeRentersCategories(selectedCategoriesStr));
        } else if (action === 'remove' && selectedCategories.includes(category)) {
            const selectedCategoriesArr = selectedCategories.split(',');
            const filteredSelectedCategoriesArr = selectedCategoriesArr.filter(item => item !== category);
            const filteredSelectedCategoriesStr = filteredSelectedCategoriesArr.join(',');
            dispatch(changeRentersCategories(filteredSelectedCategoriesStr));
        }
    }

    return (
        <aside className={styles['categories']}>
            <div
                className={styles['categories__mobile-button']}
                onClick={() => {
                    whatModalShow === 'categories'
                        ? toggleModal('')
                        : toggleModal('categories');
                }}
            >
                <SvgIcon id='cart' color='#3383A4' />
                <span>Выбор категорий</span>
            </div>
            <ul
                className={`
                    ${styles['categories__list']}
                    ${whatModalShow === 'categories' ? styles['categories__list_active'] : ''}
                `}
            >
                {
                    categories.map((category, index) =>
                        <li
                            className={`
                                ${styles['categories__item']}
                                ${selectedCategories.split(',').includes(`${category.id}`) ? styles['categories__item_active'] : ''}
                            `}
                            key={index}
                        >
                            <span onClick={() => changeSelectedCategories(`${category.id}`, 'add')}>
                                {category.category}
                            </span>
                            <span onClick={() => changeSelectedCategories(`${category.id}`, 'remove')}>
                                <SvgIcon id='close' color='#ed5d2b'/>
                            </span>
                        </li>
                    )
                }
            </ul>
        </aside>
    )
}
