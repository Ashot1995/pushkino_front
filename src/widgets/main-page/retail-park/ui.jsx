import {SliderSix} from "../../../shared/slider-six";

export async function MainPageRetailPark({retailersData}) {
    return (
        <>
            <style>{`
                .retail-park section {
                    padding-bottom: 0;
                }
                
                .retail-park .slider-six__slider {
                    margin-bottom: 0;
                }
            `}</style>
            <div className='retail-park'>
                <SliderSix
                    heading='РИТЕЙЛ-ПАРК'
                    data={retailersData}
                />
            </div>
        </>
    )
}
