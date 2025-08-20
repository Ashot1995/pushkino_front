import {UISection} from "../../../shared/ui/section";
import {SliderThreeTiles} from "../../slider-three-tiles";

import styles from './styles.module.scss';

export function SingleStockLinksToLandings({data}) {
    return (
        <>
            <style>{`
                .stock-links-to-landings .slider__title {
                    color: var(--color-black);
                }
            `}</style>

            <UISection
                defaultClass={`
                    ${styles['stock-links-to-landings']}
                    stock-links-to-landings
                `}>
                <div className={styles['stock-links-to-landings__heading']}>Ссылки на внутренние лендинги</div>
                <SliderThreeTiles slides={data} />
            </UISection>
        </>
    )
}
