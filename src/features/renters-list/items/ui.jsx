'use client';

import {useSelector} from "react-redux";

import {RentersSingleTile} from "../../../entities/renters-single-tile";
import {RentersGroupTile} from "../../../entities/renters-group-tile";

import styles from './styles.module.scss';

export function RentersListItems({data, type}) {
    const currentViewMode = useSelector(state => state.rentersListFilter.value.viewMode);

    return (
        <section
            className={`
                ${styles['renters-items']}
                ${styles[`renters-items_${currentViewMode}`]}
                ${type === 'recreation' || type === 'services' ? styles[`renters-items_${currentViewMode}-four-columns`] : null}
            `}
        >
            {
                data &&
                    currentViewMode === 'tiles'
                        ? data.stores?.map((item, index) => <RentersSingleTile data={item} key={index} />)
                        : Object.keys(data.storesGroup).sort().map((liter, index) => <RentersGroupTile liter={liter} data={data.storesGroup[liter]} key={index} />)
            }
        </section>
    )
}
