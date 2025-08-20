// API Пушкино Парк
export const
    PP_BASE_URL = 'https://cp.pushkinopark.ru',
    PP_API_PATH = '/api/',
    PP_TARGET_PATHS = {
        throughContacts: 'settings', // Данные для шапки, футера и соцсети
        throughSearch: 'search', // Для поиска из шапки
        mainPageMainBanners: 'banners', // Основной баннер карусель на главной странице
        mainPageTheatreSessions: 'theater-elements', // События театра Третий Рим (для блока на главной странице)
        mainPageStocks: 'stocks/main', // Список акций для главной страницы
        entertainment: 'amusement-park', // Список мероприятий ФЛИК ФЛЯК
        retailers: 'retail-park-elements', // Список ретейлеров для главной страницы
        cinemasDonats: 'movie-posters', // Список акций кинотеатра для главной
        eventsLastDate: 'event-lasts', // Список прошедших событий
        rentersCategories: 'categories', // список основных категорий арендаторов с подкатегориями
        renters: 'tenants', // список всех арендаторов. /tenants/[id] - арендатор по id
        stocks: 'stocks', // список всех акций. /stocks/[id] - акция по id
        newsEvents: 'news-events', // Список новостей и мероприятий
        newsEventsForMainPage: 'news-events/main', // Список новостей и мероприятий для главной страницы
        events: 'events', // Список мероприятий /events/[id] - мероприятие по id
        news: 'news', // Список новостей /news/[id] - новость по id
        vacancies: 'vacancies', // Список всех вакансий
        contacts: 'static-pages/contacts', // Данные для страницы контактов
        about: 'static-pages/about', // Данные для страницы о ТРЦ
        rules: 'static-pages/rules', // Данные для страницы Правила
        toRenters: 'static-pages/to-renters', // Данные для страницы Арендаторам
        mapTRC: 'map', // Карта ТРЦ
        categoriesForMainPage: 'categories/main', // Категории для главной страницы
        feedbackForms: 'feedback-forms' // Отправка формы со страницы "Для арендаторов"
    };

// API Kinomax
export const
    KM_BASE_URL = 'https://api.kinomax.ru',
    KM_API_PATH = '/rest/',
    KM_CINEMA_ID = '51';

// API MindBox
export const
    MB_BASE_URL = 'https://api.mindbox.ru',
    MB_API_PATHS = '/v3/operations/sync',
    MB_ENDPOINT_ID = 'pushkinopark.Website',
    MB_OPERATION = 'ImportCustomerPushParkWeb',
    MB_SECRET_KEY = 'npFJKBUvOlSKfnzpIjQF5JQxXt9zLKV6';
