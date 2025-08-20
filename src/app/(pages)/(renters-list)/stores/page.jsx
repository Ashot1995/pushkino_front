import {BreadCrumbs} from "../../../../widgets/bread-crumbs";
import {RentersList} from "../../../../widgets/renters-list";

import {META_DATA, BREAD_CRUMBS_LEVELS} from "./config";

export const metadata = META_DATA;

export default function StoresListPage({searchParams}) {
    return (
        <>
            <BreadCrumbs levels={BREAD_CRUMBS_LEVELS} />
            <RentersList searchParams={searchParams} type='shops' />
        </>
    )
}
