import {BreadCrumbs} from "../../../widgets/bread-crumbs";
import {HowToGetHeader} from "../../../widgets/how-to-get/header";
import {HowToGetMap} from "../../../widgets/how-to-get/map";

import {META_DATA, BREAD_CRUMBS_LEVELS} from "./config";

export const metadata = META_DATA;

export default function HowToGetPage() {
    return (
        <>
            <BreadCrumbs levels={BREAD_CRUMBS_LEVELS}/>
            <HowToGetHeader/>
            <HowToGetMap/>
        </>
    )
}
