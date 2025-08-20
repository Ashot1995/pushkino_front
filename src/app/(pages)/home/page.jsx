import {networkService} from "../../../shared/lib/network";
import {MainPageBanners} from "../../../widgets/main-page/banners";
import {MainPageSubscribe} from "../../../widgets/main-page/subscribe";
import {MainPageStocks} from "../../../widgets/main-page/stocks";
import {MainPageStores} from "../../../widgets/main-page/stores";
import {MainPageNews} from "../../../widgets/main-page/news";
import {MainPageTheatre} from "../../../widgets/main-page/theatre";
import {MainPageEntertainmentPark} from "../../../widgets/main-page/entertainment-park";
import {MainPageCinema} from "../../../widgets/main-page/cinema";
import {MainPageRetailPark} from "../../../widgets/main-page/retail-park";

export default async function HomePage() {
    const {
        bannersData,
        stocksData,
        storesCategoriesData,
        newsData,
        theatreData,
        entertainmentParkData,
        cinemasSessionsData,
        cinemaDonatesData,
        retailersData
    } = await networkService().getMainPageData();

    const currentDateTime = `${Intl.DateTimeFormat('ru-RU', {
                                timeZone: 'Europe/Moscow',
                                weekday: 'long',
                                day: 'numeric',
                                month: 'long',
                                hour: 'numeric',
                                minute: 'numeric',
                            }).format(new Date())}`.split(' в ').join(', ');

    return (
        <main>
            {
                bannersData &&
                    <MainPageBanners bannersData={bannersData} />
            }

            <MainPageSubscribe />

            {
                stocksData &&
                    <MainPageStocks stocksData={stocksData} />
            }

            {
                storesCategoriesData &&
                    <MainPageStores categoriesData={storesCategoriesData} />
            }

            {
                newsData &&
                    <MainPageNews newsData={newsData} />
            }

            {
                theatreData &&
                    <MainPageTheatre
                        theatreData={theatreData}
                        currentDateTime={currentDateTime}
                    />
            }

            {
                entertainmentParkData &&
                    <MainPageEntertainmentPark entertainmentParkData={entertainmentParkData} />
            }

            {
                cinemasSessionsData &&
                    <MainPageCinema
                        cinemasSessionsData={cinemasSessionsData}
                        cinemaDonatesData={cinemaDonatesData}
                        currentDateTime={currentDateTime}
                    />
            }

            {
                retailersData &&
                    <MainPageRetailPark retailersData={retailersData} />
            }
        </main>
    );
}
