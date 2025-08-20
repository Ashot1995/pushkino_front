import {UISection} from "../shared/ui/section";
import React from "react";

export default function Loading() {
    return (
        <UISection defaultClass='loading'>
            <div className={'loading'}>
                <div className={'loading-header loading-effect'}></div>
                <div className={'loading-body'}>
                    <div className={'loading-effect'}></div>
                    <div className={'loading-effect'}></div>
                </div>
            </div>
        </UISection>
    )
}
