'use client';
import { YandexMetricaProvider } from 'next-yandex-metrica';
import {Provider} from "react-redux";

import {store} from "./store";

export default function StoreProvider({children}) {
    return <YandexMetricaProvider tagID={98705115}
        initParameters={{ clickmap: true, trackLinks: true, accurateTrackBounce: true }}>
        <Provider store={store}>{children}</Provider>
    </YandexMetricaProvider>
}
