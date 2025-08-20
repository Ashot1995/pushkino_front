import styles from './styles.module.scss';

import {SingleBannerWithText} from "../../../shared/single-banner-with-text";

export function AboutBannerWithText({
                                        title,
                                        desc,
                                        bannerSide,
                                        imgDesk,
                                        imgMob,
                                        alt
}) {

    const mocData = {
        heading: title,
        alt: alt,
        buttonLink: '#!',
        buttonText: 'Кнопка',
        description: desc,
        desktopImage: imgDesk,
        mobileImage: imgMob,
    }

    return (
        <SingleBannerWithText
            data={mocData}
            bannerSide={bannerSide}
            bannerAlign='center'
        />
    )
}
