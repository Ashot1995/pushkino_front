import {BreadCrumbs} from "../../../widgets/bread-crumbs";
import {TrcMapWidget} from '../../../widgets/trc-map';
import {breadCrumbsLevels} from "./config";
import {UISection} from "../../../shared/ui/section";

export default function TrcMapPage() {
    return (
        <>
            <BreadCrumbs levels={breadCrumbsLevels} />
            <UISection>
                <TrcMapWidget />
            </UISection>
        </>
    )
}
