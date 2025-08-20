import {BreadCrumbs} from "../../../../widgets/bread-crumbs";
import {RentersList} from "../../../../widgets/renters-list";

import {BREAD_CRUMBS_LEVELS, META_DATA} from "./config";

export const metadata = META_DATA;

export default function CafesListPage({searchParams}) {
    return (
        <>
            <BreadCrumbs levels={BREAD_CRUMBS_LEVELS} />
            <RentersList searchParams={searchParams} type='cafes' />
        </>
    )
}
