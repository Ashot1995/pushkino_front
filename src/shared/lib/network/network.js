import {
    KM_API_PATH,
    KM_BASE_URL,
    KM_CINEMA_ID,
    MB_API_PATHS,
    MB_BASE_URL,
    MB_ENDPOINT_ID,
    MB_OPERATION,
    MB_SECRET_KEY,
    PP_API_PATH,
    PP_BASE_URL,
    PP_TARGET_PATHS,
} from "./config";

export function networkService() {
    const request = async (url) => {
        try {
            const response = await fetch(url);

            if (!response.ok) {
                console.log(
                    '%c FETCH DATA ERROR ',
                    'color: #fff; background-color: #d33f49;',
                    `\nДанные не получены.\nCurl: ${url}.\nСтатус: ${response.status}.\nДополнительно ${response.statusText}.`
                );
                throw new Error();
            }

            return await response.json();
        } catch (error) {
            console.log(
                '%c FETCH DATA ERROR ',
                'color: #fff; background-color: #d33f49;',
                `\nСервер не отвечает.\nCurl: ${url}.\nОшибка: ${error}.`
            );
            throw new Error();
        }
    }

    const getThroughContacts = async () => {
        return await request(madeFullPpUrl(PP_TARGET_PATHS.throughContacts));
    }

    const getThroughSearchData = async (query) => {
        return await request(`${madeFullPpUrl(PP_TARGET_PATHS.throughSearch)}?q=${query}`);
    }

    const getMainPageData = async () => {
        const bannersData = await getMainPageMainBanners();
        const stocksData = await getMainPageStocks();
        const storesCategoriesData = await getCategoriseForMainPage();
        const newsData = await getNewsEventsForMainPage();
        const theatreData = await getTheatreSessions();
        const entertainmentParkData = await getEntertainmentEvents();
        const cinemasSessionsData = await getCinemasSessions();
        const cinemaDonatesData = await getCinemaDonats();
        const retailersData = await getRetailers();

        return {
            bannersData,
            stocksData,
            storesCategoriesData,
            newsData,
            theatreData,
            entertainmentParkData,
            cinemasSessionsData,
            cinemaDonatesData,
            retailersData,
        }
    }

    const getMainPageMainBanners = async () => {
        const response = await request(madeFullPpUrl(PP_TARGET_PATHS.mainPageMainBanners));

        return response.bannersList;
    }

    const getMainPageStocks = async () => {
        const response = await request(madeFullPpUrl(PP_TARGET_PATHS.mainPageStocks));

        return response.stocksList;
    }

    const getTheatreSessions = async () => {
        const response = await request(madeFullPpUrl(PP_TARGET_PATHS.mainPageTheatreSessions));

        return response.playbillTheaterList;
    }

    const getRenters = async (type, categories = '', floors = '', hasNew = 0, hasStock = 0) => {
        const response = await request(
            `${madeFullPpUrl(PP_TARGET_PATHS.renters)}`
            +`?category=${type}`
            +`${categories.length ? `&subCategory=${categories}` : ''}`
            +`${floors.length ? `&floor=${floors}` : ''}`
            +`${hasNew ? `&new=1` : ''}`
            +`${hasStock ? `&has_stocks=1` : ''}`
        );

        const storesGroup = {};

        response.storesList.forEach(store => {
            if (storesGroup[store.liter]) {
                storesGroup[store.liter].push(store);
            } else {
                storesGroup[store.liter] = [store];
            }
        });

        return {
            stores: response.storesList,
            storesGroup,
        };
    }

    const getRentersCategories = async (type = '') => {
        const response = await request(madeFullPpUrl(PP_TARGET_PATHS.rentersCategories));

        return type
            ? response.categories[type].categories
            : response.categories;
    }

    const getCategoriesForMenu = async () => {
        const response = await request(madeFullPpUrl(PP_TARGET_PATHS.rentersCategories));

        const categoriesForMenu = {
            'Магазины': {},
            'Кафе и рестораны': {},
            'Развлечения': {},
            'Услуги и сервис': {},
        };

        response.categories.shops.categories?.forEach(category => categoriesForMenu['Магазины'][category.category] = `/stores?categories=${category.id}`);
        response.categories.cafes.categories?.forEach(category => categoriesForMenu['Кафе и рестораны'][category.category] = `/cafes?categories=${category.id}`);
        response.categories.recreation.categories?.forEach(category => categoriesForMenu['Развлечения'][category.category] = `/entertainments?categories=${category.id}`);
        response.categories.services.categories?.forEach(category => categoriesForMenu['Услуги и сервис'][category.category] = `/services?categories=${category.id}`);

        return categoriesForMenu;
    }

    const getCafes = async () => {
        return await request(`${madeFullPpUrl(PP_TARGET_PATHS.renters)}?category=cafes`);
    }

    const getEntertainments = async () => {
        return await request(`${madeFullPpUrl(PP_TARGET_PATHS.renters)}?category=entertainments`);
    }

    const getRenterData = async (id) => {
        const response = await request(madeFullPpUrl(`${PP_TARGET_PATHS.renters}/${id}`));

        return {
            header: {
                heading: response.storeName,
                idSpace: response.idSpace,
                location: {
                    floor: response.floor,
                    mapId: response.idSpace,
                },
                description: response.description,
                images: {
                    desktop: response.mainImages.desktop,
                    mobile: response.mainImages.mobile,
                    alt: response.mainImages.alt,
                },
                logo: response.logo,
                categories: response.categoriesList,
            },
            contacts: {
                workingTime: response.workingTime,
                links: response.links[0],
                phoneNumber: response.phoneNumber,
            },
            gallery: response.gallery,
            stocks: response.stocksList,
            similarStores: response.similarStoresList,
        };
    }

    const getStocks = async (page = '1', subCategory = '', sortingType = 'start_date') => {
        if (subCategory === 'entertainments') {
            const responseStocksAmusementPark = await request(madeFullPpUrl(PP_TARGET_PATHS.entertainment));
            const responseCinemaStocks = await request(madeFullPpUrl(PP_TARGET_PATHS.cinemasDonats));

            const stocksAmusementParkData = responseStocksAmusementPark.stocksList.map(item => ({
                image: item.image,
                alt: item.alt,
                storeName: "ФЛИК ФЛЯК",
                heading: item.heading,
                date: "",
                link: item.link,
            }));

            const cinemaStocks = responseCinemaStocks.takeIt.map(item => ({
                image: item.image,
                alt: item.alt,
                storeName: "Kinomax",
                heading: item.heading,
                date: "",
                link: item.link,
            }));

            return [...stocksAmusementParkData, ...cinemaStocks];
        } else {
            const response = await request(
                `${madeFullPpUrl(PP_TARGET_PATHS.stocks)}`
                +`?perPage=9&page=${page}`
                +`${subCategory.length > 0 ? `&subCategory=${subCategory}` : ''}`
                +`&by=${sortingType}`
            );

            return response.stocks;
        }
    }

    const getStock = async (id) => {
        const response = await request(madeFullPpUrl(`${PP_TARGET_PATHS.stocks}/${id}`));

        return {
            header: {
                heading: response.heading,
                description: response.description,
                images: {
                    desktop: response.mainBanner.desktopImage,
                    mobile: response.mainBanner.mobileImage,
                    alt: response.mainBanner.alt,
                },
                date: response.date,
            },
            additionalBanner: response.additionalBanner,
            bannersWithText: response.otherAdditionalBannersList,
            linksToLandings: response.linksToLanding,
            partners: response.partners,
            gallery: response.gallery,
            otherStocks: response.otherStocksList,
        };
    }

    const getNewsEventsForMainPage = async () => {
        return await request(madeFullPpUrl(PP_TARGET_PATHS.newsEventsForMainPage));
    }

    const getNewsEvents = async (page) => {
        const response = await request(`${madeFullPpUrl(PP_TARGET_PATHS.newsEvents)}?page=${page}`);

        return {
            data: response.data,
            totalPages: response.last_page,
        }
    }

    const getNews = async (page) => {
        const response = await request(`${madeFullPpUrl(PP_TARGET_PATHS.news)}?page=${page}`);

        return {
            data: response.itemsList.data,
        };
    }

    const getEvents = async (page) => {
        const response = await request(`${madeFullPpUrl(PP_TARGET_PATHS.events)}?page=${page}`);

        return {
            data: response.itemsList.data,
        };
    }

    const getEventsLastDate = async (page) => {
        const response = await request(`${madeFullPpUrl(PP_TARGET_PATHS.eventsLastDate)}?page=${page}`);
        return {
            data: response.itemsList.data,
        };
    }

    const getEventsLastDateOne = async (id) => {
        const response = await request(`${madeFullPpUrl(PP_TARGET_PATHS.eventsLastDate)}/${id}`);

        return {
            header: {
                heading: response.heading,
                description: response.description,
                images: {
                    desktop: response.mainImage.desktopImage,
                    mobile: response.mainImage.mobileImage,
                    alt: response.mainImage.alt,
                },
            },
            gallery: response.gallery,
            schedule: response.eventsList,
            otherEvents: response.otherEventsList,
        };
    }

    const getEntertainmentEvents = async () => {
        const response = await request(madeFullPpUrl(PP_TARGET_PATHS.entertainment));

        return {
            events: response.eventsList,
            stocks: response.stocksList,
        }
    }

    const getCategoriseForMainPage = async () => {
        const response = await request(madeFullPpUrl(PP_TARGET_PATHS.categoriesForMainPage));

        return response.categoryList.length > 10 ? response.categoryList.slice(0, 10) : response.categoryList;
    }

    const getRetailers = async () => {
        const response = await request(madeFullPpUrl(PP_TARGET_PATHS.retailers));

        return response.retailParkList;
    }

    const getEvent = async (id) => {
        const response = await request(`${madeFullPpUrl(PP_TARGET_PATHS.events)}/${id}`);

        return {
            header: {
                heading: response.heading,
                description: response.description,
                images: {
                    desktop: response.mainImage.desktopImage,
                    mobile: response.mainImage.mobileImage,
                    alt: response.mainImage.alt,
                },
            },
            gallery: response.gallery,
            schedule: response.eventsList,
            otherEvents: response.otherEventsList,
        };
    }

    const getNew = async (id) => {
        const response = await request(`${madeFullPpUrl(PP_TARGET_PATHS.news)}/${id}`);

        return {
            header: {
                heading: response.heading,
                description: response.description,
                images: response.mainImage,
                date: response.date,
            },
            gallery: response.gallery,
            banners: response.otherAdditionalBannersList,
            partners: response.partners,
            otherNews: response.otherNewsList,
        };
    }

    const getCinemaDonats = async () => {
        const response = await request(madeFullPpUrl(PP_TARGET_PATHS.cinemasDonats));

        return response.takeIt;
    }

    const getVacancies = async () => {
        const response = await request(madeFullPpUrl(PP_TARGET_PATHS.vacancies));

        return response.vacancyList;
    }

    const getContacts = async () => {
        const response = await request(madeFullPpUrl(PP_TARGET_PATHS.contacts));

        const otherContactsList = {};

        response.otherContactsList.forEach(contact => {
            if (otherContactsList[contact.contactType]) {
                otherContactsList[contact.contactType].push(contact);
            } else {
                otherContactsList[contact.contactType] = [contact];
            }
        });

        return {
            metaTitle: response.metaTitle,
            metaDescription: response.metaDescription,
            metaKeywords: response.metaKeywords,
            heading: response.heading,
            administration: response.administration,
            rentalPremises: response.rentalPremises,
            rentalPremises1: response.rentalPremises1,
            marketing: response.marketing,
            otherContactsList,
        };
    }

    const getAboutData = async () => {
        return await request(madeFullPpUrl(PP_TARGET_PATHS.about));
    }

    const getRules = async () => {
        const response = await request(madeFullPpUrl(PP_TARGET_PATHS.rules));

        return {
            metaTitle: response.metaTitle,
            metaDescription: response.metaDescription,
            metaKeywords: response.metaKeywords,
            heading: response.heading,
            images: {
                desktop: response.desktopImage,
                mobile: response.mobileImage,
                alt: response.alt,
            },
            date: `Редакция ${response.version} от ${response.date} г.`,
            presentationLink: response.link,
        };
    }

    const getToRenters = async () => {
        return await request(madeFullPpUrl(PP_TARGET_PATHS.toRenters));
    }

    const getCinemasSessions = async () => {
        const response = await request(`${KM_BASE_URL}${KM_API_PATH}cinemas/${KM_CINEMA_ID}/sessions`);

        return response.movies;
    }

    const subscribeEmailNewsletter = async (data) => {
        try {
            const response = await fetch(
                `${MB_BASE_URL}${MB_API_PATHS}?endpointId=${MB_ENDPOINT_ID}&operation=${MB_OPERATION}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Accept': 'application/json',
                        'Authorization': `SecretKey ${MB_SECRET_KEY}`,
                    },
                    body: JSON.stringify(data),
                }
            )

            if (!response.ok) {
                console.log(
                    '%c SUBSCRIBE ERROR',
                    'color: #fff; background-color: #d33f49;',
                    `\nДанные в MindBox не отправлены.\nСтатус: ${response.status}.\nДополнительно ${response.statusText}.`
                );
                throw new Error();
            }

            const json = await response.json();

            return {
                status: json.status,
                message: json.validationMessages,
            };
        } catch (error) {
            console.log(
                '%c SUBSCRIBE ERROR',
                'color: #fff; background-color: #d33f49;',
                `\nСервер MindBox не отвечает.\nОшибка: ${error}.`
            );
            throw new Error();
        }
    }

    const sentFormToRenters = async (data) => {
        try {
            const response = await fetch(madeFullPpUrl('feedback-forms'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                console.log(
                    '%c SUBSCRIBE ERROR',
                    'color: #fff; background-color: #d33f49;',
                    `\nДанные не отправлены.\nСтатус: ${response.status}.\nДополнительно ${response.statusText}.`
                );
                throw new Error();
            }

            return response.ok;
        } catch (error) {
            console.log(
                '%c SUBSCRIBE ERROR',
                'color: #fff; background-color: #d33f49;',
                `\nСервер не отвечает.\nОшибка: ${error}.`
            );
            throw new Error();
        }
    }

    const getMapTRC = async (floor = 1) => {
        let result = {
            filter: [],
            map: {}
        };

        let color = '#CCCCCC'

        // Магазины, Кафе и рестораны, Услуги и сервисы, Развлечения
        await request(`${madeFullPpUrl(PP_TARGET_PATHS.mapTRC)}?floor=${floor}`).then(response => {
            result = response.reduce((acc, curr) => {
                acc.map[curr.idSpace] = curr;
                let category = acc.filter.find(item => item.category === curr.category);

                switch (curr.category) {
                    case 'Магазины':
                        color = '#3383A4'
                        break;
                    case 'Кафе и рестораны':
                        color = '#F5BA46'
                        break;
                    case 'Услуги и сервисы':
                        color = '#9E2E46'
                        break;
                    case 'Развлечения':
                        color = '#000000'
                        break;
                    default:
                        color = '#CCCCCC'
                        break;
                }

                if (!category) {
                    category = {
                        category: curr.category,
                        subCategory: [],
                        color: color
                    };
                    acc.filter.push(category);
                }

                curr.subCategory.forEach(sub => {
                    let subCategory = category.subCategory.find(item => item.category === sub.category);

                    if (!subCategory) {
                        subCategory = {
                            category: sub.category,
                            idSpaces: [],
                            color: color
                        };
                        category.subCategory.push(subCategory);
                    }

                    subCategory.idSpaces.push(curr.idSpace);
                });

                return acc;
            }, result);
            result.filter.sort((a, b) => a.category.localeCompare(b.category));
        });

        return result;
    };

    return {
        getThroughContacts,
        getThroughSearchData,
        getMainPageData,
        getMainPageMainBanners,
        getMainPageStocks,
        getTheatreSessions,
        getRenters,
        getRentersCategories,
        getCategoriesForMenu,
        getCafes,
        getEntertainments,
        getRenterData,
        getStocks,
        getStock,
        getNewsEventsForMainPage,
        getEntertainmentEvents,
        getCategoriseForMainPage,
        getNewsEvents,
        getRetailers,
        getEvents,
        getEventsLastDate,
        getEventsLastDateOne,
        getEvent,
        getNews,
        getNew,
        getCinemaDonats,
        getVacancies,
        getContacts,
        getAboutData,
        getRules,
        getToRenters,
        getCinemasSessions,
        subscribeEmailNewsletter,
        sentFormToRenters,
        getMapTRC
    }
}

function madeFullPpUrl(targetPath) {
    return `${PP_BASE_URL}${PP_API_PATH}${targetPath}`;
}
