import {networkService} from "../../../../../shared/lib/network";
import {SingleRenterWidget} from "../../../../../widgets/single-renter";

export async function generateMetadata({params}) {
    const data = await networkService().getRenterData(params.id);

    return {
        title: data.header.heading,
        description: data.header.heading,
        keywords: data.header.heading,
    }
}

export default async function SingleEntertainment({params}) {
    const data = await networkService().getRenterData(params.id);

    return (
        <>
            <SingleRenterWidget data={data} renterType='entertainments' />
        </>
    )
}
