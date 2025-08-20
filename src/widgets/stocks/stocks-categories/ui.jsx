'use client';

import {useDispatch, useSelector} from "react-redux";
import {useState, useEffect, useRef} from "react";

import {SvgIcon} from "../../../shared/ui/svg-icon";
import {networkService} from "../../../shared/lib/network";
import {changeStocksSubCategory} from "../../../shared/lib/store/slices/stocksListFilter";
import {changeStocksModal} from "../../../shared/lib/store/slices/whatModalShowInStocksPage";

import styles from './styles.module.scss';

export function StocksCategories() {
    const selectedSubCategory = useSelector(state => state.stocksListFilter.value.selectedSubCategory);
    const whatModalShowInStocksPage = useSelector(state => state.whatModalShowInStocksPage.value.showModal);
    const dispatch = useDispatch();

    const [renterCategories, setRenterCategories] = useState(null);

    const windowRef = useRef();

    const [activeMainCategory, setActiveMainCategory] = useState('');
    const [isSelectCategoryActive, setIsSelectCategoryActive] = useState(false);
    const [activeCategory, setActiveCategory] = useState('Все категории');

    useEffect(() => {
        networkService().getRentersCategories().then(response => {
            setRenterCategories({
                shops: response.shops,
                cafes: response.cafes,
                recreation: response.recreation,
            });
        });

        windowRef.current = window;
    }, []);

    useEffect(() => {
        whatModalShowInStocksPage === 'sorting' ? setIsSelectCategoryActive(false) : null;
    }, [whatModalShowInStocksPage]);

    const handleActiveCategory = (key) => {
        activeMainCategory === '' || activeMainCategory !== key
            ? setActiveMainCategory(key)
            : setActiveMainCategory('');
    }

    const handleChangeSubCategory = (category, action) => {
        if (action === 'add' && selectedSubCategory.length === 0) {
            dispatch(changeStocksSubCategory(`${category}`));
        } else if (action === 'add' && !selectedSubCategory.includes(category)) {
            const selectedSubCategoriesArr = selectedSubCategory.split(',');
            selectedSubCategoriesArr.push(category);
            const selectedSubCategoriesStr = selectedSubCategoriesArr.join(',');
            dispatch(changeStocksSubCategory(selectedSubCategoriesStr));
        } else if (action === 'remove' && selectedSubCategory.includes(category)) {
            const selectedSubCategoriesArr = selectedSubCategory.split(',');
            const filteredSelectedSubCategoriesArr = selectedSubCategoriesArr.filter(item => item !== `${category}`);
            const filteredSelectedSubCategoriesStr = filteredSelectedSubCategoriesArr.join(',');
            dispatch(changeStocksSubCategory(filteredSelectedSubCategoriesStr));
        }
    }

    return (
        <div className={styles['stocks-categories']}>

            <div className={styles['stocks-categories__select-category-wrapper']}>
                <div
                    className={`
                        ${styles['stocks-categories__select-category-back-btn']}
                        ${activeMainCategory && styles['stocks-categories__select-category-back-btn_selected']}
                    `}
                    onClick={() => {
                        setActiveMainCategory('');
                        setActiveCategory('Все категории');
                        dispatch(changeStocksSubCategory(''));
                    }}
                >
                    <SvgIcon id='arrow-transition' color='#000' />
                </div>
                <div
                    className={`
                    ${styles['stocks-categories__select-category']}
                    ${isSelectCategoryActive && styles['stocks-categories__select-category_active']}
                `}
                    onClick={() => {
                        setIsSelectCategoryActive(!isSelectCategoryActive);
                        dispatch(changeStocksModal('categories'));
                    }}
                >
                    <span>{activeCategory}</span>
                    <SvgIcon id='chevron' color='#000'  />
                </div>
            </div>

            <div
                className={`
                    ${styles['stocks-categories__wrapper']}
                    ${isSelectCategoryActive && styles['stocks-categories__wrapper_active']}
                `}>
                {
                    renterCategories &&
                        Object.keys(renterCategories).map((key, index) => (
                            <div key={index}>
                                <div
                                    className={`
                                        ${styles['stocks-categories__main-category']}
                                        ${styles['stocks-categories__main-category_desk']}
                                        ${key === activeMainCategory && styles['stocks-categories__main-category_desk-active']}
                                    `}
                                    onClick={() => handleActiveCategory(key)}
                                >
                                    {
                                        renterCategories[key].categories
                                            ? <span>{renterCategories[key].name}</span>
                                            : <span onClick={() => selectedSubCategory === 'entertainments' ? dispatch(changeStocksSubCategory('')) : dispatch(changeStocksSubCategory('entertainments'))}>{renterCategories[key].name}</span>
                                    }
                                    {
                                        renterCategories[key].categories &&
                                            <SvgIcon id="chevron" color="#000"/>
                                    }
                                </div>

                                <div
                                    className={`
                                        ${styles['stocks-categories__main-category']}
                                        ${styles['stocks-categories__main-category_mob']}
                                        ${activeMainCategory !== '' && styles['stocks-categories__main-category_mob-active']}
                                    `}
                                    onClick={() => {
                                        handleActiveCategory(key);
                                        setActiveCategory(renterCategories[key].name)
                                    }}
                                >
                                    <span>{renterCategories[key].name}</span>
                                </div>

                                <div
                                    className={`
                                        ${styles['stocks-categories__subcategories-list']}
                                        ${key === activeMainCategory && styles['stocks-categories__subcategories-list_active']}
                                    `}
                                >
                                    {
                                        renterCategories[key].categories &&
                                            renterCategories[key].categories.map((category, index) => (
                                                <div className={`
                                                    ${styles['stocks-categories__sub-item-wrapper']}
                                                    ${selectedSubCategory.split(',').includes(`${category.id}`) && styles['stocks-categories__sub-item-wrapper_active']}
                                                `} key={index}>
                                                    <span
                                                        className={`
                                                        ${styles['stocks-categories__sub-item']}
                                                    `}
                                                        onClick={() => {
                                                            handleChangeSubCategory(category.id, 'add');
                                                            windowRef.current && windowRef.current.innerWidth < 721 && setIsSelectCategoryActive(!isSelectCategoryActive);
                                                        }}
                                                        key={category.id}
                                                    >{category.category}</span>
                                                    <span onClick={() => {
                                                        handleChangeSubCategory(category.id, 'remove');
                                                        windowRef.current && windowRef.current.innerWidth < 721 && setIsSelectCategoryActive(!isSelectCategoryActive);
                                                    }}>
                                                        <SvgIcon id="close" color="#ed5d2b"/>
                                                    </span>
                                                </div>
                                            ))
                                    }
                                </div>
                            </div>
                        ))
                }
            </div>
        </div>
    )
}
