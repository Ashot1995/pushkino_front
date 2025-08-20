import {UISection} from "../../../shared/ui/section";
import {SliderTwoTiles} from "../../slider-two-tiles";

import styles from './styles.module.scss';
import {OTHER_STOCKS_SLIDES_LONG} from "./config";

export function SingleStockOtherStocks({data}) {
    return (
        <>
            <style>{`
                .stock-other-stocks .slider__title,
                .stock-other-stocks .slider__subtitle {
                    color: #000;
                }
            `}</style>

            <UISection defaultClass={`${styles['stock-other-stocks']} stock-other-stocks`}>
                <div className={styles['stock-other-stocks__heading']}>Другие акции</div>
                <SliderTwoTiles slides={data ? data : OTHER_STOCKS_SLIDES_LONG} />
            </UISection>
        </>
    )
}
