import { BreadCrumbs } from "../../../widgets/bread-crumbs";
import { AboutTitle } from "../../../widgets/about/title";
import { AboutPresentation } from "../../../widgets/about/presentation";
import { AboutBanner } from "../../../widgets/about/banner";
import { AboutNums } from "../../../widgets/about/nums";
import { AboutBannerWithText } from "../../../widgets/about/banner-with-text";
import { SliderSix } from "../../../shared/slider-six";
import { AboutInfo } from "../../../widgets/about/info";
import { networkService } from "../../../shared/lib/network";
import { SingleBanner } from "../../../shared/single-banner";
import { SingleBannerWithText } from "../../../shared/single-banner-with-text";

import styles from './styles.module.scss'

import { BREAD_CRUMBS_LEVELS } from "./config";

export async function generateMetadata() {
    const data = await networkService().getAboutData();

    return {
        title: data.metaTitle,
        description: data.metaDescription,
        keywords: data.metaKeywords,
    }
}

export default async function AboutPage() {
    const aboutData = await networkService().getAboutData();
    const pageImage = aboutData.banners.mainBanner.desktopImage;
    const mobImage = aboutData.banners.mainBanner.mobileImage;
    return (
        <>
            <style>{`
                .about .slider-six__heading {
                    font-size: 3.2rem;
                    font-weight: 600;
                    line-height: normal;
                    letter-spacing: 0.032rem;
                    text-transform: uppercase;
                    color: var(--color-primary-blue);
                }
                
                .about .slider-six__slider {
                        margin-bottom: 0;
                }
            `}</style>

            <BreadCrumbs levels={BREAD_CRUMBS_LEVELS} />

            <main className={`
                ${styles['about']}
                about
            `}>
                {
                    aboutData.heading &&
                    <AboutTitle heading={aboutData.heading} />
                }
                {
                    aboutData.description && mobImage && pageImage &&
                    <AboutPresentation description={aboutData.description} link={aboutData.presentationLink}
                        srcDesk={aboutData.banners.mainBanner.desktopImage ? aboutData.banners.mainBanner.desktopImage : '/images/no-foto.jpg'}
                        srcMob={aboutData.banners.mainBanner.mobileImage ? aboutData.banners.mainBanner.mobileImage : '/images/no-foto.jpg'}
                        alt={aboutData.banners.mainBanner.alt ? aboutData.banners.mainBanner.alt : 'Основной баннер'}
                    />
                }
                {
                    aboutData.advantages &&
                    aboutData.advantages.length > 0 &&
                    <AboutNums data={aboutData.advantages} />
                }
                {
                    aboutData.banners.bannersWithTextList &&
                    aboutData.banners.bannersWithTextList.length > 0 &&
                    aboutData.banners.bannersWithTextList.map((banner, index) => (
                        <SingleBannerWithText
                            data={banner}
                            bannerSide={index % 2 === 0 ? 'left' : 'right'}
                            bannerAlign='center'
                            key={index}
                        />
                    ))
                }
                {
                    aboutData.banners.additionalBanner &&
                    <SingleBanner
                        imgDesk={aboutData.banners.additionalBanner.desktopImage ? aboutData.banners.additionalBanner.desktopImage : '/images/no-foto.jpg'}
                        imgMob={aboutData.banners.additionalBanner.mobileImage ? aboutData.banners.additionalBanner.mobileImage : '/images/no-foto.jpg'}
                        alt={aboutData.banners.additionalBanner.alt ? aboutData.banners.additionalBanner.alt : 'Основной баннер'}
                    />
                }
                {
                    aboutData.sliderWithDescription &&
                    <AboutInfo banner={aboutData.sliderWithDescription} />
                }
                {
                    aboutData.storesList.parking &&
                    aboutData.storesList.parking.length > 0 &&
                    <SliderSix heading='Павильоны на парковке' data={aboutData.storesList.parking} />
                }
                {
                    aboutData.storesList.firstFloor &&
                    aboutData.storesList.firstFloor.length > 0 &&
                    <SliderSix heading='1-й этаж' data={aboutData.storesList.firstFloor} />
                }
                {
                    aboutData.storesList.secondFloor &&
                    aboutData.storesList.secondFloor.length > 0 &&
                    <SliderSix heading='2-й этаж' data={aboutData.storesList.secondFloor} />
                }
            </main>
        </>
    );
}
