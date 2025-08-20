'use client';

import Link from "next/link";
import Script from "next/script";
import {usePathname} from 'next/navigation'
import {useEffect, useRef, useState} from "react";
import {useDebounce} from "use-debounce";
import {useDispatch, useSelector} from "react-redux";

import {networkService} from "../../shared/lib/network";
import {SocialBlock} from "../../shared/ui/social-block";
import {SvgIcon} from "../../shared/ui/svg-icon";
import {Input} from "../../shared/ui/inputs";
import {SearchResult} from "../../entities/search-result";
import {addThroughContactsData} from "../../shared/lib/store/slices/throughContactsData";
import {MENU_HEADER_LINKS, YANDEX_MAP_API_KEY} from "../../shared/config/constants";

import styles from './styles.module.scss';

import {KEYS_TO_LOCAL_SEARCH} from "./config";

export function HeaderLayout({throughContacts, categoriesForMenu}) {
    const headerData = useSelector(state => state.throughContactsData.value);
    const dispatch = useDispatch();

    const currentPath = usePathname();

    // DOM Elements
    const rootWrapperRef = useRef(null);
    const headerLogoRef = useRef(null);
    const mainRef = useRef(null);
    const headerRef = useRef(null);
    const globalHeaderRef = useRef(null);

    useEffect(() => {
        dispatch(addThroughContactsData(throughContacts));

        rootWrapperRef.current = document.documentElement;
        headerLogoRef.current = document.querySelector('.js-header-logo img');
        mainRef.current = document.querySelector('main');
        headerRef.current = document.querySelector('.header-fix');
        globalHeaderRef.current = document.querySelector('header');
    }, []);

    const [typeHeader, setTypeHeader] = useState('');
    const [animationHeader, setAnimationHeader] = useState('')
    const [animationCTA, setAnimationCTA] = useState(false)
    const [toTopAnimation, setToTopAnimation] = useState('')
    const [positionHeader, setPositionHeader] = useState('fixed');
    const [headerPositionStatus, setHeaderPositionStatus] = useState('absolute')
    const [statusCta, setStatusCta] = useState('visible');
    const [statusBlockForScroll, setStatusBlockForScroll] = useState('not-scrolling');
    const [isBurgerMenuActive, setIsBurgerMenuActive] = useState(false);
    const [activeIdHeadingMenu, setActiveIdHeadingMenu] = useState('');
    const [colorIconsSvg, setColorIconsSvg] = useState('white');
    const [iconBurgerMenu, setIconBurgerMenu] = useState('burger');

    const [colorLogo, setColorLogo] = useState('white')

    const [searchData, setSearchData] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const [searchValueDebounce] = useDebounce(searchValue, 1000);

    const isBurgerMenuActiveRef = useRef(isBurgerMenuActive);
    const _setIsBurgerMenuActive = flag => {
        isBurgerMenuActiveRef.current = flag;
        setIsBurgerMenuActive(flag);
    }

    let scrollTop = 0;

    useEffect(() => {
        setGlobalScrollbarWidth()
    }, [mainRef]);

    useEffect(() => {
        headerForMainPage();
    }, [rootWrapperRef, headerRef, currentPath]);

    useEffect(() => {
        showBurgerMenu();
    }, [isBurgerMenuActive, rootWrapperRef, currentPath]);

    useEffect(() => {
        changeHeader();
    }, [typeHeader, currentPath]);

    useEffect(() => {
        setSearchData(null);
    }, [searchValue]);

    useEffect(() => {
        if (searchValueDebounce && Object.keys(KEYS_TO_LOCAL_SEARCH).includes(searchValueDebounce)) {
            setSearchData({
                info: KEYS_TO_LOCAL_SEARCH[searchValueDebounce],
            })
        } else if (searchValueDebounce) {
            networkService()
                .getThroughSearchData(searchValueDebounce)
                .then(setSearchData);
        }
    }, [searchValueDebounce]);

    function changeHeader() {
        setColorIconsSvg(`${typeHeader === 'white' ? 'black' : 'white'}`);
        setColorLogo(`${typeHeader === 'white' ? 'black' : 'white'}`);
    }

    function setGlobalScrollbarWidth() {
        if (rootWrapperRef.current && mainRef.current) {
            const globalElementStyle = document.documentElement.style;
            const innerMainWidth = rootWrapperRef.current.getBoundingClientRect().width
            const scrollBarWidth = window.innerWidth - innerMainWidth;
            globalElementStyle.setProperty('--prop-scroll-bar-width', `${scrollBarWidth}px`);
        }
    }

    useEffect(() => {
        let isIsTop = false
        function callback(entries) {
            entries.forEach(entry => {
                if (currentPath === '/') {
                    if (entry.intersectionRatio <= 0) {
                        setTypeHeader('white');
                        setPositionHeader('fixed');
                        setHeaderPositionStatus('fixed');
                        setAnimationHeader('animation-show')
                        setTimeout(() => {
                            setAnimationHeader(null)
                            setAnimationCTA(true)
                        }, 400)
                        isIsTop = true
                    } else {
                        if(isIsTop) {
                            setAnimationHeader('animation-hide')
                            setAnimationCTA(false)
                            setTimeout(() => {
                                setAnimationHeader(null)
                                setTypeHeader('black');
                                setPositionHeader('absolute');
                                setToTopAnimation('to-top-animation');
                                setHeaderPositionStatus('absolute');
                                isIsTop = false
                            }, 200)

                            setTimeout(() => {
                                setToTopAnimation(null);
                            }, 400)
                        }
                    }
                } else {
                    if (entry.intersectionRatio <= 0) {
                        setPositionHeader('fixed');
                        setHeaderPositionStatus('fixed');
                        setAnimationHeader('animation-show')
                        setTimeout(() => {
                            setAnimationHeader(null)
                        }, 400)
                        isIsTop = true
                    } else  {
                        if(isIsTop) {
                            setAnimationHeader('animation-hide')
                            setTimeout(() => {
                                setAnimationHeader(null)
                                setPositionHeader('absolute');
                                setToTopAnimation('to-top-animation');
                                setHeaderPositionStatus('absolute');
                                setStatusBlockForScroll('not-scrolling');
                                isIsTop = false
                            }, 200)

                            setTimeout(() => {
                                setToTopAnimation(null);
                            }, 400)
                        }
                    }
                }
            });
        }

        const rootElement = window
        const observerOptions = {
            root: null,
            rootMargin: "0px",
            threshold: [0, 0.5, 1]
        };
        const observer = new IntersectionObserver(callback, observerOptions);
        observer.observe(headerRef.current);

        return () => {
            observer.disconnect();
        };
    }, [currentPath]);

    useEffect(() => {
        const handleScroll = (event) => {
            if (!isBurgerMenuActive && headerPositionStatus !== 'absolute') {
                const currentScrollPosition = rootWrapperRef.current.scrollTop;
                if (currentScrollPosition > previousScrollPosition) {
                    setStatusCta('hidden');
                    setSearchValue('');
                } else {
                    setStatusCta('visible');
                }
                previousScrollPosition = currentScrollPosition;
            }
        };

        let previousScrollPosition = 0;

        if (rootWrapperRef.current) {
            window.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (rootWrapperRef.current) {
                window.removeEventListener('scroll', handleScroll);
            }
        };
    }, [isBurgerMenuActive, headerPositionStatus]);

    function headerForMainPage() {
        if (currentPath === '/') {
            setPositionHeader('absolute');
            setTypeHeader('black');
        } else {
            setPositionHeader('static');
            setTypeHeader('white');
        }
    }

    function clearHeader() {
        setIconBurgerMenu('burger');
        setStatusBlockForScroll('not-scrolling');
        setIsBurgerMenuActive(false);
        setPositionHeader('absolute');
        setStatusCta('visible');
        setSearchValue('')
        if (rootWrapperRef.current) {
            rootWrapperRef.current.scrollTo({top: 0, behavior: 'smooth'})
        }
    }

    useEffect(() => {
        clearHeader();
    }, [currentPath]);

    function handleActiveIdHeadingMenu(id) {
        activeIdHeadingMenu !== id
            ? setActiveIdHeadingMenu(id)
            : setActiveIdHeadingMenu('');
    }

    function showBurgerMenu() {
        scrollTop = rootWrapperRef.current.scrollTop

        if (isBurgerMenuActive) {
            setGlobalScrollbarWidth()
            setPositionHeader('fixed');
            setStatusCta('visible');
            setTypeHeader('white');
            setIconBurgerMenu('close');
            setSearchValue('')
            if (rootWrapperRef.current) document.body.classList.add('body-hidden');
            currentPath ===  '/'
                ? setStatusBlockForScroll('not-scrolling')
                : setStatusBlockForScroll('scrolling');
        } else {
            setPositionHeader(headerPositionStatus);
            setIconBurgerMenu('burger');
            setStatusBlockForScroll('not-scrolling');
            if(rootWrapperRef.current) document.body.classList.remove('body-hidden');
            if (currentPath !==  '/' && scrollTop < 201) {
                // setPositionHeader('static');
            } else if (currentPath ===  '/' && scrollTop < 5) {
                setTimeout(() => {
                    setTypeHeader('black');
                }, 150)
            }
        }
    }

    return (
        <>
            <Script src={`https://api-maps.yandex.ru/2.1/?apikey=${YANDEX_MAP_API_KEY}&lang=ru_RU`} strategy='beforeInteractive' />

            <style>{`
                .header__cta-input .search-result {
                    position: absolute;
                    top: 8rem;
                    left: -1.2rem;
                    z-index: 2;
                }
            `}</style>

            {
                currentPath === '/' ? '' :
                    <>
                        <div className={`
                            ${styles['block-for-scroll']}
                            ${styles[`block-for-scroll_scrolling`]}
                        `}></div>
                    </>
            }
            <header className={`
                ${styles['header']}
                ${styles[`header_${typeHeader}`]}
                ${styles[`header_${positionHeader}`]}
                ${animationHeader ? styles[`${animationHeader}`] : ''}
                ${toTopAnimation ? styles[`${toTopAnimation}`] : ''}
                ${isBurgerMenuActive && styles['opened-header']}
            `}>
                <div className={`${styles['header_shadow']} ${isBurgerMenuActive && styles['show-shadow']}`}
                     onClick={() => _setIsBurgerMenuActive(!isBurgerMenuActive)}></div>
                <div className={`${styles['header']}__container ${styles['header_inner']}`}>
                    <div className={styles['header__top-line']}>
                        <div className={styles['header__top-line-wrap']}>
                            <a href='/' className={styles['header__logo']}>
                                <img src={`/images/main-logo/${colorLogo}.png`} alt="Логотип Пушкино Парк"/>
                            </a>
                            <div className={styles['header__working-time']}>
                                <SvgIcon id='clock' color={colorIconsSvg}/>
                                <span>{headerData?.workingHours?.trc?.hours && headerData.workingHours.trc.hours}</span>
                            </div>
                        </div>
                        <div className={styles['header__top-line-wrap']}>
                            <div className={styles['header__phone-number']}>
                                <SvgIcon id='call' color={colorIconsSvg}/>
                                <a href={`tel:+${headerData?.phoneNumber?.replace(/\D/g, '')}`}>
                                    <span>{headerData?.phoneNumber && headerData.phoneNumber}</span>
                                </a>
                            </div>
                            <div className={styles['header__social-links']}>
                                <SocialBlock
                                    tgLink={headerData?.socialLinks && headerData.socialLinks[0].telegram}
                                    vkLink={headerData?.socialLinks && headerData.socialLinks[0].vkontakte}
                                />
                            </div>
                            <button
                                className={styles['header__menu-btn']}
                                onClick={() => _setIsBurgerMenuActive(!isBurgerMenuActive)}
                            >
                                <span>Меню</span>
                                <SvgIcon id={iconBurgerMenu} color={colorIconsSvg}/>
                            </button>
                        </div>
                    </div>

                    <div className={`
                        ${styles['header__cta']}
                        ${styles[`header__cta_${statusCta}`]}
                        ${animationCTA && styles[`animate-cta`]}
                    `}>
                        <div className={`${styles['header__cta-inner']}`}>
                            <div className={styles['header__cta-wrapper']}>
                                <div className={`${styles['header__cta-input']} header__cta-input`}>
                                    <Input
                                        attributes={
                                            {
                                                type: 'text',
                                                placeholder: 'Поиск',
                                                value: searchValue,
                                            }
                                        }
                                        isInputTypeSearch={true}
                                        onChange={event => {setSearchValue(event.target.value); setIsBurgerMenuActive(false)}}
                                    />
                                    {
                                        searchValue &&
                                            <SearchResult data={searchData} setSearchValue={setSearchValue}/>
                                    }
                                </div>
                                <Link href={'/trc-map'} className={styles['header__cta-btn']}>
                                    <SvgIcon id='map' color='white'/>
                                    <span>Карта ТРЦ</span>
                                </Link>
                                <Link href={'/how-to-get'} className={styles['header__cta-btn']}>
                                    <SvgIcon id='location' color='white'/>
                                    <span>Как добраться?</span>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <nav className={`
                        ${styles['header__nav']}
                        ${isBurgerMenuActive && styles['header__nav_active']}
                    `}>
                        <div className={styles['header__nav_inner']}>
                            <div className={styles['header__nav-menu-list']}>
                                {
                                    Object.keys(MENU_HEADER_LINKS[0]).map(mainLink => (
                                        <div key={MENU_HEADER_LINKS[0][mainLink].id}>
                                            <Link href={MENU_HEADER_LINKS[0][mainLink].link}
                                                  className={`${styles['header__nav-main-link']} ${styles['header__nav-main-link_desk']}`}>{mainLink}</Link>
                                            <div
                                                className={`
                                                    ${styles['header__nav-heading']}
                                                    ${styles['header__nav-heading_with-sub-links']}
                                                    ${MENU_HEADER_LINKS[0][mainLink].id === activeIdHeadingMenu ? styles['header__nav-heading_active'] : ''}
                                                `}
                                                onClick={() => handleActiveIdHeadingMenu(MENU_HEADER_LINKS[0][mainLink].id)}
                                            >
                                                {
                                                    categoriesForMenu &&
                                                        Object.keys(categoriesForMenu[mainLink]).length > 0
                                                            ? <span>{mainLink}</span>
                                                            : <Link href={MENU_HEADER_LINKS[0][mainLink].link}>{mainLink}</Link>
                                                }
                                                {
                                                    categoriesForMenu &&
                                                        Object.keys(categoriesForMenu[mainLink]).length > 0 &&
                                                            <SvgIcon
                                                                id="chevron"
                                                                color={MENU_HEADER_LINKS[0][mainLink].id === activeIdHeadingMenu ? '#3383a4' : '#000'}
                                                            />
                                                }
                                            </div>
                                            <div
                                                className={`
                                            ${styles['header__nav-sub-links']}
                                            ${MENU_HEADER_LINKS[0][mainLink].id === activeIdHeadingMenu ? styles['header__nav-sub-links_active'] : ''}
                                        `}
                                            >
                                                {
                                                    categoriesForMenu &&
                                                        Object.keys(categoriesForMenu[mainLink]).map((subItem, index) => (
                                                            <a
                                                                href={categoriesForMenu[mainLink][subItem]}
                                                                className={styles['header__nav-sub-link']}
                                                                key={index}
                                                            >
                                                                {subItem}
                                                            </a>
                                                        ))
                                                }
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className={styles['header__nav-wrapper']}>
                                <div className={`
                                ${styles['header__nav-menu-list']}
                                ${styles['header__nav-menu-list_desktop']}
                            `}>
                                    <div className={styles['header__nav-heading']}>Новости</div>
                                    {
                                        Object.keys(MENU_HEADER_LINKS[1]).map(mainLink => (
                                            <Link
                                                href={MENU_HEADER_LINKS[1][mainLink].link}
                                                className={styles['header__nav-main-link']}
                                                key={MENU_HEADER_LINKS[1][mainLink].id}
                                            >
                                                {mainLink}
                                            </Link>
                                        ))
                                    }
                                </div>
                                <div className={`
                                ${styles['header__nav-menu-list']}
                                ${styles['header__nav-menu-list_mobile']}
                            `}>
                                    {
                                        Object.keys(MENU_HEADER_LINKS[2]).map(mainLink => (
                                            <div key={MENU_HEADER_LINKS[2][mainLink].id}>
                                                <Link href={MENU_HEADER_LINKS[2][mainLink].link}
                                                      className={`${styles['header__nav-main-link']} ${styles['header__nav-main-link_desk']}`}>{mainLink}</Link>
                                                <div className={`
                                                ${styles['header__nav-heading']}
                                                ${styles['header__nav-heading_with-sub-links']}
                                                ${MENU_HEADER_LINKS[2][mainLink].id === activeIdHeadingMenu ? styles['header__nav-heading_active'] : ''}
                                            `}
                                                     onClick={() => handleActiveIdHeadingMenu(MENU_HEADER_LINKS[2][mainLink].id)}
                                                >
                                                    <span>{mainLink}</span>
                                                    <SvgIcon
                                                        id="chevron"
                                                        color={MENU_HEADER_LINKS[2][mainLink].id === activeIdHeadingMenu ? '#3383a4' : '#000'}
                                                    />
                                                </div>
                                                <div
                                                    className={`
                                            ${styles['header__nav-sub-links']}
                                            ${MENU_HEADER_LINKS[2][mainLink].id === activeIdHeadingMenu ? styles['header__nav-sub-links_active'] : ''}
                                        `}
                                                >
                                                    {
                                                        Object.keys(MENU_HEADER_LINKS[2][mainLink].subItems).map((subItem, index) => (
                                                            <a
                                                                href={MENU_HEADER_LINKS[2][mainLink].subItems[subItem]}
                                                                className={styles['header__nav-sub-link']}
                                                                key={index}
                                                            >
                                                                {subItem}
                                                            </a>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className={`
                                ${styles['header__nav-menu-list']}
                                ${styles['header__nav-menu-list_desktop']}
                            `}>
                                    <div className={styles['header__nav-heading']}>Информация</div>
                                    {
                                        Object.keys(MENU_HEADER_LINKS[3]).map(mainLink => (
                                            <Link
                                                href={MENU_HEADER_LINKS[3][mainLink].link}
                                                className={styles['header__nav-main-link']}
                                                key={MENU_HEADER_LINKS[3][mainLink].id}
                                            >
                                                {mainLink}
                                            </Link>
                                        ))
                                    }
                                </div>
                                <div className={`
                                ${styles['header__nav-menu-list']}
                                ${styles['header__nav-menu-list_mobile']}
                            `}>
                                    {
                                        Object.keys(MENU_HEADER_LINKS[4]).map(mainLink => (
                                            <div key={MENU_HEADER_LINKS[4][mainLink].id}>
                                                <Link href={MENU_HEADER_LINKS[4][mainLink].link}
                                                      className={`${styles['header__nav-main-link']} ${styles['header__nav-main-link_desk']}`}>{mainLink}</Link>
                                                <div className={`
                                                ${styles['header__nav-heading']}
                                                ${styles['header__nav-heading_with-sub-links']}
                                                ${MENU_HEADER_LINKS[4][mainLink].id === activeIdHeadingMenu ? styles['header__nav-heading_active'] : ''}
                                            `}
                                                     onClick={() => handleActiveIdHeadingMenu(MENU_HEADER_LINKS[4][mainLink].id)}
                                                >
                                                    <span>{mainLink}</span>
                                                    <SvgIcon
                                                        id="chevron"
                                                        color={MENU_HEADER_LINKS[4][mainLink].id === activeIdHeadingMenu ? '#3383a4' : '#000'}
                                                    />
                                                </div>
                                                <div
                                                    className={`
                                            ${styles['header__nav-sub-links']}
                                            ${MENU_HEADER_LINKS[4][mainLink].id === activeIdHeadingMenu ? styles['header__nav-sub-links_active'] : ''}
                                        `}
                                                >
                                                    {
                                                        Object.keys(MENU_HEADER_LINKS[4][mainLink].subItems).map((subItem, index) => (
                                                            <a
                                                                href={MENU_HEADER_LINKS[4][mainLink].subItems[subItem]}
                                                                className={styles['header__nav-sub-link']}
                                                                key={index}
                                                            >
                                                                {subItem}
                                                            </a>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className={styles['header__nav-working-time']}>
                                    <div className={styles['header__nav-heading']}>Время работы</div>
                                    <div className={styles['header__nav-working-time-wrapper']}>
                                        <div className={styles['header__nav-working-time-block']}>
                                            <div className={styles['header__nav-working-time-heading']}>Галерея</div>
                                            <div className={styles['header__nav-working-time-data']}>
                                                {headerData?.workingHours?.trc?.days && headerData.workingHours.trc.days}
                                            </div>
                                            <div className={styles['header__nav-working-time-data']}>
                                                {headerData?.workingHours?.trc?.hours && headerData.workingHours.trc.hours}
                                            </div>
                                        </div>
                                        <div className={styles['header__nav-working-time-block']}>
                                            <div className={styles['header__nav-working-time-heading']}>Кинотеатр</div>
                                            <div className={styles['header__nav-working-time-data']}>
                                                {headerData?.workingHours?.cinema?.days && headerData.workingHours.cinema.days}
                                            </div>
                                            <div className={styles['header__nav-working-time-data']}>
                                                {headerData?.workingHours?.cinema?.hours && headerData.workingHours.cinema.hours}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </header>
        </>
    )
}
