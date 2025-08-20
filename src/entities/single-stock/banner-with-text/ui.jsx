import {UISection} from "../../../shared/ui/section";
import {ButtonFull} from "../../../shared/ui/buttons";

import styles from './styles.module.scss';

export function SingleStockBannerWithText({bannerSide, button = {}}) {

    return (
        <UISection defaultClass={styles['single-stock-banner-with-text']}>
            <div className={styles['single-stock-banner-with-text__wrapper']}>
                <div
                    className={`
                        ${styles['single-stock-banner-with-text__banner']}
                        ${styles[`single-stock-banner-with-text__banner_${bannerSide}`]}
                    `}>
                    <img src="/images/temp_dev/single-renter/main-banner.jpg" alt=""/>
                </div>
                <div className={styles['single-stock-banner-with-text__description']}>
                    <div className={styles['single-stock-banner-with-text__heading']}>Правила акции</div>
                    <div className={styles['single-stock-banner-with-text__text']}>
                        Разнообразный и богатый опыт говорит нам, что высокое качество позиционных исследований говорит о возможностях распределения внутренних резервов и ресурсов.
                    </div>
                    {
                        Object.keys(button).length > 0 &&
                        <div className={styles['single-stock-banner-with-text__button']}>
                            <ButtonFull>{button.text}</ButtonFull>
                        </div>
                    }
                </div>
            </div>
        </UISection>
    )
}
