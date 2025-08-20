'use client';

import {useSelector, useDispatch} from "react-redux";

import {UISection} from "../../../shared/ui/section";
import {SvgIcon} from "../../../shared/ui/svg-icon";
import {changeRoutingMode} from "../../../shared/lib/store/slices/howToGetRoutingMode";

import styles from './styles.module.scss';

export function HowToGetHeader() {
    const routingMode = useSelector(state => state.howToGetRoutingMode.value);
    const dispatch = useDispatch();

    return (
        <>
            <UISection defaultClass={styles['htg-header']}>
                <h1 className={`${styles['htg-header__heading']} h1 h1_caps`}>как добраться</h1>

                <div className={styles['htg-header__move-type']}>
                    <div
                        className={`
                            ${styles['htg-header__move-type-item']}
                            ${routingMode === 'auto' && styles['htg-header__move-type-item_active']}
                        `}
                        onClick={() => dispatch(changeRoutingMode('auto'))}
                    >
                        <SvgIcon id='car' color='#000' />
                        <span>на машине</span>
                    </div>
                    <div
                        className={`
                            ${styles['htg-header__move-type-item']}
                            ${routingMode === 'masstransit' && styles['htg-header__move-type-item_active']}
                        `}
                        onClick={() => dispatch(changeRoutingMode('masstransit'))}
                    >
                        <SvgIcon id='bus' color='#000'/>
                        <span>на автобусе</span>
                    </div>
                </div>
            </UISection>
        </>
    )
}
