export const MENU_HEADER_LINKS = [
    {
        'Магазины': {
            id: 'stores',
            link: '/stores',
            subItems: {
                'Женская одежда': '/stores?categories=1',
                'Мужская одежда': '/stores?categories=2',
                'Детские товары': '/stores?categories=3',
                'Обувь, сумки, аксессуары': '/stores?categories=4',
                'Ювелирные украшения': '/stores?categories=5',
                'Красота и здоровье': '/stores?categories=6',
                'Аптеки и Оптики': '/stores?categories=7',
                'Хобби и творчество': '/stores?categories=8',
                'Спортивные товары': '/stores?categories=9',
                'Подарки и сувениры': '/stores?categories=10',
                'Товары для дома': '/stores?categories=11',
                'Бытовая техника': '/stores?categories=12',
                'Ремонт и сад': '/stores?categories=13',
                'Услуги': '/stores?categories=14',
            },
        },
        'Кафе и рестораны': {
            id: 'restaurants',
            link: '/cafes',
            subItems: {
                'Кафе и рестораны': '/cafes?categories=15',
                'Кофейни': '/cafes?categories=16',
                'Кондитерские': '/cafes?categories=17',
                'Фастфуд': '/cafes?categories=18',
            },
        },
        'Развлечения': {
            id: 'entertainments',
            link: '/entertainments',
            subItems: {},
        },
        'Услуги и сервис': {
            id: 'service',
            link: '/services',
            subItems: {
                'Туалет': '/services?categories=19',
                'Гардероб': '/services?categories=20',
                'Комната матери и ребенка': '/services?categories=21',
            },
        },
    },
    {
        'Новости и мероприятия': {
            id: 'news-desktop',
            link: '/news-and-events',
        },
        'Акции': {
            id: 'stocks',
            link: '/stocks',
        },
    },
    {
        'Новости': {
            id: 'news-mobile',
            link: '/news-and-events',
            subItems: {
                'Новости и мероприятия': '/news-and-events',
                'Акции': '/stocks',
            },
        },
    },
    {
        'Контакты': {
            id: 'contacts-desktop',
            link: '/contacts',
        },
        'Вакансии': {
            id: 'vacancies',
            link: '/vacancies',
        },
        'Арендаторам': {
            id: 'tenants',
            link: '/to-renters',
        },
        'О ТРЦ': {
            id: 'about',
            link: '/about',
        },
        'Правила ТРЦ': {
            id: 'rules',
            link: '/rules',
        },
    },
    {
        'Информация': {
            id: 'contacts-mobile',
            link: '/contacts',
            subItems: {
                'Контакты': '/contacts',
                'Вакансии': '/vacancies',
                'Арендаторам': '/to-renters',
                'О ТРЦ': '/about',
                'Правила ТРЦ': '/rules',
            },
        },
    },
];

export const MENU_FOOTER_LINKS = [
    {
        'Магазины': {
            id: 'stores',
            link: '/stores',
            subItems: {
                'Женская одежда': '/stores?categories=1',
                'Мужская одежда': '/stores?categories=2',
                'Детские товары': '/stores?categories=3',
                'Обувь, сумки, аксессуары': '/stores?categories=4',
                'Ювелирные украшения': '/stores?categories=5',
                'Красота и здоровье': '/stores?categories=6',
                'Аптеки и Оптики': '/stores?categories=7',
                'Хобби и творчество': '/stores?categories=8',
                'Спортивные товары': '/stores?categories=9',
                'Подарки и сувениры': '/stores?categories=10',
                'Товары для дома': '/stores?categories=11',
                'Бытовая техника': '/stores?categories=12',
                'Ремонт и сад': '/stores?categories=13',
                'Услуги': '/stores?categories=14',
            },
        },
        'Кафе и рестораны': {
            id: 'restaurants',
            link: '/cafes',
            subItems: {
                'Кафе и рестораны': '/cafes?categories=15',
                'Кофейни': '/cafes?categories=16',
                'Кондитерские': '/cafes?categories=17',
                'Фастфуд': '/cafes?categories=18',
            },
        },
        'Развлечения': {
            id: 'entertainments',
            link: '/entertainments',
            subItems: {},
        },
        'Услуги и сервис': {
            id: 'service',
            link: '/services',
            subItems: {
                'Туалет': '/services?categories=19',
                'Гардероб': '/services?categories=20',
                'Комната матери и ребенка': '/services?categories=21',
            },
        },
    },
    {
        'Новости и мероприятия': {
            id: 'news',
            link: '/news-and-events',
        },
        'Акции': {
            id: 'stocks',
            link: '/stocks',
        },
    },
    {
        'Контакты': {
            id: 'contacts',
            link: '/contacts',
        },
        'Вакансии': {
            id: 'vacancies',
            link: '/vacancies',
        },
        'Арендаторам': {
            id: 'tenants',
            link: '/to-renters',
        },
        'О ТРЦ': {
            id: 'about',
            link: '/about',
        },
        'Правила ТРЦ': {
            id: 'rules',
            link: '/rules',
        },
    },
];

export const RENTERS_CATEGORIES = {
    shops: {
        name: 'Магазины',
        categories: [
            'Женская одежда',
            'Мужская одежда',
            'Детские товары',
            'Обувь, сумки, аксессуары',
            'Ювелирные украшения',
            'Красота и здоровье',
            'Аптеки и Оптики',
            'Хобби и творчество',
            'Спортивные товары',
            'Подарки и сувениры',
            'Товары для дома',
            'Бытовая техника',
            'Ремонт и сад',
            'Услуги'
        ],
    },
    cafes: {
        name: 'Кафе и рестораны',
        categories: [
            'Кафе и рестораны',
            'Кофейни',
            'Кондитерские',
            'Фастфуд'
        ],
    },
    recreation: {
        name: 'Развлечения',
        categories: [
            'Развлечения',
            'Флик Фляк',
            'Третий рим',
        ],
    },
    services: {
        name: 'Услуги и сервис',
        categories: [
            'Туалет',
            'Гардероб',
            'Комната матери и ребенка'
        ],
    }
}

export const YANDEX_MAP_API_KEY = 'fd760f0b-8527-464a-8a4f-57d43631ff88';
