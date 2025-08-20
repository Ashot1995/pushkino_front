import { Raleway, Russo_One } from "next/font/google";
import { Suspense } from "react";
import StoreProvider from "../shared/lib/store/StoreProvider";
import { Header } from "../widgets/header";
import { Footer } from "../widgets/footer/";
import Script from 'next/script';

import './_styles/global.scss';

export const metadata = {
    title: "ТРЦ Пушкино Парк",
    description: "ТРЦ Пушкино Парк",
    keywords: "ТРЦ Пушкино Парк"
};

export const fetchCache = 'force-no-store';

const raleway = Raleway({
    subsets: ['cyrillic'],
    display: "swap",
    weight: ['400', '600'],
    variable: '--family-raleway',
});

const russoOne = Russo_One({
    subsets: ['cyrillic'],
    display: "swap",
    weight: ['400'],
    variable: '--family-russo-one',
});

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    viewportFit: 'cover'
}

export default function RootLayout({ children }) {
    return (
        <html lang="ru" className={`${raleway.variable} ${russoOne.variable}`}>
        <head>
            <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png"/>
            <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png"/>
            <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png"/>
            <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png"/>
            <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png"/>
            <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png"/>
            <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png"/>
            <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png"/>
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png"/>
            <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png"/>
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
            <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png"/>
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
            <link rel="manifest" href="/manifest.json"/>
            <meta name="msapplication-TileColor" content="#ffffff"/>
            <meta name="msapplication-TileImage" content="/ms-icon-144x144.png"/>
            <meta name="theme-color" content="#ffffff"/>
            <meta name="google-adsense-account" content="ca-pub-7948699933188715"/>

            <script async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7948699933188715"
                    crossOrigin="anonymous"></script>
        </head>
        <body>
        <StoreProvider>
            <Header/>
            <div className={`header-fix header_fix`}></div>
            <div className={'root-wrapper'}>
                        <div className={'main-outer'}>
                            {children}
                        </div>
                        <Footer />
                    </div>
                </StoreProvider>
                <script type="text/javascript" id="mapplic-script" src="https://mapplic.com/mapplic.js" defer></script>
            </body>
        </html>
    );
}
